'use client';

import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { Phone, LifeBuoy, FileText } from 'lucide-react';

const criteria = [
  { key: 'responsiveness' as const, label: 'Responsiveness', icon: Phone, desc: 'How quickly did the builder respond to your queries?' },
  { key: 'grievanceRedressal' as const, label: 'Grievance Redressal', icon: LifeBuoy, desc: 'How well were your complaints and issues handled?' },
  { key: 'documentationClarity' as const, label: 'Documentation Clarity', icon: FileText, desc: 'Were all agreements, receipts, and documents clear and transparent?' },
];

const ratingLabels = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];

export default function Step3Communication() {
  const { step3, updateStep3 } = useWizardStore();

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-stone-900 mb-2">Builder Communication</h2>
      <p className="text-stone-500 text-sm mb-8">
        How well did the builder communicate with you before, during, and after purchase?
      </p>

      <div className="space-y-8">
        {criteria.map((criterion) => {
          const value = step3[criterion.key];
          const CriterionIcon = criterion.icon;
          return (
            <div key={criterion.key}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-stone-900 font-semibold flex items-center gap-2">
                    <CriterionIcon size={18} className="text-amber-700" />
                    {criterion.label}
                  </h3>
                  <p className="text-stone-400 text-xs mt-0.5 max-w-sm">{criterion.desc}</p>
                </div>
                {value > 0 && (
                  <span className="text-sm font-bold px-3 py-1 rounded-full flex-shrink-0 ml-4" style={{ background: 'rgba(245,158,11,0.15)', color: '#b45309' }}>
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
      <div className="mt-8 p-4 rounded-xl bg-stone-50 border border-stone-200">
        <p className="text-xs text-stone-500 leading-relaxed">
          <strong className="text-stone-700">Tip:</strong> Good communication is often the deciding factor for homebuyers. Your rating here
          helps others know what to expect during their buying journey.
        </p>
      </div>
    </GlassCard>
  );
}
