'use client';

import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';

const criteria = [
  { key: 'responsiveness' as const, label: 'Responsiveness', emoji: '📞', desc: 'How quickly did the builder respond to your queries?' },
  { key: 'grievanceRedressal' as const, label: 'Grievance Redressal', emoji: '🆘', desc: 'How well were your complaints and issues handled?' },
  { key: 'documentationClarity' as const, label: 'Documentation Clarity', emoji: '📄', desc: 'Were all agreements, receipts, and documents clear and transparent?' },
];

const ratingLabels = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];

export default function Step3Communication() {
  const { step3, updateStep3 } = useWizardStore();

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-white mb-2">📞 Builder Communication</h2>
      <p className="text-white/50 text-sm mb-8">
        How well did the builder communicate with you before, during, and after purchase?
      </p>

      <div className="space-y-8">
        {criteria.map((criterion) => {
          const value = step3[criterion.key];
          return (
            <div key={criterion.key}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span className="text-xl">{criterion.emoji}</span>
                    {criterion.label}
                  </h3>
                  <p className="text-white/40 text-xs mt-0.5 max-w-sm">{criterion.desc}</p>
                </div>
                {value > 0 && (
                  <span className="text-sm font-bold px-3 py-1 rounded-full flex-shrink-0 ml-4" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
                    {ratingLabels[value]}
                  </span>
                )}
              </div>
              <StarRating
                value={value}
                onChange={(v) => updateStep3({ [criterion.key]: v })}
                interactive
                size="lg"
              />
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div
        className="mt-8 p-4 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p className="text-xs text-white/40 leading-relaxed">
          💡 <strong className="text-white/60">Tip:</strong> Good communication is often the deciding factor for homebuyers. Your rating here
          helps others know what to expect during their buying journey.
        </p>
      </div>
    </GlassCard>
  );
}
