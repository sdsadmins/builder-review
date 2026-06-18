'use client';

import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { Check, Home, Shield } from 'lucide-react';

export default function Step8Declaration() {
  const { step1, step2, step3, step4, step5, step6, step7, step8, updateStep8 } = useWizardStore();

  const avgConstruction = step2.overallBuild || 0;
  const avgCommunication = Math.round(
    ((step3.responsiveness + step3.grievanceRedressal + step3.documentationClarity) / 3) * 10
  ) / 10 || 0;

  const canSubmit = step8.isAssociated && step8.agreeGuidelines;

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-white mb-2">📋 Declaration & Summary</h2>
      <p className="text-white/50 text-sm mb-8">
        Review your submission before publishing. Your review helps thousands! 🏠
      </p>

      {/* Summary Card */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h3 className="text-white font-bold mb-4">📊 Review Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">🏗️ Builder</span>
            <span className="text-white font-medium">{step1.builderName || '—'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">🏠 Project</span>
            <span className="text-white font-medium">{step1.projectName || '—'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">📍 City</span>
            <span className="text-white font-medium">{step1.city || '—'}</span>
          </div>
          <div className="border-t border-white/5 pt-3 mt-3 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">⚒️ Construction Quality</span>
              <StarRating value={avgConstruction} size="sm" showValue />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">📞 Communication</span>
              <StarRating value={avgCommunication} size="sm" showValue />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">⭐ Overall Rating</span>
              <StarRating value={step6.overallRating} size="sm" showValue />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">🛡️ RERA Compliant</span>
              <span className={step4.reraCompliant ? 'text-green-400' : 'text-red-400'}>
                {step4.reraCompliant ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">⏰ Possession Delay</span>
              <span className="text-white font-medium">
                {step4.possessionDelayMonths === 0 ? 'On Time ✅' : `${step4.possessionDelayMonths} months`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">👍 Would Recommend</span>
              <span className={step6.wouldRecommend ? 'text-green-400' : 'text-red-400'}>
                {step6.wouldRecommend === null ? '—' : step6.wouldRecommend ? '👍 Yes' : '👎 No'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">📸 Photos</span>
              <span className="text-white/70">{step7.photos.length} uploaded</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">📄 Documents</span>
              <span className="text-white/70">{step7.documents.length} uploaded</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4 mb-8">
        <label
          className="flex items-start gap-4 cursor-pointer p-4 rounded-xl transition-all"
          style={{
            background: step8.isAssociated ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
            border: step8.isAssociated ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => updateStep8({ isAssociated: !step8.isAssociated })}
            className="w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
            style={{
              background: step8.isAssociated ? '#F59E0B' : 'transparent',
              borderColor: step8.isAssociated ? '#F59E0B' : 'rgba(255,255,255,0.2)',
            }}
          >
            {step8.isAssociated && <Check size={14} style={{ color: '#0A0A0F' }} />}
          </button>
          <div>
            <p className="text-white text-sm font-semibold flex items-center gap-2">
              <Home size={14} className="text-amber-500" />
              I am / was associated with this property ✅
            </p>
            <p className="text-white/40 text-xs mt-1">
              I confirm that I am the buyer, owner, or resident of the property I am reviewing.
            </p>
          </div>
        </label>

        <label
          className="flex items-start gap-4 cursor-pointer p-4 rounded-xl transition-all"
          style={{
            background: step8.agreeGuidelines ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
            border: step8.agreeGuidelines ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => updateStep8({ agreeGuidelines: !step8.agreeGuidelines })}
            className="w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
            style={{
              background: step8.agreeGuidelines ? '#F59E0B' : 'transparent',
              borderColor: step8.agreeGuidelines ? '#F59E0B' : 'rgba(255,255,255,0.2)',
            }}
          >
            {step8.agreeGuidelines && <Check size={14} style={{ color: '#0A0A0F' }} />}
          </button>
          <div>
            <p className="text-white text-sm font-semibold flex items-center gap-2">
              <Shield size={14} className="text-amber-500" />
              I agree to community guidelines 📋
            </p>
            <p className="text-white/40 text-xs mt-1">
              My review is truthful, based on personal experience, and does not contain defamatory content.
            </p>
          </div>
        </label>
      </div>

      {/* Reward Info */}
      <div
        className="rounded-xl p-5 text-center mb-6"
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.06))',
          border: '1px solid rgba(245,158,11,0.2)',
        }}
      >
        <div className="text-3xl mb-2">🎁</div>
        <p className="text-amber-400 font-bold text-lg">Earn ₹250 Reward!</p>
        <p className="text-white/50 text-xs mt-1">
          Your reward will be unlocked within 48 hours after review approval
        </p>
      </div>

      {!canSubmit && (
        <p className="text-center text-sm text-white/40">
          ⚠️ Please check both boxes above to submit your review
        </p>
      )}
    </GlassCard>
  );
}
