import { MediaType, MyAnswer } from '@/types/answerType';
import React, { Dispatch, SetStateAction, useState } from 'react';

import AudioRecord from './AudioRecord';
import CameraModalPro from './CameraModalPro';
import ConfirmModal from '../common/ConfirmModal';
import { QuestionType } from '@/types/event';
import { usePostAnswer } from '@/hooks/api/useQuestion';

interface QuestionModalProps {
  selectedQuestion: QuestionType | undefined;
  onClose: Dispatch<SetStateAction<QuestionType | undefined>>;
  eventId: number;
  questionId: number;
}

const QuestionModal = ({
  selectedQuestion,
  onClose,
  eventId,
  questionId,
}: QuestionModalProps) => {
  const [isCameraSelectOn, setIsCameraSelectOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { mutate, error } = usePostAnswer();
  const toggleModal = () => {
    onClose(undefined);
  };
  const [myAnswer, setMyAnswer] = useState<MyAnswer>({
    content: '',
    type: 'TEXT',
  });
  const [file, setFile] = useState<File | undefined>(undefined);
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
      setMyAnswer({ ...myAnswer, type: 'IMAGE' });
      setFile(file);
    }
  };

  const handleSubmit = () => {
    mutate({
      eventId: eventId,
      questionId: questionId,
      answer: { content: myAnswer.content, type: myAnswer.type },
      mediaFile: file,
    });
  };

  return (
    <div className="relative h-screen ">
      <div
        onClick={toggleModal}
        className={`fixed inset-0 bg-black transition-opacity duration-1000 ease-in-out flex flex-col ${
          selectedQuestion
            ? 'bg-opacity-50'
            : 'bg-opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex-1 transform transition-all duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 ${
            selectedQuestion
              ? '-translate-y-1/2 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row gap-2 bg-white px-3 py-4 w-[calc(100vw-40px)] rounded-[10px] shadow-lg mb-4 break-keep">
            <h2 className="text-[#BAD7EC] font-edensor text-2xl leading-[20px] tracking-[-1px] flex justify-start">
              Q.
            </h2>
            <p className="text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px] text-left">
              {selectedQuestion?.content}
            </p>
          </div>
          <AudioRecord
            answer={myAnswer}
            setAnswer={setMyAnswer}
            setFile={setFile}
            onCameraClick={setIsCameraSelectOn}
            isCameraSelectOn={isCameraSelectOn}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onSubmit={() => setIsSubmit(true)}
          />
        </div>
        {isCameraSelectOn && (
          <div
            onClick={() => setIsCameraSelectOn(false)}
            className={`fixed bottom-[60px] flex-1 inset-0 transition-opacity duration-1000 ease-in-out flex flex-col-reverse items-center ${
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
      </div>
      {isCameraOn && (
        <CameraModalPro
          selectImage={setSelectedImage}
          closeCameraSelect={() => setIsCameraSelectOn(false)}
          onClose={() => setIsCameraOn(false)}
        />
      )}
      {isSubmit && (
        <ConfirmModal
          content="이대로 저장하시겠습니까?"
          isOpen={isSubmit}
          setIsOpen={setIsSubmit}
          onConfirm={handleSubmit}
        />
      )}
    </div>
  );
};

export default QuestionModal;
