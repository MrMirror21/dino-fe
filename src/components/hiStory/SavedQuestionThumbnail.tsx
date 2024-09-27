import { MonthAllEventsType, QuestionContentType } from '@/types/hiStory';

interface Props {
  questionList: QuestionContentType[];
}

const SavedQuestionThumbnail = ({ questionList }: Props) => {
  return (
    <div className="flex flex-col w-full items-center">
      {questionList.map((question, index) => (
        <div
          className="w-[calc(100%-40px)] h-[72px] mb-[12px] rounded-[10px] bg-white"
          style={{ boxShadow: '0px 2px 16px 0px rgba(68, 68, 68, 0.12)' }}
        >
          <div className="w-full h-[72px] flex flex-col items-center justify-center px-[10px]">
            <div className="w-full items-center flex h-[26px]">
              <span className="font-pretendard-300 text-[#BAD7EC] text-[24px]">
                Q.
              </span>
              <span className="ml-[10px] font-pretendard-200 text-[14px]">
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
