import NavBar from '@/components/common/NavBar';
import FunnelDispenser from '@/components/ing/create/FunnelDispenser';
import Header from '@/components/Day/Header';
import SlideMenu from '@/components/Day/SideMenu';
import { EventPostRequest } from '@/types/event';
import React, { createContext, useContext, useState } from 'react';

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
const EventCreatePage = () => {
  const [step, setStep] = useState(1);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventPostRequest>({
    title: '',
    category: '', //테마 (카테고리)
    startDate: '',
    endDate: '',
    memo: '', //추가 메모
    occurrenceTime: '', //질문 받을 시각
    emotion: '', //감정 선택
    questionSize: 0, //질문 갯수
  });
  return (
    <>
      <EventContext.Provider value={{ eventInfo, setEventInfo }}>
        <div className="flex flex-col items-center justify-start w-full h-screen">
          <Header onClick={() => setIsSideMenuOpen(true)} />
          <SlideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
          <FunnelDispenser step={step} setStep={setStep} />
          <NavBar />
        </div>
      </EventContext.Provider>
    </>
  );
};

export default EventCreatePage;
