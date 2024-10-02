import React, { Dispatch, SetStateAction } from 'react';
import QuestionNumSelectSlider from './QuestionNumSelectSlider';
import { useEventContext } from '@/pages/ing/create';
import { cycleCalculator } from '@/utils/event';

interface QuestionInfoFormProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const QuestionInfoForm = ({ setStep }: QuestionInfoFormProps) => {
  const { eventInfo, setEventInfo } = useEventContext();
  return (
    <div className="w-full h-screen relative">
      <div className="flex flex-col justify-start w-full px-5">
        <div className="w-full mb-5">
          <label
            className="block text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left"
            htmlFor="eventInfo"
          >
            이벤트 정보를 입력해주세요.
          </label>
        </div>
      </div>
      <div className="w-full mb-7 px-5">
        <label
          className="block text-base tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left mb-3"
          htmlFor="eventName"
        >
          질문 받고 싶은 시간을 입력해주세요.
        </label>
        <input
          className="appearance-none border border-[rgba(136,136,136,0.4)] rounded-lg w-full p-[18px] text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left focus:outline-none"
          id="eventName"
          type="time"
          value={eventInfo.occurrenceTime}
          placeholder="S 디자인 에이전시 최종면접일"
          onChange={(e) => setEventInfo({...eventInfo, occurrenceTime: e.target.value})}
        />
      </div>
      <div className="w-full mb-7 px-5">
        <label
          className="block text-base tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left mb-3"
          htmlFor="eventName"
        >
          질문 개수를 설정해주세요.
        </label>
        <div className="flex flex-row gap-1">
          <div>{eventInfo.questionSize + '개'}</div>
          <div>
            | {cycleCalculator(eventInfo.endDate, eventInfo.questionSize)}
            생성됩니다.
          </div>
        </div>
        <QuestionNumSelectSlider />
      </div>
      <div className="absolute bottom-[100px] w-full flex gap-1.5 items-center jusify-center px-5">
        <button
          onClick={() => setStep(1)}
          className="w-full shadow-[0_2px_20px_rgba(136,136,136,0.12)] rounded-lg bg-white/80 text-base tracking-tighter leading-tight font-light font-['Pretendard'] text-black/60 h-[52px] "
        >
          이전
        </button>
        <button
          onClick={() => setStep(3)}
          className="w-full shadow-[0_2px_20px_rgba(136,136,136,0.12)] rounded-lg bg-white/80 text-base tracking-tighter leading-tight font-light font-['Pretendard'] text-black/60 h-[52px] "
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default QuestionInfoForm;
