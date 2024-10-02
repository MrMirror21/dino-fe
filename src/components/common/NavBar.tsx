import { FunctionComponent, ReactElement } from 'react';
import React, { useEffect } from 'react';

import CalendarIcon from '@/assets/icon/CalendarIcon.svg';
import DayIcon from '@/assets/icon/navBar/dayIcon';
import DiaryIcon from '@/assets/icon/DiaryIcon.svg';
import DreamIcon from '@/assets/icon/navBar/dreamIcon';
import HiStoryIcon from '@/assets/icon/navBar/hiStoryIcon';
import IngIcon from '@/assets/icon/navBar/ingIcon';
import MoonIcon from '@/assets/icon/MoonIcon.svg';
import { useRouter } from 'next/router';

interface NavBarIconProps {
  goTo: string;
  children: ReactElement;
}

const NavBarIcon = ({ goTo, children }: NavBarIconProps) => {
  const router = useRouter();
  return (
    <div className="w-1/3 h-70 flex justify-center items-center">
      <div
        className="w-[50px] h-[81px] flex flex-col justify-center items-center"
        onClick={() => router.push(goTo)}
      >
        {children}
      </div>
    </div>
  );
};

const NavBar: FunctionComponent = () => {
  const router = useRouter();
  const pathName = router.pathname;

  if (
    pathName === '/hi-story/completed-events/[eventId]' ||
    pathName === '/hi-story/completed-events' ||
    pathName === '/hi-story/saved-questions'
  )
    return null;

  const isIngActive = pathName.startsWith('/ing');

  return (
    <div className="flex justify-self-center justify-between w-full shadow-[0_-2px_12px_rgba(68,68,68,0.08)] rounded-t-[20px] bg-white h-[81px] absolute bottom-1">
      <NavBarIcon goTo="/day">
        <>
          <DayIcon active={pathName === '/day'} />
          <div
            className={`${
              pathName === '/day' ? 'text-[#8ABADD]' : 'text-[#CCC]'
            } text-center font-edensor text-xs font-bold`}
          >
            Day
          </div>
        </>
      </NavBarIcon>
      <NavBarIcon goTo="/dream">
        <>
          <DreamIcon active={pathName === '/dream'} />
          <div
            className={`${
              pathName === '/dream' ? 'text-[#8ABADD]' : 'text-[#CCC]'
            } text-center font-edensor text-xs font-bold`}
          >
            Dream
          </div>
        </>
      </NavBarIcon>
      <NavBarIcon goTo="/hi-story">
        <>
          <HiStoryIcon active={pathName === '/hi-story'} />
          <div
            className={`${
              pathName === '/hi-story' ? 'text-[#8ABADD]' : 'text-[#CCC]'
            } text-center font-edensor text-xs font-bold`}
          >
            Hi, story
          </div>
        </>
      </NavBarIcon>
      <NavBarIcon goTo="/ing">
        <>
          <IngIcon active={isIngActive} />
          <div
            className={`${
              isIngActive ? 'text-[#8ABADD]' : 'text-[#CCC]'
            } text-center font-edensor text-xs font-bold`}
          >
            ~ ing
          </div>
        </>
      </NavBarIcon>
    </div>
  );
};

export default NavBar;
