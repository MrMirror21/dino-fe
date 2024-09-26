import { useEventContext } from '@/pages/ing/create';
import React, { Dispatch, SetStateAction } from 'react';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const BasicInfoForm = ({ setStep }: StepProps) => {
  const { eventInfo, setEventInfo } = useEventContext();
  const dateRegex = /^\d{4}\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12]\d|3[01])$/;

  const isValidDateFormat = (dateString: string): boolean => {
    // 형식 검사
    if (!dateRegex.test(dateString)) {
      return false;
    }

    // 날짜 파싱
    const [year, month, day] = dateString.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day); // 월은 0-indexed

    // 유효한 날짜인지 확인 (예: 2023/02/31 같은 날짜 방지)
    if (
      inputDate.getFullYear() !== year ||
      inputDate.getMonth() !== month - 1 ||
      inputDate.getDate() !== day
    ) {
      return false;
    }

    // 오늘 날짜
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 부분을 제거

    // 입력된 날짜가 오늘 이후인지 확인
    return inputDate > today;
  };

  const canGoNext = () => {
    return (
      eventInfo.title !== '' &&
      eventInfo.endDate !== '' &&
      isValidDateFormat(eventInfo.endDate)
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
              !eventInfo.endDate
                ? 'border-[rgba(136,136,136,0.4)]'
                : isValidDateFormat(eventInfo.endDate)
                ? 'border-[rgba(229,183,183,0.4)]'
                : 'border-[rgba(255,68,68,0.4)]'
            } rounded-lg w-full p-[18px] text-lg tracking-tighter leading-tight font-extralight font-['Pretendard'] text-black/60 text-left focus:outline-none`}
            id="eventDate"
            type="text"
            value={eventInfo.endDate}
            placeholder="YYYY/MM/DD"
            onChange={(e) =>
              setEventInfo({ ...eventInfo, endDate: e.target.value })
            }
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
