import React, { ReactElement } from 'react';

interface EventCardProps {
  children: ReactElement;
}

interface EventListProps {
  setChosenEvent: (isOpen: boolean) => void;
}

const EventCard = ({ children }: EventCardProps) => {
  return <div className="w-full px-[20px] py-[10px]">{children}</div>;
};

const EventList = ({ setChosenEvent }: EventListProps) => {
  return (
    <div onClick={() => setChosenEvent(true)}>
      <EventCard>
        <div className="flex gap-2 px-3 py-4 w-full rounded-[10px] shadow-[0_2px_16px_rgba(68,68,68,0.12)]">
          <p className="text-[#BAD7EC] font-['edensor'] text-2xl leading-[20px] tracking-[-1px] flex justify-start">
            Q.
          </p>
          <p className='text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px]'>
            ( ) 하고 싶은 것을 이룬다면, 가장 먼저 알리고 싶은 사람은
            누구인가요?
          </p>
        </div>
      </EventCard>
      <EventCard>
        <div className="flex items-center gap-2 px-3 py-4 w-[calc(100vw-40px)] shadow-[0_2px_16px_rgba(68,68,68,0.12)] rounded-[10px]">
          <h2 className="text-[#BAD7EC] font-['edensor'] text-2xl leading-[20px] tracking-[-1px]">A.</h2>
          <p className='text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px]'>답변 작성하기</p>
        </div>
      </EventCard>
    </div>
  );
};

export default EventList;
