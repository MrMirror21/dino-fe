import { useEffect, useState } from 'react';

import CloseIcon from '@/assets/icon/CloseIcon.svg';
import ConfirmModal from '../common/ConfirmModal';
import Image from 'next/image';
import MenuIcon from '@/assets/icon/Menu.svg';
import { tokenUtils } from '@/utils/tokenUtils';
import { useChangeName } from '@/hooks/api/useUser';

interface SlideMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const SlideMenu = ({ isOpen, setIsOpen }: SlideMenuProps) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [onAlarm, setOnAlarm] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string | null>(null);

  const {
    mutate: changeUserName,
    isPending,
    isSuccess,
    isError,
  } = useChangeName();

  const handleNameChange = () => {
    setIsOpenModal(true);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAlarm = () => {
    setOnAlarm(!onAlarm);
  };

  const handleSupport = () => {
    const email = 'xum58@khu.ac.kr';
    const subject = encodeURIComponent('고객 지원 문의');
    const body = encodeURIComponent(
      '안녕하세요, 다음과 관련하여 문의드립니다:',
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  const confirmNameChange = () => {
    if (newName?.trim()) {
      changeUserName(
        { nickname: newName.trim() },
        {
          onSuccess: () => {
            setUserName(newName.trim());
            tokenUtils.setUserName(newName.trim());
            setIsOpenModal(false);
          },
          onError: (error) => {
            console.error('이름 변경 실패:', error);
          },
        },
      );
    } else {
      setIsOpenModal(false);
    }
  };

  useEffect(() => {
    const storedName = tokenUtils.getUserName();
    if (!storedName) {
      window.location.reload();
    } else {
      setUserName(storedName);
      setNewName(storedName);
    }
  }, []);

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
            {userName ? `${userName}님` : ''}
          </div>
          {/* <div className="flex justify-between items-center gap-2">
            <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
              로그인
            </div>
            <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
              카카오계정
            </div>
          </div> */}
        </div>
        <div className="w-full h-[1px] mb-8 bg-gray-300" />
        <div className="">
          <ul className="space-y-2">
            <div
              className="flex h-14 px-5 py-3 rounded bg-white justify-between items-center self-stretch"
              onClick={handleNameChange}
            >
              <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
                이름 변경하기
              </div>
              <Image alt="penImg" width={32} height={32} src="/image/pen.png" />
            </div>
            <div
              className="flex h-14 px-5 py-3 rounded bg-white justify-between items-center self-stretch ease-in-out duration-700"
              onClick={toggleAlarm}
            >
              <div className="text-[#888] font-pretendard-300 text-xs leading-5 tracking-[-0.48px]">
                질문 알람 받기
              </div>
              <div className="relative w-8 h-8">
                <Image
                  alt="clockOffImg"
                  width={32}
                  height={32}
                  src="/image/clock.png"
                  className={`absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${
                    onAlarm ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <Image
                  alt="clockOnImg"
                  width={32}
                  height={32}
                  src="/image/clockOn.png"
                  className={`absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${
                    onAlarm ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
            <div
              className="flex h-14 px-5 py-3 rounded bg-white justify-between items-center self-stretch"
              onClick={handleSupport}
            >
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
      <ConfirmModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        content={
          <div className="py-3 w-[calc(100%-56px)] flex flex-col gap-3 items-center mt-3.5">
            <span className="text-[#000] text-center font-pretendard-300 text-base tracking-[-0.64px]">
              이름을 변경하시겠습니까?
            </span>
            <input
              type="text"
              value={newName || ''}
              onChange={(e) => setNewName(e.target.value)}
              className="border rounded-lg px-2 w-full h-[52px] bg-[#E9E9E9] text-center"
            />
          </div>
        }
        onConfirm={confirmNameChange}
      />
    </div>
  );
};

export default SlideMenu;
