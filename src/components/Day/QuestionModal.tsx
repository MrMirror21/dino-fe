import { MediaType, MyAnswer } from '@/types/answerType';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import AudioRecord from './AudioRecord';
import CameraModalPro from './CameraModalPro';
import ConfirmModal from '../common/ConfirmModal';
import Landing from '../login/Landing';
import { QuestionType } from '@/types/event';
import { usePostAnswer } from '@/hooks/api/useQuestion';
import { useRouter } from 'next/router';

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
  const { mutate, error, isSuccess, isPending } = usePostAnswer();
  const router = useRouter();
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

  useEffect(() => {
    if (isSuccess) {
      router.push('/day');
    }
  }, [isSuccess]);
  if (isPending) return <Landing />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={toggleModal}
      />
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto flex-grow p-4">
          <div className="flex flex-row gap-2 bg-white px-3 py-4 rounded-[10px] shadow-lg mb-4 break-keep">
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
      </div>
      {isCameraSelectOn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-lg">
            <div className="p-4">
              <button
                onClick={() => setIsCameraOn(true)}
                className="w-full py-3 mb-2 bg-gray-100 rounded-lg"
              >
                사진 찍기
              </button>
              <label
                htmlFor="imgfile"
                className="block w-full py-3 mb-2 bg-gray-100 rounded-lg text-center"
              >
                앨범에서 불러오기
              </label>
              <input
                type="file"
                name="imgfile"
                id="imgfile"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={() => setIsCameraSelectOn(false)}
                className="w-full py-3 bg-white rounded-lg"
              >
                취소하기
              </button>
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
