import React, { useEffect, useState } from 'react';

import ApproveIcon from '@/assets/icon/ApproveIcon.svg';
import CloseIconWithCircle from '@/assets/icon/CloseIconWithCircle.svg';
import ToNextIcon from '@/assets/icon/ToNextIcon.svg';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  content: string | React.ReactNode;
  onConfirm: () => void;
}

interface EndingModalProps {
  isOpen: boolean;
  content1: string;
  content2: string;
  imgUrl: string;
  keyword: string;
  period: number;
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!isCloseDisabled) {
      setIsCloseDisabled(true);
      setIsOpen(false);
      setTimeout(() => setIsCloseDisabled(false), 300);
    }
  };

  const handleApprove = () => {
    if (!isConfirmDisabled) {
      setIsConfirmDisabled(true);
      onConfirm();
      setIsOpen(false);
      setTimeout(() => setIsConfirmDisabled(false), 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 ease-in-out"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-40px)]">
        <div
          className="bg-white rounded-[10px] shadow-lg py-5 w-full transition-all duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-3 items-center text-center font-pretendard-light text-base tracking-[-0.64px] text-black">
            {content}
            <div className="flex flex-row items-center gap-2 mt-4">
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
  );
};

export const ConfirmEndingModal = ({
  isOpen,
  content1,
  content2,
  keyword,
  imgUrl,
  period,
  onConfirm,
}: EndingModalProps) => {
  const [isCloseDisabled, setIsCloseDisabled] = useState<boolean>(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleApprove = () => {
    if (!isConfirmDisabled) {
      setIsConfirmDisabled(true);
      onConfirm();
      setTimeout(() => setIsConfirmDisabled(false), 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 ease-in-out"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-40px)]">
        <div
          className="bg-white rounded-[10px] shadow-lg py-5 w-full transition-all duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex flex-col gap-3 items-center text-center">
            {imgUrl && (
              <Image src={imgUrl} alt="finalImg" width={220} height={220} />
            )}
            <div className="flex flex-row items-center justify-center font-pretendard-light text-base text-center tracking-[-0.64px] text-black">
              {period}
              {content1}
            </div>
            <div className="w-[calc(100%-40px)] text-center font-pretendard-light text-base tracking-[-0.64px] text-black">
                <b>{keyword}</b> 을/를
            </div>
            <div className="w-[calc(100%-40px)] font-pretendard-light text-base tracking-[-0.64px] text-black">
                {content2}
            </div>
            <div className="flex flex-row items-center gap-2 mt-8">
              <button
                onClick={handleApprove}
                disabled={isConfirmDisabled}
                className={`transition-opacity duration-300 ${
                  isConfirmDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'opacity-100'
                }`}
              >
                <ToNextIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
