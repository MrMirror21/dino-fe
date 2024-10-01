import { FunctionComponent, ReactElement } from 'react';

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
        className="w-[50px] h-[81px] flex flex-col gap-[7px] justify-center items-center"
        onClick={() => router.push(goTo)}
      >
        {children}
      </div>
    </div>
  );
};

const NavBar: FunctionComponent = () => {
  const pathName = useRouter().pathname;
  const router = useRouter();
  return (
    <div className="flex justify-self-center justify-between w-full shadow-[0_-2px_12px_rgba(68,68,68,0.08)] rounded-t-[20px] bg-white h-[81px] absolute bottom-1">
      <NavBarIcon goTo="/day">
        <>
          <DayIcon active={router.pathname === '/day'} />
          <div
            className={`${
              router.pathname === '/day' ? 'text-[#8ABADD]' : 'text-[#CCC]'
            } text-center font-edensor text-xs font-bold`}
          >
            Day
          </div>
        </>
      </NavBarIcon>
      <NavBarIcon goTo="/dream">
        <>
          <DreamIcon active={router.pathname === '/dream'} />
          <div
            className={`${
              router.pathname === '/dream' ? 'text-[#8ABADD]' : 'text-[#CCC]'
            } text-center font-edensor text-xs font-bold`}
          >
            Dream
          </div>
        </>
      </NavBarIcon>
      <NavBarIcon goTo="/hi-story">
        <>
          <HiStoryIcon active={router.pathname === '/hi-story'} />
          <div
            className={`${
              router.pathname === '/hi-story' ? 'text-[#8ABADD]' : 'text-[#CCC]'
            } text-center font-edensor text-xs font-bold`}
          >
            Hi, story
          </div>
        </>
      </NavBarIcon>
      <NavBarIcon goTo="/ing">
        <>
          <IngIcon active={router.pathname === '/ing'} />
          <div
            className={`${
              router.pathname === '/ing' ? 'text-[#8ABADD]' : 'text-[#CCC]'
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
