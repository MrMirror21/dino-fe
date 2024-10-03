import React, { useState } from 'react';

import ApproveIcon from '@/assets/icon/ApproveIcon.svg';
import CloseIconWithCircle from '@/assets/icon/CloseIconWithCircle.svg';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  content: string | React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  content,
  onConfirm,
}: ModalProps) => {
  const [isCloseDisabled, setIsCloseDisabled] = useState<boolean>(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState<boolean>(false);

  const handleClose = () => {
    if (!isCloseDisabled) {
      setIsCloseDisabled(true);
      setIsOpen(false);
      // 모달이 완전히 닫힌 후 버튼을 다시 활성화
      setTimeout(() => setIsCloseDisabled(false), 300);
    }
  };

  const handleApprove = () => {
    if (!isConfirmDisabled) {
      setIsConfirmDisabled(true);
      onConfirm();
      setIsOpen(false);
      // 모달이 완전히 닫힌 후 버튼을 다시 활성화
      setTimeout(() => setIsConfirmDisabled(false), 300);
    }
  };

  return (
    <div>
      <div className="relative h-screen">
        <div
          onClick={() => !isCloseDisabled && setIsOpen(false)}
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex flex-col ${
            isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`transform transition-all duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 ${
              isOpen
                ? '-translate-y-1/2 opacity-100'
                : 'translate-y-full opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3 items-center bg-white py-5 w-[calc(100vw-40px)] rounded-[10px] shadow-lg mb-4 text-[#000] text-center font-pretendard-light text-base tracking-[-0.64px]">
              {content}
              <div className="flex flex-row items-center gap-2">
                <button
                  onClick={handleClose}
                  disabled={isCloseDisabled}
                  className={`transition-opacity duration-300 ${
                    isCloseDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'opacity-100'
                  }`}
                >
                  <CloseIconWithCircle />
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isConfirmDisabled}
                  className={`transition-opacity duration-300 ${
                    isConfirmDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'opacity-100'
                  }`}
                >
                  <ApproveIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
