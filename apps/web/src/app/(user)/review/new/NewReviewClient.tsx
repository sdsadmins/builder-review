'use client';

import { useWizardStore } from '@/store/wizard.store';
import WizardContainer from '@/components/review-wizard/WizardContainer';
import Step1BuilderProject from '@/components/review-wizard/steps/Step1BuilderProject';
import Step2ConstructionQuality from '@/components/review-wizard/steps/Step2ConstructionQuality';
import Step3Communication from '@/components/review-wizard/steps/Step3Communication';
import Step4Financial from '@/components/review-wizard/steps/Step4Financial';
import Step5AfterSales from '@/components/review-wizard/steps/Step5AfterSales';
import Step6Overall from '@/components/review-wizard/steps/Step6Overall';
import Step7Media from '@/components/review-wizard/steps/Step7Media';
import Step8Declaration from '@/components/review-wizard/steps/Step8Declaration';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const stepComponents = [
  Step1BuilderProject,
  Step2ConstructionQuality,
  Step3Communication,
  Step4Financial,
  Step5AfterSales,
  Step6Overall,
  Step7Media,
  Step8Declaration,
];

export default function NewReviewClient() {
  const { currentStep, reset } = useWizardStore();
  const router = useRouter();
  const StepComponent = stepComponents[currentStep - 1];

  const handleSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Review submitted! You\'ll earn rewards once it is approved.');
    reset();
    router.push('/dashboard');
  };

  return (
    <div style={{ backgroundColor: '#0A0A0F', minHeight: '100vh' }}>
      <WizardContainer onSubmit={handleSubmit}>
        {StepComponent && <StepComponent />}
      </WizardContainer>
    </div>
  );
}
