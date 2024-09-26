import React, { Dispatch, SetStateAction } from 'react';
import BasicInfoForm from './BasicInfoForm';
import QuestionInfoForm from './QuestionInfoForm';
import EmotionSelectForm from './EmotionSelectForm';

interface FunnelDispenserProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const FunnelDispenser = ({ step, setStep }: FunnelDispenserProps) => {
  return (
    <>
      {step === 1 && <BasicInfoForm setStep={setStep} />}
      {step === 2 && <QuestionInfoForm setStep={setStep} />}
      {step === 3 && <EmotionSelectForm setStep={setStep} />}
    </>
  );
};

export default FunnelDispenser;
