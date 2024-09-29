import MenuIcon from '@/assets/icon/Menu.svg';
import { useRouter } from 'next/router';
import React from 'react';

interface HeaderProps {
  onClick: () => void;
}
const Header = ({ onClick }: HeaderProps) => {
  const router = useRouter();
  const pageName = router.pathname.split('/')[1][0].toUpperCase() + router.pathname.split('/')[1].slice(1);
  return (
    <div className="flex items-center justify-between w-full h-[52px] px-5">
      <div className="text-black/40 font-['edensor'] text-[22px] font-bold">
        {pageName}
      </div>
      <button
        onClick={onClick}
        className="flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <MenuIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Header;
