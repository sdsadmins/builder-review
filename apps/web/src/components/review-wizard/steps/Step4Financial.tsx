'use client';

import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import { Shield, AlertTriangle, Clock, FileX, Check } from 'lucide-react';

function ToggleField({
  label,
  emoji,
  desc,
  value,
  onChange,
  positiveLabel,
  negativeLabel,
}: {
  label: string;
  emoji: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
  positiveLabel: string;
  negativeLabel: string;
}) {
  return (
    <div className="border border-white/8 rounded-xl p-5">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{emoji}</span>
        <div>
          <h3 className="text-white font-semibold text-sm">{label}</h3>
          <p className="text-white/40 text-xs mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: value ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)',
            border: value ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.1)',
            color: value ? '#22C55E' : '#ffffff60',
          }}
        >
          {value && <Check size={14} />}
          ✅ {positiveLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: !value ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
            border: !value ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)',
            color: !value ? '#EF4444' : '#ffffff60',
          }}
        >
          {!value && '✗'}
          ❌ {negativeLabel}
        </button>
      </div>
    </div>
  );
}

export default function Step4Financial() {
  const { step4, updateStep4 } = useWizardStore();

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-white mb-2">💰 Financial Compliance</h2>
      <p className="text-white/50 text-sm mb-8">
        Financial transparency is crucial for homebuyers. Share your experience with money matters.
      </p>

      <div className="space-y-5">
        <ToggleField
          label="RERA Compliance"
          emoji="🛡️"
          desc="Was the project registered with RERA and were all updates transparent?"
          value={step4.reraCompliant}
          onChange={(v) => updateStep4({ reraCompliant: v })}
          positiveLabel="RERA Compliant"
          negativeLabel="Not Compliant"
        />

        <ToggleField
          label="Hidden Charges"
          emoji="💸"
          desc="Were there unexpected charges not mentioned in the agreement?"
          value={!step4.hiddenCharges}
          onChange={(v) => updateStep4({ hiddenCharges: !v })}
          positiveLabel="No Hidden Charges"
          negativeLabel="Yes, Hidden Charges"
        />

        <ToggleField
          label="Demand Letter Issues"
          emoji="📃"
          desc="Were demand letters issued correctly and on schedule?"
          value={!step4.demandLetterIssues}
          onChange={(v) => updateStep4({ demandLetterIssues: !v })}
          positiveLabel="No Issues"
          negativeLabel="Had Issues"
        />

        {/* Possession Delay Slider */}
        <div className="border border-white/8 rounded-xl p-5">
          <div className="flex items-start gap-3 mb-5">
            <span className="text-2xl">⏰</span>
            <div>
              <h3 className="text-white font-semibold text-sm">Possession Delay</h3>
              <p className="text-white/40 text-xs mt-0.5">How many months was the possession delayed?</p>
            </div>
            <div
              className="ml-auto text-lg font-black px-3 py-1 rounded-full"
              style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}
            >
              {step4.possessionDelayMonths === 0 ? 'On Time ✅' : `${step4.possessionDelayMonths} months`}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={36}
            step={1}
            value={step4.possessionDelayMonths}
            onChange={(e) => updateStep4({ possessionDelayMonths: parseInt(e.target.value) })}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #F59E0B ${(step4.possessionDelayMonths / 36) * 100}%, rgba(255,255,255,0.1) ${(step4.possessionDelayMonths / 36) * 100}%)`,
              accentColor: '#F59E0B',
            }}
          />
          <div className="flex justify-between text-xs text-white/30 mt-2">
            <span>On Time</span>
            <span>6 months</span>
            <span>12 months</span>
            <span>24 months</span>
            <span>36+ months</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
