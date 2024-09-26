import { FunctionComponent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import CalendarIcon from '@/assets/icon/CalendarIcon.svg';
import MoonIcon from '@/assets/icon/MoonIcon.svg';
import DiaryIcon from '@/assets/icon/DiaryIcon.svg';

interface NavBarIconProps {
  goTo: string;
  children: ReactElement;
}

const NavBarIcon = ({ goTo, children }: NavBarIconProps) => {
  const router = useRouter();
  return (
    <div className="w-1/3 h-70 flex justify-center items-center">
      <div className="w-[34px] h-[34px]" onClick={() => router.push(goTo)}>
        {children}
      </div>
    </div>
  );
};

const NavBar: FunctionComponent = () => {
  const pathName = useRouter().pathname;
  return (
    <div className="flex justify-self-center justify-between w-full shadow-[0_-2px_12px_rgba(68,68,68,0.08)] rounded-t-[20px] bg-white h-[68px] absolute bottom-1">
      <NavBarIcon goTo="/calendar">
        <CalendarIcon fill={pathName === '/calendar' ? '#111111' : '#999999'} />
      </NavBarIcon>
      <NavBarIcon goTo="/calendar">
        <MoonIcon fill={pathName === '/' ? '#111111' : '#999999'} />
      </NavBarIcon>
      <NavBarIcon goTo="/ing">
        <DiaryIcon fill={pathName === '/diary' ? '#111111' : '#999999'} />
      </NavBarIcon>
    </div>
  );
};

export default NavBar;
