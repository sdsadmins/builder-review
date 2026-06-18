'use client';

import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const overallLabels: Record<number, string> = {
  1: 'Very Disappointed',
  2: 'Not Satisfied',
  3: 'Average Experience',
  4: 'Happy with It',
  5: 'Absolutely Loved It!',
};

export default function Step6Overall() {
  const { step6, updateStep6 } = useWizardStore();
  const charCount = step6.summaryText.length;
  const minChars = 100;

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-stone-900 mb-2">Overall Experience</h2>
      <p className="text-stone-500 text-sm mb-8">
        Summarize your complete experience. This is the most important part!
      </p>

      <div className="space-y-8">
        {/* Overall Star Rating */}
        <div className="text-center">
          <h3 className="text-stone-900 font-semibold mb-6">How would you rate this builder overall?</h3>
          <div className="flex justify-center mb-4">
            <StarRating
              value={step6.overallRating}
              onChange={(v) => updateStep6({ overallRating: v })}
              interactive
              size="lg"
            />
          </div>
          {step6.overallRating > 0 && (
            <div
              className="inline-block px-6 py-2 rounded-full text-base font-bold"
              style={{
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.3)',
                color: '#b45309',
              }}
            >
              {overallLabels[step6.overallRating]}
            </div>
          )}
        </div>

        {/* Would Recommend */}
        <div>
          <h3 className="text-stone-900 font-semibold mb-4 text-center">
            Would you recommend this builder to others?
          </h3>
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => updateStep6({ wouldRecommend: true })}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:scale-105"
              style={{
                background: step6.wouldRecommend === true ? 'rgba(34,197,94,0.12)' : 'rgba(0,0,0,0.03)',
                border: step6.wouldRecommend === true ? '2px solid rgba(34,197,94,0.5)' : '1px solid rgb(231,229,228)',
                color: step6.wouldRecommend === true ? '#16a34a' : '#78716c',
              }}
            >
              <ThumbsUp size={20} className={step6.wouldRecommend === true ? 'text-green-600' : ''} />
              Yes, Recommend!
            </button>
            <button
              type="button"
              onClick={() => updateStep6({ wouldRecommend: false })}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:scale-105"
              style={{
                background: step6.wouldRecommend === false ? 'rgba(239,68,68,0.12)' : 'rgba(0,0,0,0.03)',
                border: step6.wouldRecommend === false ? '2px solid rgba(239,68,68,0.5)' : '1px solid rgb(231,229,228)',
                color: step6.wouldRecommend === false ? '#dc2626' : '#78716c',
              }}
            >
              <ThumbsDown size={20} className={step6.wouldRecommend === false ? 'text-red-600' : ''} />
              No, Don&apos;t Recommend
            </button>
          </div>
        </div>

        {/* Summary Text */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-stone-900 font-semibold">
              Write your review <span className="text-stone-400 font-normal text-sm">(minimum 100 characters)</span>
            </h3>
            <span
              className="text-sm font-bold px-3 py-1 rounded-full"
              style={{
                background: charCount >= minChars ? 'rgba(34,197,94,0.12)' : 'rgba(0,0,0,0.05)',
                color: charCount >= minChars ? '#16a34a' : '#78716c',
              }}
            >
              {charCount}/{minChars}
            </span>
          </div>
          <textarea
            value={step6.summaryText}
            onChange={(e) => updateStep6({ summaryText: e.target.value })}
            rows={6}
            placeholder="Share your detailed experience with this builder. Include key highlights, challenges, and anything that future homebuyers should know..."
            className="w-full rounded-xl p-4 text-sm outline-none resize-none transition-all bg-white text-stone-900"
            style={{
              border: charCount >= minChars
                ? '1px solid rgba(34,197,94,0.4)'
                : '1px solid rgb(231,229,228)',
              lineHeight: 1.7,
            }}
          />
          {charCount < minChars && charCount > 0 && (
            <p className="text-xs text-stone-400 mt-2">
              {minChars - charCount} more characters needed
            </p>
          )}
          {charCount >= minChars && (
            <p className="text-xs text-green-600 mt-2">Great! Your review is detailed enough.</p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
