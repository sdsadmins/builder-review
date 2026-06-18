'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useWizardStore } from '@/store/wizard.store';

const stepLabels = [
  { step: 1, label: 'Builder & Project' },
  { step: 2, label: 'Construction' },
  { step: 3, label: 'Communication' },
  { step: 4, label: 'Financial' },
  { step: 5, label: 'After-Sales' },
  { step: 6, label: 'Overall' },
  { step: 7, label: 'Media' },
  { step: 8, label: 'Declaration' },
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
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-stone-900">Write a Review</h1>
            <div className="flex items-center gap-1.5 text-sm">
              {isSaving ? (
                <span className="flex items-center gap-1.5 text-stone-400">
                  <Loader2 size={14} className="animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-green-600">
                  <CheckCircle size={14} />
                  Saved
                </span>
              )}
            </div>
          </div>

          {/* Top progress bar */}
          <div className="h-1 bg-stone-200 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-amber-600 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>

          {/* Step circles */}
          <div className="flex justify-between overflow-x-auto pb-1">
            {stepLabels.map((s) => {
              const done = s.step < currentStep;
              const current = s.step === currentStep;
              return (
                <button
                  key={s.step}
                  onClick={() => done && setStep(s.step)}
                  className="flex flex-col items-center gap-1.5 min-w-0 flex-shrink-0 px-1"
                  disabled={!done}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      done
                        ? 'bg-amber-700 text-white'
                        : current
                        ? 'bg-amber-700 text-white ring-2 ring-amber-700 ring-offset-2 ring-offset-stone-50'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {done ? (
                      <CheckCircle size={14} className="text-white" />
                    ) : (
                      s.step
                    )}
                  </div>
                  <span
                    className={`text-xs hidden md:block text-center leading-tight max-w-[64px] truncate ${
                      current ? 'text-amber-700 font-medium' : 'text-stone-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current step label (mobile) */}
          <div className="text-center mt-3">
            <p className="text-xs text-stone-400">
              Step {currentStep} of {totalSteps} —{' '}
              <span className="text-amber-700 font-medium">
                {stepLabels[currentStep - 1]?.label}
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
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-200">
          <button
            onClick={goPrev}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-stone-300 text-stone-600 hover:border-stone-400 hover:text-stone-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="text-xs text-stone-400">
            {currentStep} / {totalSteps}
          </span>

          <button
            onClick={goNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-amber-700 text-white hover:bg-amber-800 transition-all"
          >
            {currentStep === totalSteps ? 'Submit Review' : 'Next'}
            {currentStep < totalSteps && <ArrowRight size={16} />}
          </button>
        </div>

      </div>
    </div>
  );
}
