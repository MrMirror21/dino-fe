import React, { useState } from 'react';

import AudioRecord from './AudioRecord';
import CameraModalPro from './CameraModalPro';
interface QuestionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const QuestionModal = ({ isOpen, setIsOpen }: QuestionModalProps) => {
  const [isCameraSelectOn, setIsCameraSelectOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsCameraSelectOn(false);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative h-screen ">
      <div
        onClick={toggleModal}
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
          <div className="flex flew-row gap-2 bg-white px-3 py-4 w-[calc(100vw-40px)] rounded-[10px] shadow-lg mb-4">
            <h2 className="text-[#BAD7EC] font-edensor text-2xl leading-[20px] tracking-[-1px] flex justify-start">
              Q.
            </h2>
            <p className="text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px]">
              ( ) 하고 싶은 것을 이룬다면, 가장 먼저 알리고 싶은 사람은
              누구인가요?
            </p>
          </div>
          <AudioRecord
            onCameraClick={() => setIsCameraSelectOn(true)}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            closeModal={toggleModal}
          />
        </div>
      </div>
      {isCameraSelectOn && (
        <div
          onClick={() => setIsCameraSelectOn(false)}
          className={`fixed inset-0 transition-opacity duration-1000 ease-in-out flex flex-col-reverse items-center ${
            isCameraSelectOn
              ? 'bg-opacity-50'
              : 'bg-opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={'flex flex-col-reverse'}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => setIsCameraSelectOn(false)}
              className="flex items-center justify-center bg-white px-5 py-5 mb-10 w-[calc(100vw-40px)] rounded-[10px] shadow-lg text-[var(--0-Black-Color)] text-center font-['Pretendard-Regular'] text-base leading-[120%] tracking-[-0.64px]"
            >
              취소하기
            </div>
            <div className="flex flex-col items-center bg-white px-5 w-[calc(100vw-40px)] rounded-[10px] shadow-lg mb-4">
              <div
                onClick={() => setIsCameraOn(true)}
                className="flex items-center justify-center w-full py-5 text-[var(--0-Black-Color)] text-center font-['Pretendard-Regular'] text-base leading-[120%] tracking-[-0.64px] border-b border-b-gray-300"
              >
                사진 찍기
              </div>
              <label
                className="flex items-center justify-center w-full py-5 text-[var(--0-Black-Color)] text-center font-['Pretendard-Regular'] text-base leading-[120%] tracking-[-0.64px]"
                htmlFor="imgfile"
              >
                앨범에서 불러오기
              </label>
              <input
                type="file"
                name="imgfile"
                id="imgfile"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      )}
      {isCameraOn && (
        <CameraModalPro
          selectImage={setSelectedImage}
          closeCameraSelect={() => setIsCameraSelectOn(false)}
          onClose={() => setIsCameraOn(false)}
        />
      )}
    </div>
  );
};

export default QuestionModal;
