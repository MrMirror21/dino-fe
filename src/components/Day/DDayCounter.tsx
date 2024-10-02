import { EmotionType } from '@/types/emotion';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import { stringToDate } from '@/utils/event';
import React from 'react';

interface DDayCounterProps {
  currentDay: Date;
  dDay: string;
  emotion: EmotionType;
}

const DDayCounter = ({ currentDay, dDay, emotion }: DDayCounterProps) => {
  const targetDate = stringToDate(dDay)
  targetDate.setHours(0, 0, 0, 0);
  const comparisonDate = new Date(currentDay);
  comparisonDate.setHours(0, 0, 0, 0);

  const differenceDays = targetDate.getTime() - comparisonDate.getTime();
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
