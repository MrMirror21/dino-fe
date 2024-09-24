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
        <div className="flex px-3 py-4 w-full rounded-[10px] shadow-[0_2px_16px_rgba(68,68,68,0.12)]">
          <h2 className="text-[24px] leading-6 font-bold text-[#EEEEEE] flex justify-start">
            Q.
          </h2>
          <p>
            ( ) 하고 싶은 것을 이룬다면, 가장 먼저 알리고 싶은 사람은
            누구인가요?
          </p>
        </div>
      </EventCard>
      <EventCard>
        <div className="flex items-center gap-2 px-3 py-4 w-[calc(100vw-40px)] shadow-[0_2px_16px_rgba(68,68,68,0.12)] rounded-[10px]">
          <h2 className="text-[24px] font-bold text-[#EEEEEE]">A.</h2>
          <p>답변 작성하기</p>
        </div>
      </EventCard>
    </div>
  );
};

export default EventList;
