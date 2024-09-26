import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import YellowEmoIcon from '@/assets/icon/event/yellowEmoIcon.svg';
import BlueEmoIcon from '@/assets/icon/event/blueEmoIcon.svg';
import PinkEmoIcon from '@/assets/icon/event/pinkEmoIcon.svg';
import OrangeEmoIcon from '@/assets/icon/event/orangeEmoIcon.svg';
import GreenEmoIcon from '@/assets/icon/event/greenEmoIcon.svg';
import PurpleEmoIcon from '@/assets/icon/event/purpleEmoIcon.svg';
import { useEventContext } from '@/pages/ing/create';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
}

interface EmotionCardProps {
  children: ReactElement;
  emotion: string;
}

const EmotionCard = ({ children, emotion }: EmotionCardProps) => {
  const { eventInfo, setEventInfo } = useEventContext();
  return (
    <div
      onClick={() => setEventInfo({ ...eventInfo, emotion: emotion })}
      className={`flex flex-col mb-3 items-center justify-center box-border border border-black ${
        eventInfo.emotion !== emotion &&
        'border-2 box-border border-transparent'
      } rounded-2xl bg-white/80 shadow-[2px_2px_12px_0px_rgba(0,0,0,0.12)] backdrop-blur-[22px] p-[20px]`}
    >
      {children}
      <div
        className={`mt-[15px] text-center font-['Pretendard'] text-sm ${
          eventInfo.emotion === emotion
            ? 'font-normal text-black'
            : 'font-extralight text-black/80'
        } leading-[20px] tracking-[-0.56px]`}
      >
        {emotion}
      </div>
    </div>
  );
};

const EmotionSelectForm = ({ setStep }: StepProps) => {
  const { eventInfo, setEventInfo } = useEventContext();
  const handleCreate = () => {
    // 서버에 업로드
  };
  return (
    <div className="flex flex-col items-center justify-start w-full px-5">
      <div className="w-full mb-5">
        <label
          className="block text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left"
          htmlFor="eventInfo"
        >
          어떤 마음으로 기다리고 있나요?
        </label>
      </div>
      <div className="w-full flex items-center justify-between flex-wrap">
        <EmotionCard emotion="기쁨">
          <YellowEmoIcon />
        </EmotionCard>
        <EmotionCard emotion="행복">
          <BlueEmoIcon />
        </EmotionCard>
        <EmotionCard emotion="사랑">
          <PinkEmoIcon />
        </EmotionCard>
        <EmotionCard emotion="만족">
          <OrangeEmoIcon />
        </EmotionCard>
        <EmotionCard emotion="희망">
          <GreenEmoIcon />
        </EmotionCard>
        <EmotionCard emotion="기대">
          <PurpleEmoIcon />
        </EmotionCard>
      </div>
      <div className="absolute bottom-[100px] w-full flex gap-1.5 items-center jusify-center px-5">
        <button
          onClick={() => setStep(2)}
          className="w-full shadow-[0_2px_20px_rgba(136,136,136,0.12)] rounded-lg bg-white/80 text-base tracking-tighter leading-tight font-light font-['Pretendard'] text-black/60 h-[52px] "
        >
          이전
        </button>
        <button
          onClick={() => handleCreate}
          className="w-full shadow-[0_2px_20px_rgba(136,136,136,0.12)] rounded-lg bg-white/80 text-base tracking-tighter leading-tight font-light font-['Pretendard'] text-black/60 h-[52px] "
        >
          생성하기
        </button>
      </div>
    </div>
  );
};

export default EmotionSelectForm;
