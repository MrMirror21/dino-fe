import React, { useContext, useState } from 'react';
import {
  EventEditType,
  EventListType,
  EventPostRequest,
  EventType,
} from '@/types/event';
import FunnelDispenser from '@/components/ing/create/FunnelDispenser';
import Header from '@/components/Day/Header';
import NavBar from '@/components/common/NavBar';
import { isValidDateFormat } from '@/utils/event';
import { useRouter } from 'next/router';
import { useEditEvent, useGetEvent } from '@/hooks/api/useEvent';
import ConfirmModal from '@/components/common/ConfirmModal';

export interface EventContextType {
  eventInfo: EventPostRequest;
  setEventInfo: React.Dispatch<React.SetStateAction<EventPostRequest>>;
}

export const EventContext = React.createContext<EventContextType | undefined>(
  undefined,
);

export function useEventContext() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error(
      'useEventContext must be used within an EventContext.Provider',
    );
  }
  return context;
}

interface EditPageProps {
  event: EventType;
}

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useGetEvent(Number(id));
  const { mutate, isSuccess } = useEditEvent();
  const [eventInfo, setEventInfo] = useState<EventEditType>({
    eventId: Number(id),
    title: data?.data?.title,
    endDate: data?.data?.endDate,
    memo: data?.data?.memo, //추가 메모
    occurrenceTime: data?.data?.occurrenceTime, //질문 받을 시각
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const canGoNext = () => {
    return true;
  };

  const handleSubmit = async () => {
    await mutate(eventInfo);
    router.push('/ing/detail');
  };
  return (
    <>
      <div className="flex flex-col items-center justify-start w-full h-screen">
        <Header />
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
              placeholder="YYYY-MM-DD"
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
            onChange={(e) =>
              setEventInfo({ ...eventInfo, occurrenceTime: e.target.value })
            }
          />
        </div>
        {canGoNext() && (
          <div className="absolute bottom-[100px] w-full px-5 flex items-center jusify-center">
            <button
              onClick={handleSubmit}
              className="w-full shadow-[0_2px_20px_rgba(136,136,136,0.12)] rounded-[10px] bg-[#8ABADD] text-base tracking-tighter leading-tight font-light font-['Pretendard'] text-white h-[48px] "
            >
              저장하기
            </button>
          </div>
        )}
        <NavBar />
        {isSubmit && <ConfirmModal content="저장하시겠습니까?" isOpen={isSubmit} setIsOpen={setIsSubmit} onConfirm={()=>handleSubmit}/>}
      </div>
    </>
  );
};

export default EditPage;
