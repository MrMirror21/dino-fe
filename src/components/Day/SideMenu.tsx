import MenuIcon from '@/assets/icon/Menu.svg';
import CloseIcon from '@/assets/icon/CloseIcon.svg';
import Image from 'next/image';

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
        className={`absolute x top-0 -right-1 h-full w-64 px-6 py-4 bg-white/80 backdrop-blur-[22px] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-row justify-between mb-7">
          <div className="flex flex-row justify-center items-center gap-2">
            <MenuIcon />
            <div className="text-[#888] text-center font-pretendard-300 text-sm leading-5">
              MENU
            </div>
          </div>
          <div
            className=" flex items-center justify-center"
            onClick={toggleMenu}
          >
            <CloseIcon />
          </div>
        </div>
        <div className="flex justify-between pb-8">
          <div className="text-[#333] font-pretendard text-2xl font-normal tracking-[-0.3px]">
            ##님
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
              로그인
            </div>
            <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
              카카오계정
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] mb-8 bg-gray-300" />
        <div className="">
          <ul className="space-y-2">
            <div className="flex h-14 px-5 py-3 rounded bg-white justify-between items-center self-stretch">
              <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
                내 정보 수정하기
              </div>
              <Image alt="penImg" width={32} height={32} src="/image/pen.png" />
            </div>
            <div className="flex h-14 px-5 py-3 rounded bg-white justify-between items-center self-stretch">
              <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
                질문 알람받기
              </div>
              <Image
                alt="penImg"
                width={32}
                height={32}
                src="/image/clock.png"
              />
            </div>
            <div className="flex h-14 px-5 py-3 rounded bg-white justify-between items-center self-stretch">
              <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
                고객센터 문의하기
              </div>
              <Image
                alt="penImg"
                width={32}
                height={32}
                src="/image/talk.png"
              />
            </div>
            <div className="flex h-14 px-5 py-3 rounded bg-white justify-between items-center self-stretch">
              <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
                설정 바로가기
              </div>
              <Image
                alt="penImg"
                width={32}
                height={32}
                src="/image/setting.png"
              />
            </div>
          </ul>
        </div>
        <div className="absolute left-[34px] bottom-[36px] flex gap-3 text-[#888] font-pretendard-300 text-base leading-5 tracking-[-0.48px]">
          <div>로그아웃</div>
          <div>회원탈퇴</div>
        </div>
      </div>
    </div>
  );
};

export default SlideMenu;
