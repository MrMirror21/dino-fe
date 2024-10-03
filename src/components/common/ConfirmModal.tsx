import ApproveIcon from '@/assets/icon/ApproveIcon.svg';
import CloseIconWithCircle from '@/assets/icon/CloseIconWithCircle.svg';
import React from 'react';

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
  const handleApprove = () => {
    onConfirm();
    setIsOpen(false);
  };
  return (
    <div>
      <div className="relative h-screen ">
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed inset-0 bg-black transition-opacity duration-1000 ease-in-out flex flex-col ${
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
                <div onClick={() => setIsOpen(false)}>
                  <CloseIconWithCircle />
                </div>
                <div onClick={handleApprove}>
                  <ApproveIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
