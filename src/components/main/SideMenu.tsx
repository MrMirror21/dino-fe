//ToDo: 디자인 적용 시 수정 필요

import MenuIcon from '@/assets/icon/Menu.svg';

interface SlideMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const SlideMenu = ({ isOpen, setIsOpen }: SlideMenuProps) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-10">
      <div
        className={`absolute x top-0 -right-1 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-center items-center gap-1 p-3">
            <MenuIcon />
            <span>MENU</span>
          </div>
          <div className="p-3" onClick={toggleMenu}>
            X
          </div>
        </div>

        <div className="p-4">
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-100 rounded">내 정보 수정하기</li>
            <li className="p-2 hover:bg-gray-100 rounded">질문 열람받기</li>
            <li className="p-2 hover:bg-gray-100 rounded">고객센터 문의하기</li>
            <li className="p-2 hover:bg-gray-100 rounded">설정 바로가기</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlideMenu;
