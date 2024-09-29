import React from 'react';

interface DDayCounterProps {
  today: Date;
  dDay: Date;
}

const DDayCounter = ({ dDay, today }: DDayCounterProps) => {
  const differenceDays = dDay.getTime() - today.getTime();
  const dDayCount = Math.ceil(differenceDays / (1000 * 60 * 60 * 24));
  return (
    <div className='flex flex-row items-center justify-center gap-1 text-[#5FBCB8] text-center font-[Edensor] text-base font-bold'>D - {dDayCount == 0 ? <div>Day</div> : <div>{dDayCount}</div>}</div>
  );
};

export default DDayCounter;
