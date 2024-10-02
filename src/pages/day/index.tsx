// main/index
import React, { Suspense } from 'react';

import { EmotionType } from '@/types/emotion';
import EventPage from '@/components/Day/EventPage';
import Header from '../../components/Day/Header';
import NavBar from '@/components/common/NavBar';
import NextTriButtonIcon from '@/assets/icon/NextTriButtonIcon';
import PrevTriButtonIcon from '@/assets/icon/PrevTriButtonIcon';
import SlideMenu from '@/components/Day/SideMenu';
import { getBackGroundStyle } from '@/utils/emotionColor';
import { useGetEvents } from '@/hooks/api/useEvent';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {}

export default function MainPage<Props>({}) {
  const { data, isSuccess, error } = useGetEvents();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(data?.data);

  const prevEventId =
    currentIndex > 0 ? data?.data[currentIndex - 1].eventId : null;
  const nextEventId =
    currentIndex < data?.data.length - 1
      ? data?.data[currentIndex + 1].eventId
      : null;
  const handlePrevClick = () => {
    prevEventId && setCurrentIndex(currentIndex - 1);
  };

  const handleNextClick = () => {
    nextEventId && setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <div
        className={`flex flex-col text-center w-full h-screen items-center`}
        style={getBackGroundStyle(
          data?.data?.[currentIndex]?.emotion as EmotionType,
        )}
      >
        <Header onClick={() => setIsSideMenuOpen(true)} />
        <SlideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
        <div className="w-[calc(100%-40px)] max-w-2xl">
          <div className="flex items-center justify-between my-4">
            <button onClick={handlePrevClick} disabled={!prevEventId}>
              <PrevTriButtonIcon inactive={!prevEventId} />
            </button>

            <div className="flex flex-col items-center">
              <span
                className="font-pretendard-300 text-[20px] text-center"
                style={{ color: 'rgba(0,0,0,0.60)' }}
              >
                {data?.data?.[currentIndex]?.title}
              </span>
              <span className="font-pretendard-200 text-[12px] text-[#969A9C] text-center">
                {data?.data?.[currentIndex]?.startDate.toString()} -{' '}
                {data?.data?.[currentIndex]?.endDate.toString()}
              </span>
            </div>

            <button onClick={handleNextClick} disabled={!nextEventId}>
              <NextTriButtonIcon inactive={!nextEventId} />
            </button>
          </div>
        </div>
        {isSuccess && (
          <EventPage
            eventId={data?.data?.[currentIndex]?.eventId}
            setStep={setCurrentIndex}
          />
        )}
        <NavBar />
      </div>
    </>
  );
}
