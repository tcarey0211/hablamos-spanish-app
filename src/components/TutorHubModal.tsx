import React from 'react';
import { 
  X, 
  Users, 
  Star, 
  ExternalLink, 
  CheckCircle, 
  DollarSign, 
  Globe 
} from 'lucide-react';
import { TUTORS } from '../data/tutorsData';

interface TutorHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorHubModal: React.FC<TutorHubModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 relative shadow-2xl flex flex-col gap-6 text-stone-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight text-stone-100">1-on-1 Native Spanish Tutors</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
                Affiliate Network
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Practice speaking with certified native tutors from Spain, Mexico, Colombia & Argentina.
            </p>
          </div>
        </div>

        {/* Affiliate Revenue Explainer */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed">
          <div className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1 text-sm">
            <DollarSign className="w-4 h-4" />
            <span>High-Yield Affiliate Monetization:</span>
          </div>
          Referring Spanish learners to 1-on-1 tutoring platforms (like <strong>iTalki</strong> or <strong>Preply</strong>) pays between <strong>$15 to $30+ commission per new student</strong>. This creates passive high-ticket affiliate revenue alongside software subscriptions.
        </div>

        {/* Tutors List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TUTORS.map((tutor) => (
            <div
              key={tutor.id}
              className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between gap-4 hover:border-emerald-500/30 transition shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-stone-700"
                  />
                  <div>
                    <div className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                      <span>{tutor.name}</span>
                      <span>{tutor.flag}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{tutor.rating}</span>
                      <span className="text-stone-500 font-normal">({tutor.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-semibold text-stone-200 line-clamp-2">{tutor.headline}</p>
                <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">{tutor.bio}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {tutor.specialties.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-stone-400 block">From</span>
                  <span className="text-sm font-extrabold text-stone-100">${tutor.hourlyRate}/hr</span>
                </div>

                <a
                  href={tutor.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition shadow"
                >
                  <span>Book Trial</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
