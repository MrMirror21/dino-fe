import { QuestionType } from '@/types/event';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { WaveformForPlay } from './Waveform';
import Image from 'next/image';

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
  const handleQuestionClick = (question: QuestionType) => {
    !question.isAnswer && setChosenEvent(question);
  };
  console.log(questionList[0]);
  return (
    <div className="max-h-120 overflow-scroll">
      {questionList.map((question) => (
        <div className="" onClick={() => handleQuestionClick(question)}>
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
            <div className="flex flex-col items-center gap-2 px-3 py-4 w-[calc(100vw-40px)] shadow-[0_2px_16px_rgba(68,68,68,0.12)] rounded-[10px]">
              <div className="flex flex-row justify-start gap-2 w-full">
                <h2 className="text-[#BAD7EC] font-['edensor'] text-2xl leading-[20px] tracking-[-1px]">
                  A.
                </h2>
                <p className="flex flex-row text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px]">
                  {question.isAnswer ? question.myAnswer : '답변 작성하기'}
                </p>
              </div>
              <div>
                {question.type == 'VOICE' && (
                  <WaveformForPlay
                    url={
                      'https://daydreamcdn.s3.ap-northeast-2.amazonaws.com/DayDream/3602426060/0/0/0/8b286e26-fb5c-4f0c-a881-5e9ceb1e24cd.mp3'
                    }
                  />
                )}
                {question.type == 'IMAGE' && (
                  <Image
                    src={question.fileUrl}
                    alt="answerImage"
                    width={300}
                    height={500}
                  />
                )}
              </div>
            </div>
          </EventCard>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
