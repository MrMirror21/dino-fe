import MenuIcon from '@/assets/icon/Menu.svg';
import React from 'react';

interface HeaderProps {
  onClick: () => void;
}
const Header = ({ onClick }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full h-[52px] px-5">
      <div>DayDream</div>
      <button
        onClick={onClick}
        className="flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <MenuIcon className="w-6 h-6 " />
      </button>
    </div>
  );
};

export default Header;
