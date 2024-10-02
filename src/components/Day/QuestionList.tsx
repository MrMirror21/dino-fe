import { QuestionType } from '@/types/event';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';

interface EventCardProps {
  children: ReactElement;
}

interface EventListProps {
  setChosenEvent: Dispatch<SetStateAction<QuestionType | undefined>>;
  questionList: Array<QuestionType>;
}

const EventCard = ({ children }: EventCardProps) => {
  return <div className="w-full px-[20px] py-[10px]">{children}</div>;
};

const QuestionList = ({ setChosenEvent, questionList }: EventListProps) => {
  return (
    <div className="max-h-60 overflow-scroll">
      {questionList.map((question) => (
        <div className="" onClick={() => setChosenEvent(question)}>
          <EventCard>
            <div className="flex gap-2 px-3 py-4 w-full rounded-[10px] shadow-[0_2px_16px_rgba(68,68,68,0.12)] break-keep">
              <p className="text-[#BAD7EC] font-['edensor'] text-2xl leading-[20px] tracking-[-1px] flex justify-start">
                Q.
              </p>
              <p className="text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px] text-left">
                {question.content}
              </p>
            </div>
          </EventCard>
          <EventCard>
            <div className="flex items-center gap-2 px-3 py-4 w-[calc(100vw-40px)] shadow-[0_2px_16px_rgba(68,68,68,0.12)] rounded-[10px]">
              <h2 className="text-[#BAD7EC] font-['edensor'] text-2xl leading-[20px] tracking-[-1px]">
                A.
              </h2>
              <p className="text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px]">
                {question.isAnswer ? question.myAnswer : '답변 작성하기'}
              </p>
            </div>
          </EventCard>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
