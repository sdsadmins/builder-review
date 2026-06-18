'use client';

import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { Layers, Paintbrush, Dumbbell, Building2 } from 'lucide-react';

const criteria = [
  { key: 'structuralQuality' as const, label: 'Structural Quality', icon: Layers, desc: 'Foundation, walls, slabs, RCC quality' },
  { key: 'finishing' as const, label: 'Finishing & Aesthetics', icon: Paintbrush, desc: 'Paint, tiles, doors, windows, fixtures' },
  { key: 'amenities' as const, label: 'Amenities & Common Areas', icon: Dumbbell, desc: 'Gym, pool, garden, parking, lobby' },
  { key: 'overallBuild' as const, label: 'Overall Build Quality', icon: Building2, desc: 'Your overall assessment of construction' },
];

const ratingLabels = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'];

export default function Step2ConstructionQuality() {
  const { step2, updateStep2 } = useWizardStore();

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-stone-900 mb-2">Construction Quality</h2>
      <p className="text-stone-500 text-sm mb-8">
        Rate the construction quality of your property. Be honest — your review helps others!
      </p>

      <div className="space-y-8">
        {criteria.map((criterion) => {
          const value = step2[criterion.key];
          const CriterionIcon = criterion.icon;
          return (
            <div key={criterion.key}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-stone-900 font-semibold flex items-center gap-2">
                    <CriterionIcon size={18} className="text-amber-700" />
                    {criterion.label}
                  </h3>
                  <p className="text-stone-400 text-xs mt-0.5">{criterion.desc}</p>
                </div>
                {value > 0 && (
                  <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#b45309' }}>
                    {ratingLabels[value]} ({value}/5)
                  </span>
                )}
              </div>
              <StarRating
                value={value}
                onChange={(v) => updateStep2({ [criterion.key]: v })}
                interactive
                size="lg"
              />
              {value === 0 && (
                <p className="text-xs text-stone-400 mt-2">Click to rate</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Average */}
      {Object.values(step2).some((v) => v > 0) && (
        <div
          className="mt-8 p-4 rounded-xl"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-stone-700 text-sm font-medium">Construction Score</span>
            <span className="text-2xl font-black text-amber-700">
              {(Object.values(step2).reduce((a, b) => a + b, 0) / Object.values(step2).filter((v) => v > 0).length).toFixed(1)} / 5
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
