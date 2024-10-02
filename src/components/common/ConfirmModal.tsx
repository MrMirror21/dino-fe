import React from 'react';
import ApproveIcon from '@/assets/icon/ApproveIcon.svg';
import CloseIcon from '@/assets/icon/CloseIcon.svg';
import DeleteIcon from '@/assets/icon/DeleteIcon.svg';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  content: string;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  content,
  onConfirm,
}: ModalProps) => {
  const handleApprove = () => {};
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
            <div className="flex flex-col gap-2 bg-white px-3 py-4 w-[calc(100vw-40px)] rounded-[10px] shadow-lg mb-4">
              {content}
              <div>
                <div onClick={handleApprove}>
                  <ApproveIcon />
                </div>

                <CloseIcon />
                <DeleteIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
