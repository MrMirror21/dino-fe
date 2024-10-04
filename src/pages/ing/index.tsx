import React, { useState } from 'react';

import EventCard from '@/components/ing/EventCard';
import Header from '@/components/Day/Header';
import NavBar from '@/components/common/NavBar';
import { useRouter } from 'next/router';
import { useGetEvents } from '@/hooks/api/useEvent';
import { EventType } from '@/types/event';
import NoEventCard from '@/components/ing/NoEventCard';

const IngPage = () => {
  const router = useRouter();
  const { data, isSuccess, error } = useGetEvents();
  return (
    <div className="w-full h-screen items-center bg-custom-gradient">
      <Header />
      {data?.data.length == 0 && <NoEventCard />}
      <div className="flex flex-col w-full px-5 gap-3 items-center">
        {data?.data.map((element: EventType) => (
          <EventCard {...element} />
        ))}
      </div>

      {data?.data.length < 3 && (
        <div className="absolute bottom-[100px] w-full px-5 flex items-center jusify-center">
          <button
            onClick={() => router.push('/ing/create')}
            className="w-full relative shadow-[0_2px_20px_rgba(136,136,136,0.12)] rounded-lg bg-white/80 h-[52px] text-black/60 text-center font-pretendard-300 text-base leading-[120%] tracking-[-0.64px]"
          >
            새로운 이벤트 생성
          </button>
        </div>
      )}
      <NavBar />
    </div>
  );
};

export default IngPage;
