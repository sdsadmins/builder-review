'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useWizardStore } from '@/store/wizard.store';

const stepLabels = [
  { step: 1, label: 'Builder & Project', emoji: '🏗️' },
  { step: 2, label: 'Construction', emoji: '⚒️' },
  { step: 3, label: 'Communication', emoji: '📞' },
  { step: 4, label: 'Financial', emoji: '💰' },
  { step: 5, label: 'After Sales', emoji: '⚙️' },
  { step: 6, label: 'Overall', emoji: '⭐' },
  { step: 7, label: 'Media', emoji: '📷' },
  { step: 8, label: 'Declaration', emoji: '📋' },
];

interface WizardContainerProps {
  children: React.ReactNode;
  onSubmit?: () => void;
}

export default function WizardContainer({ children, onSubmit }: WizardContainerProps) {
  const { currentStep, setStep, isSaving } = useWizardStore();
  const totalSteps = 8;

  const goNext = () => {
    if (currentStep < totalSteps) setStep(currentStep + 1);
    else onSubmit?.();
  };

  const goPrev = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-black text-white">
            ✍️ Write a Review
          </h1>
          <div className="flex items-center gap-2 text-sm">
            {isSaving ? (
              <span className="flex items-center gap-1 text-amber-400 animate-pulse">
                <Save size={14} />
                💾 Saving draft...
              </span>
            ) : (
              <span className="text-white/30 flex items-center gap-1">
                <Save size={14} />
                💾 Draft saved
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
          <div className="flex justify-between mt-3 overflow-x-auto pb-1">
            {stepLabels.map((s) => (
              <button
                key={s.step}
                onClick={() => s.step < currentStep && setStep(s.step)}
                className="flex flex-col items-center gap-1 min-w-0 flex-shrink-0 px-1"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background:
                      s.step < currentStep
                        ? '#F59E0B'
                        : s.step === currentStep
                        ? 'rgba(245,158,11,0.2)'
                        : 'rgba(255,255,255,0.08)',
                    border:
                      s.step === currentStep
                        ? '2px solid #F59E0B'
                        : 'none',
                    color:
                      s.step < currentStep
                        ? '#0A0A0F'
                        : s.step === currentStep
                        ? '#F59E0B'
                        : '#ffffff40',
                  }}
                >
                  {s.step < currentStep ? '✓' : s.step}
                </div>
                <span
                  className="text-xs hidden md:block text-center leading-tight"
                  style={{
                    color: s.step === currentStep ? '#F59E0B' : s.step < currentStep ? '#F8F8FF80' : '#ffffff30',
                  }}
                >
                  {s.emoji}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Label */}
        <div className="text-center mt-4">
          <p className="text-sm text-white/40">
            Step {currentStep} of {totalSteps} —{' '}
            <span className="text-amber-400 font-medium">
              {stepLabels[currentStep - 1]?.emoji} {stepLabels[currentStep - 1]?.label}
            </span>
          </p>
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        <button
          onClick={goPrev}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:border-white/20 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <span className="text-xs text-white/30">
          {currentStep}/{totalSteps}
        </span>

        <button
          onClick={goNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: '#0A0A0F',
          }}
        >
          {currentStep === totalSteps ? '🚀 Submit Review' : 'Next'}
          {currentStep < totalSteps && <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}
