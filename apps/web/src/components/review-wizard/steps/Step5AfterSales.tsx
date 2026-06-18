'use client';

import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { Check, Building2, Wrench, Handshake } from 'lucide-react';

const ratingLabels = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'];

function BoolField({
  label,
  icon: FieldIcon,
  desc,
  value,
  onChange,
}: {
  label: string;
  icon: React.ElementType<{size?: number; className?: string}>;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="border border-stone-200 rounded-xl p-5 bg-white">
      <div className="flex items-start gap-3 mb-4">
        <FieldIcon size={22} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-stone-900 font-semibold text-sm">{label}</h3>
          <p className="text-stone-400 text-xs mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: value ? 'rgba(34,197,94,0.12)' : 'rgba(0,0,0,0.03)',
            border: value ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgb(231,229,228)',
            color: value ? '#16a34a' : '#78716c',
          }}
        >
          {value && <Check size={14} />}
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: !value ? 'rgba(239,68,68,0.12)' : 'rgba(0,0,0,0.03)',
            border: !value ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgb(231,229,228)',
            color: !value ? '#dc2626' : '#78716c',
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default function Step5AfterSales() {
  const { step5, updateStep5 } = useWizardStore();

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-stone-900 mb-2">After-Sales Service</h2>
      <p className="text-stone-500 text-sm mb-8">
        After-sales support is where many builders fail. Share your experience!
      </p>

      <div className="space-y-6">
        {/* Maintenance Quality */}
        <div className="border border-stone-200 rounded-xl p-5 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <Building2 size={22} className="text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-stone-900 font-semibold text-sm">Maintenance Quality</h3>
                <p className="text-stone-400 text-xs mt-0.5">Overall quality of maintenance services provided</p>
              </div>
            </div>
            {step5.maintenanceQuality > 0 && (
              <span
                className="text-sm font-bold px-3 py-1 rounded-full flex-shrink-0 ml-4"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#b45309' }}
              >
                {ratingLabels[step5.maintenanceQuality]}
              </span>
            )}
          </div>
          <StarRating
            value={step5.maintenanceQuality}
            onChange={(v) => updateStep5({ maintenanceQuality: v })}
            interactive
            size="lg"
          />
        </div>

        <BoolField
          label="Warranty Honored"
          icon={Wrench}
          desc="Did the builder honor the defect liability period and warranty commitments?"
          value={step5.warrantyHonored}
          onChange={(v) => updateStep5({ warrantyHonored: v })}
        />

        <BoolField
          label="Society Formation Help"
          icon={Handshake}
          desc="Did the builder assist in forming the Residents Welfare Association (RWA/AOA)?"
          value={step5.societyFormationHelp}
          onChange={(v) => updateStep5({ societyFormationHelp: v })}
        />
      </div>

      <div className="mt-8 p-4 rounded-xl bg-stone-50 border border-stone-200">
        <p className="text-xs text-stone-500 leading-relaxed">
          <strong className="text-stone-700">Why this matters:</strong> Many builders disappear after possession.
          Your after-sales experience helps future buyers set realistic expectations.
        </p>
      </div>
    </GlassCard>
  );
}
