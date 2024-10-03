import React, { Dispatch, SetStateAction, useState } from 'react';

import toast from 'react-hot-toast';
import { useEventContext } from '@/pages/ing/create';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const BasicInfoForm = ({ setStep }: StepProps) => {
  const { eventInfo, setEventInfo } = useEventContext();
  const [dateError, setDateError] = useState<string | null>(null);
  const dateRegex = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

  const isValidDateFormat = (dateString: string): boolean => {
    return dateRegex.test(dateString);
  };

  const isDateAfterToday = (dateString: string): boolean => {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today;
  };

  const isDateAtLeastTwoDaysAfter = (dateString: string): boolean => {
    const inputDate = new Date(dateString);
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    twoDaysFromNow.setHours(0, 0, 0, 0);
    return inputDate >= twoDaysFromNow;
  };

  const validateDate = (dateString: string): string | null => {
    if (!isValidDateFormat(dateString)) {
      return '날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.';
    }
    if (!isDateAfterToday(dateString)) {
      return '과거 날짜를 선택할 수 없습니다.';
    }
    if (!isDateAtLeastTwoDaysAfter(dateString)) {
      return '이벤트 날짜는 최소 현재 날짜로부터 2일 이후여야 합니다.';
    }
    return null;
  };

  const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const error = validateDate(dateValue);
      setDateError(error);
      if (error) {
        toast.error(error);
      }
    } else {
      setDateError(null);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, endDate: e.target.value });
    setDateError(null); // 입력 중에는 에러 메시지를 지웁니다.
  };

  const canGoNext = () => {
    return (
      eventInfo.title !== '' && eventInfo.endDate !== '' && dateError === null
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start w-full px-5">
        <div className="w-full mb-5">
          <label
            className="block text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left"
            htmlFor="eventInfo"
          >
            이벤트 정보를 입력해주세요.
          </label>
        </div>
        <div className="w-full mb-7">
          <label
            className="block text-base tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left mb-3"
            htmlFor="eventName"
          >
            이벤트 이름을 입력해주세요.
          </label>
          <input
            className="appearance-none border border-[rgba(136,136,136,0.4)] rounded-lg w-full p-[18px] text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left focus:outline-none"
            id="eventName"
            type="text"
            value={eventInfo.title}
            placeholder="S 디자인 에이전시 최종면접일"
            onChange={(e) =>
              setEventInfo({ ...eventInfo, title: e.target.value })
            }
          />
        </div>
        <div className="w-full mb-7">
          <label
            className="block text-base tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left mb-3"
            htmlFor="eventDate"
          >
            이벤트 날짜를 입력해주세요.
          </label>
          <input
            className={`appearance-none border ${
              !eventInfo.endDate || dateError === null
                ? 'border-[rgba(136,136,136,0.4)]'
                : 'border-[rgba(255,68,68,0.4)]'
            } rounded-lg w-full p-[18px] text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left focus:outline-none`}
            id="eventDate"
            type="text"
            value={eventInfo.endDate}
            placeholder="YYYY-MM-DD"
            onChange={handleDateChange}
            onBlur={handleDateBlur}
          />
        </div>
        <div className="w-full">
          <label
            className="block text-base tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left mb-3"
            htmlFor="additionalInfo"
          >
            추가로 메모하실 내용을 입력해주세요. (선택)
          </label>
          <input
            className="appearance-none border border-[rgba(136,136,136,0.4)] rounded-lg w-full p-[18px] text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left focus:outline-none"
            id="additionalInfo"
            type="text"
            value={eventInfo.memo}
            placeholder="daydreamer,"
            onChange={(e) =>
              setEventInfo({ ...eventInfo, memo: e.target.value })
            }
          />
        </div>
        <div className="w-full text-md tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left mt-2 pl-2">
          Tip. 자세하게 입력 할수록 좋은 질문이 생성됩니다!
        </div>
      </div>
      {canGoNext() && (
        <div className="absolute bottom-[100px] w-full px-5 flex items-center jusify-center">
          <button
            onClick={() => setStep(2)}
            className="w-full shadow-[0_2px_20px_rgba(136,136,136,0.12)] rounded-lg bg-white/80 text-base tracking-tighter leading-tight font-light font-['Pretendard'] text-black/60 h-[52px] "
          >
            다음
          </button>
        </div>
      )}
    </>
  );
};

export default BasicInfoForm;
