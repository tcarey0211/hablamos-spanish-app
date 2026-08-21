export const COMMON_WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it",
  "that", "for", "they", "i", "with", "as", "not", "on", "she", "at",
  "by", "this", "we", "you", "do", "but", "from", "or", "which", "one",
  "would", "all", "will", "there", "say", "who", "make", "when", "can", "more",
  "if", "no", "man", "out", "other", "so", "what", "time", "up", "go",
  "about", "than", "into", "could", "state", "only", "new", "year", "some", "take",
  "come", "these", "know", "see", "use", "get", "like", "then", "first", "any",
  "work", "now", "may", "such", "give", "over", "think", "most", "even", "find",
  "day", "also", "after", "way", "many", "must", "look", "before", "great", "back",
  "through", "long", "where", "much", "should", "well", "people", "down", "own", "just",
  "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place",
  "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write",
  "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop",
  "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another",
  "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point",
  "form", "child", "few", "small", "since", "against", "ask", "late", "home", "interest",
  "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again",
  "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however",
  "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact",
  "group", "play", "stand", "increase", "early", "course", "change", "help", "line", "city",
  "put", "close", "case", "force", "meet", "once", "water", "upon", "war", "build",
  "hear", "light", "unite", "live", "every", "country", "bring", "center", "let", "side",
  "try", "provide", "continue", "name", "certain", "power", "pay", "result", "question", "study",
  "woman", "member", "until", "far", "night", "always", "service", "away", "report", "something",
  "company", "week", "toward", "start", "social", "room", "figure", "nature", "though", "young",
  "less", "enough", "almost", "read", "include", "president", "nothing", "yet", "better", "big",
  "boy", "cost", "business", "value", "second", "why", "clear", "expect", "family", "complete",
  "act", "sense", "mind", "experience", "art", "next", "near", "direct", "car", "law",
  "industry", "important", "girl", "god", "several", "matter", "usual", "rather", "per", "often",
  "kind", "among", "white", "reason", "action", "return", "foot", "care", "simple", "within",
  "love", "human", "along", "appear", "front", "feel", "music", "ground", "letter", "reach",
  "produce", "hope", "stay", "effect", "voice", "free", "strong", "effort", "true", "whole",
  "space", "behind", "door", "pass", "party", "future", "modern", "moment", "body", "measure"
];

export const PUNCTUATIONS = [".", ",", "!", "?", ";", ":", "-", "\"", "'", "(", ")"];

export function generateRandomWords(count: number, includePunctuation = false, includeNumbers = false): string {
  const words: string[] = [];
  const punctuationMarks = [".", ",", "!", "?", ";", ":", "-", "\"", "'"];

  for (let i = 0; i < count; i++) {
    const isNumber = includeNumbers && Math.random() < 0.15;
    let word: string;

    if (isNumber) {
      word = Math.floor(Math.random() * 9999 + 1).toString();
    } else {
      word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    }

    if (includePunctuation && !isNumber && Math.random() < 0.2) {
      const punct = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
      if (punct === '"' || punct === "'") {
        word = `${punct}${word}${punct}`;
      } else if (punct === ".") {
        // Capitalize next word
        word = `${word}.`;
      } else {
        word = `${word}${punct}`;
      }
    }

    // Capitalize if previous ended with dot or first word
    if (i === 0 || (words[i - 1] && words[i - 1].endsWith("."))) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    words.push(word);
  }

  return words.join(" ");
}
