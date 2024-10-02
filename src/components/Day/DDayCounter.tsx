import { EmotionType } from '@/types/emotion';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import React from 'react';

interface DDayCounterProps {
  dDay: string;
  emotion: EmotionType;
}

const DDayCounter = ({ dDay, emotion }: DDayCounterProps) => {
  const today = new Date();
  const targetDate = new Date(dDay);
  const differenceDays = targetDate.getTime() - today.getTime();
  const dDayCount = Math.ceil(differenceDays / (1000 * 60 * 60 * 24));
  return (
    <div
      style={{ color: getProgressAndButtonColor(emotion as EmotionType) }}
      className="flex flex-row items-center justify-center gap-1 text-center font-[Edensor] text-base font-bold"
    >
      D - {dDayCount == 0 ? <div>Day</div> : <div>{dDayCount}</div>}
    </div>
  );
};

export default DDayCounter;
