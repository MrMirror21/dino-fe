import { CompleteEventType, QuestionContentType } from '@/types/hiStory';
import { useEffect, useState } from 'react';

interface Props {
  question: QuestionContentType | CompleteEventType['representativeQuestion'];
  isRepresent?: boolean;
}

const QuestionAndAnswer = ({ question, isRepresent = false }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [question]);

  const backgroundStyle = isRepresent
    ? {
        background:
          'radial-gradient(243.74% 263.56% at 75.29% 143.06%, rgba(138, 186, 221, 0.20) 0%, rgba(186, 215, 236, 0.00) 100%), #FFF',
        boxShadow: '0px 2px 16px 0px rgba(68, 68, 68, 0.12)',
      }
    : {
        backgroundColor: '#FFF',
        boxShadow: '0px 2px 16px 0px rgba(68, 68, 68, 0.12)',
      };

  return (
    <div
      className={`w-full h-auto py-4 mb-2.5 self-center rounded-[10px]`}
      style={backgroundStyle}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="w-full flex flex-col items-center justify-center px-[10px]">
        <div className="w-full items-center flex">
          <span className="font-pretendard-300 text-[#BAD7EC] text-[24px]">
            Q.
          </span>
          <span className="ml-[10px] font-pretendard-200 text-[14px]">
            {question.content}
          </span>
        </div>

        {question.isAnswer && showAnswer && (
          <div className="w-full flex items-center">
            <span className="font-pretendard-300 text-[#BAD7EC] text-[24px]">
              A.
            </span>
            <span className="ml-[10px] font-pretendard-200 text-[14px]">
              {question.myAnswer}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionAndAnswer;
