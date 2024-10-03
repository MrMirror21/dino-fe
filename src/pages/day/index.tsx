import React, { useEffect, useState } from 'react';
import {
  getBackGroundStyle,
  getProgressAndButtonColor,
} from '@/utils/emotionColor';

import { EmotionType } from '@/types/emotion';
import EventPage from '@/components/Day/EventPage';
import Header from '../../components/Day/Header';
import NavBar from '@/components/common/NavBar';
import NextTriButtonIcon from '@/assets/icon/NextTriButtonIcon';
import PrevTriButtonIcon from '@/assets/icon/PrevTriButtonIcon';
import SlideMenu from '@/components/Day/SideMenu';
import { useGetEvents } from '@/hooks/api/useEvent';

export default function MainPage() {
  const { data, isSuccess, error } = useGetEvents();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  useEffect(() => {
    if (isSuccess && data?.data && data.data.length > 0) {
      setCurrentEventId(data.data[currentIndex].eventId);
    }
  }, [isSuccess, data, currentIndex]);

  const prevEventId =
    currentIndex > 0 ? data?.data[currentIndex - 1].eventId : null;
  const nextEventId =
    currentIndex < (data?.data?.length ?? 0) - 1
      ? data?.data[currentIndex + 1].eventId
      : null;

  const handlePrevClick = () => {
    if (prevEventId) setCurrentIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (nextEventId) setCurrentIndex((prev) => prev + 1);
  };

  if (!isSuccess || !data) return null; // 또는 로딩 컴포넌트를 표시

  const currentEvent = data.data[currentIndex];

  return (
    <div
      className={`flex flex-col text-center w-full h-screen items-center`}
      style={getBackGroundStyle(currentEvent.emotion as EmotionType)}
    >
      <Header onClick={() => setIsSideMenuOpen(true)} />
      <SlideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
      <div className="w-[calc(100%-40px)] max-w-2xl">
        <div className="flex items-center justify-between my-4">
          <button onClick={handlePrevClick} disabled={!prevEventId}>
            <PrevTriButtonIcon
              inactive={!prevEventId}
              color={getProgressAndButtonColor(
                currentEvent.emotion as EmotionType,
              )}
            />
          </button>
          <div className="flex flex-col items-center">
            <span
              className="font-pretendard-300 text-[20px] text-center"
              style={{ color: 'rgba(0,0,0,0.60)' }}
            >
              {currentEvent.title}
            </span>
            <span className="font-pretendard-200 text-[12px] text-[#969A9C] text-center">
              {currentEvent.startDate} - {currentEvent.endDate}
            </span>
          </div>
          <button onClick={handleNextClick} disabled={!nextEventId}>
            <NextTriButtonIcon
              inactive={!nextEventId}
              color={getProgressAndButtonColor(
                currentEvent.emotion as EmotionType,
              )}
            />
          </button>
        </div>
      </div>
      {currentEventId && (
        <EventPage
          key={currentEventId}
          eventId={currentEventId}
          setStep={setCurrentIndex}
        />
      )}
      <NavBar />
    </div>
  );
}
