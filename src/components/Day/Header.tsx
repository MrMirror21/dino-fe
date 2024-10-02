import ChevronLeftIcon from '@/assets/icon/ChevronLeftIcon.svg';
import MenuIcon from '@/assets/icon/Menu.svg';
import React from 'react';
import { useRouter } from 'next/router';

interface HeaderProps {
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const router = useRouter();

  const getPageName = () => {
    const path = router.pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getBackPath = (): string | null => {
    const pathSegments = router.pathname.split('/');
    if (pathSegments.length <= 2) return null;
    return '/' + pathSegments.slice(0, -1).join('/');
  };

  const renderHeaderContent = () => {
    const pageName = getPageName();
    const backPath = getBackPath();

    if (pageName === 'Hi-story') {
      if (router.pathname === '/hi-story') return 'Hi Story';
      if (backPath) {
        return (
          <div
            onClick={() => router.push(backPath)}
            className="flex items-center gap-2 text-[#8ABADD] text-[20px] font-pretendard-500"
          >
            <ChevronLeftIcon />
            {router.pathname === '/hi-story/saved-questions' && (
              <span>Moments</span>
            )}

            {(router.pathname === '/hi-story/completed-events' ||
              router.pathname.startsWith('/hi-story/completed-events/')) && (
              <span>Growths</span>
            )}
          </div>
        );
      }
    }

    return pageName;
  };

  return (
    <div className="flex items-center justify-between w-full h-[52px] px-5">
      <div className="text-black/40 font-edensor text-[22px] font-bold">
        {renderHeaderContent()}
      </div>

      {onClick && (
        <button
          onClick={onClick}
          className="flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Header;
