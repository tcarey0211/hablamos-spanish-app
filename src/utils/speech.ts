import { SpanishAccent } from '../types';

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
    // fallback timeout
    setTimeout(() => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    }, 500);
  });
}

// Pre-load voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
}

export async function speakSpanish(
  text: string, 
  accent: SpanishAccent = 'es-ES', 
  rate: number = 0.95
): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = Math.max(0.6, Math.min(1.2, rate));
  utterance.pitch = 1.0;

  // Match voice for specific accent
  const preferredLangTag = accent; // 'es-ES', 'es-MX', 'es-AR'
  let matchedVoice = voices.find((v) => v.lang === preferredLangTag || v.lang.replace('_', '-') === preferredLangTag);

  if (!matchedVoice) {
    // General Spanish match
    matchedVoice = voices.find((v) => v.lang.startsWith('es'));
  }

  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;
  } else {
    utterance.lang = 'es-ES';
  }

  window.speechSynthesis.speak(utterance);
}

// Sound effects using Web Audio API
export function playSoundEffect(type: 'correct' | 'incorrect' | 'complete' | 'click' | 'pop') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'correct') {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25); // C6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.12);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.35);
    } else if (type === 'incorrect') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'complete') {
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } else if (type === 'pop' || type === 'click') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (err) {
    // Web audio error safety fallback
  }
}
