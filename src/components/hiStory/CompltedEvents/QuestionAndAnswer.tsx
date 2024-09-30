import { CompleteEventType, QuestionContentType } from '@/types/hiStory';
import { useEffect, useState } from 'react';

interface Props {
  question: QuestionContentType | CompleteEventType['representativeQuestion'];
  title?: string;
  isRepresent?: boolean;
  isAvailBookmark?: boolean;
}

const QuestionAndAnswer = ({
  question,
  title,
  isRepresent = false,
  isAvailBookmark = false,
}: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(!!title);
  }, [question, title]);

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

  const renderAnswer = (type: string) => {
    switch (type) {
      case 'TEXT':
        return <p className="leading-[24px]">{question.myAnswer}</p>;
      case 'IMAGE':
        return (
          <img
            src={question.fileUrl}
            alt="answer"
            className="w-full h-[100px] object-cover mt-2"
          />
        );
      case 'VOICE':
        return (
          <p className="leading-[24px]">Voice answer not implemented yet</p>
        );
      default:
        return <p className="leading-[24px]">{question.myAnswer}</p>;
    }
  };

  return (
    <div className="w-[calc(100%-40px)] mx-auto">
      {title && (
        <div className="w-full flex justify-center">
          <div className="w-[calc(100%-24px)] h-[20px] mb-3">
            <span className="font-pretendard-400 text-[#888] text-[14px]">
              {title}
            </span>
          </div>
        </div>
      )}

      <div
        className={`w-full h-auto py-4 mb-2.5 self-center rounded-[10px]`}
        style={backgroundStyle}
        onClick={() => !title && setShowAnswer(!showAnswer)}
      >
        <div className="w-full flex flex-col items-start justify-center px-[10px]">
          <div className="w-full flex">
            <div className="flex-shrink-0 w-[34px]">
              <span className="font-pretendard-300 text-[#BAD7EC] text-[24px] leading-[24px]">
                Q.
              </span>
            </div>
            <span className="font-pretendard-200 text-[14px] flex-grow leading-[24px]">
              {question.content}
            </span>
          </div>

          {question.isAnswer && (showAnswer || !!title) && (
            <div className="w-full flex mt-2">
              <div className="flex-shrink-0 w-[34px]">
                <span className="font-pretendard-300 text-[#BAD7EC] text-[24px] leading-[24px]">
                  A.
                </span>
              </div>
              <div className="flex-grow font-pretendard-200 text-[14px]">
                {renderAnswer(question.type!)}
              </div>
            </div>
          )}

          {/* {isBookmarking && (
          // TODO: Implement bookmarking functionality
        )} */}
        </div>
      </div>
    </div>
  );
};

export default QuestionAndAnswer;
