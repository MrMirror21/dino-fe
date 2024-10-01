import Image from 'next/image';
import { QuestionContentType } from '@/types/question';

interface Props {
  questionList: QuestionContentType[];
}

const SavedQuestionThumbnail = ({ questionList }: Props) => {
  return (
    <div className="flex flex-col w-full items-center">
      {questionList.map((question, index) => (
        <div
          key={index}
          className="w-[calc(100%-40px)] py-4 mb-[12px] rounded-[10px] bg-white"
          style={{ boxShadow: '0px 2px 16px 0px rgba(68, 68, 68, 0.12)' }}
        >
          <div className="w-full flex flex-col items-center justify-center px-[10px]">
            <div className="w-full items-center flex">
              <Image
                src="/image/Q.png"
                alt="question-image"
                width={22}
                height={24}
              />
              <span className="ml-1.5 font-pretendard-200 text-[14px]">
                {question.content}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedQuestionThumbnail;
