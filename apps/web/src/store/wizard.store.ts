import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Step1Data {
  builderName: string;
  builderId: string;
  projectName: string;
  unitNumber: string;
  purchaseYear: string;
  city: string;
}

interface Step2Data {
  structuralQuality: number;
  finishing: number;
  amenities: number;
  overallBuild: number;
}

interface Step3Data {
  responsiveness: number;
  grievanceRedressal: number;
  documentationClarity: number;
}

interface Step4Data {
  reraCompliant: boolean;
  hiddenCharges: boolean;
  possessionDelayMonths: number;
  demandLetterIssues: boolean;
}

interface Step5Data {
  maintenanceQuality: number;
  warrantyHonored: boolean;
  societyFormationHelp: boolean;
}

interface Step6Data {
  overallRating: number;
  wouldRecommend: boolean | null;
  summaryText: string;
}

interface Step7Data {
  photos: string[];
  documents: string[];
}

interface Step8Data {
  isAssociated: boolean;
  agreeGuidelines: boolean;
}

interface WizardState {
  currentStep: number;
  draftId: string | null;
  isSaving: boolean;
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
  step8: Step8Data;
  setStep: (step: number) => void;
  setDraftId: (id: string) => void;
  setIsSaving: (saving: boolean) => void;
  updateStep1: (data: Partial<Step1Data>) => void;
  updateStep2: (data: Partial<Step2Data>) => void;
  updateStep3: (data: Partial<Step3Data>) => void;
  updateStep4: (data: Partial<Step4Data>) => void;
  updateStep5: (data: Partial<Step5Data>) => void;
  updateStep6: (data: Partial<Step6Data>) => void;
  updateStep7: (data: Partial<Step7Data>) => void;
  updateStep8: (data: Partial<Step8Data>) => void;
  reset: () => void;
}

const defaultState = {
  currentStep: 1,
  draftId: null,
  isSaving: false,
  step1: { builderName: '', builderId: '', projectName: '', unitNumber: '', purchaseYear: '', city: '' },
  step2: { structuralQuality: 0, finishing: 0, amenities: 0, overallBuild: 0 },
  step3: { responsiveness: 0, grievanceRedressal: 0, documentationClarity: 0 },
  step4: { reraCompliant: false, hiddenCharges: false, possessionDelayMonths: 0, demandLetterIssues: false },
  step5: { maintenanceQuality: 0, warrantyHonored: false, societyFormationHelp: false },
  step6: { overallRating: 0, wouldRecommend: null, summaryText: '' },
  step7: { photos: [], documents: [] },
  step8: { isAssociated: false, agreeGuidelines: false },
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      ...defaultState,
      setStep: (step) => set({ currentStep: step }),
      setDraftId: (id) => set({ draftId: id }),
      setIsSaving: (saving) => set({ isSaving: saving }),
      updateStep1: (data) => set((s) => ({ step1: { ...s.step1, ...data } })),
      updateStep2: (data) => set((s) => ({ step2: { ...s.step2, ...data } })),
      updateStep3: (data) => set((s) => ({ step3: { ...s.step3, ...data } })),
      updateStep4: (data) => set((s) => ({ step4: { ...s.step4, ...data } })),
      updateStep5: (data) => set((s) => ({ step5: { ...s.step5, ...data } })),
      updateStep6: (data) => set((s) => ({ step6: { ...s.step6, ...data } })),
      updateStep7: (data) => set((s) => ({ step7: { ...s.step7, ...data } })),
      updateStep8: (data) => set((s) => ({ step8: { ...s.step8, ...data } })),
      reset: () => set(defaultState),
    }),
    { name: 'builder-review-wizard' }
  )
);
