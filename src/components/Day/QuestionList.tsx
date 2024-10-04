import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import Image from 'next/image';
import QuestionAndAnswer from '../hiStory/CompltedEvents/QuestionAndAnswer';
import { QuestionType } from '@/types/event';
import { WaveformForPlay } from './Waveform';

interface EventCardProps {
  children: ReactElement;
}

interface EventListProps {
  setChosenEvent: Dispatch<SetStateAction<QuestionType | undefined>>;
  questionList: Array<QuestionType>;
  isToday: boolean;
}

const EventCard = ({ children }: EventCardProps) => {
  return <div className="w-full px-[20px] py-[10px]">{children}</div>;
};

const QuestionList = ({
  setChosenEvent,
  questionList,
  isToday,
}: EventListProps) => {
  const handleQuestionClick = (question: QuestionType) => {
    !question.isAnswer && setChosenEvent(question);
  };
  return (
    <div className="max-h-120 overflow-scroll">
      {!isToday ? (
        questionList.length > 0 ? (
          <div>
            <EventCard>
              <div className="flex gap-2 px-3 py-4 w-full rounded-[10px] shadow-[0_2px_16px_rgba(68,68,68,0.12)] break-keep">
                <p className="text-[#BAD7EC] font-['edensor'] text-2xl leading-[20px] tracking-[-1px] flex justify-start">
                  Q.
                </p>
                <p className="text-[#000] font-pretendard-300 text-sm leading-[20px] tracking-[-1px] text-left">
                  기대 반, 설렘 반. 그 날이 오면 여러분을 위한 특별한 질문이
                  준비되어 있답니다.
                </p>
              </div>
            </EventCard>
          </div>
        ) : (
          <div className="text-black/60 text-center font-pretendard-300 text-base tracking-tighter">
            오늘은 님을 기다리는 질문이 없습니다
          </div>
        )
      ) : (
        <>
          {questionList.map((question) =>
            question.isAnswer ? (
              <div className="flex text-left">
                <QuestionAndAnswer
                  question={question}
                  isAvailBookmark={true}
                  title="isMainPage"
                />
              </div>
            ) : (
              <div className="" onClick={() => handleQuestionClick(question)}>
                <EventCard>
                  <div className="flex gap-2 px-3 py-4 w-full rounded-[10px] shadow-[0_2px_16px_rgba(68,68,68,0.12)] break-keep">
                    <p className="text-[#BAD7EC] font-['edensor'] text-2xl leading-[20px] tracking-[-1px] flex justify-start">
                      Q.
                    </p>
                    <p className="text-[#000] font-pretendard-300 text-sm leading-[20px] tracking-[-0.64px] text-left">
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
                      <p className="flex flex-row text-[#000] font-pretendard-300 text-sm leading-[20px] tracking-[-1px]">
                        {question.isAnswer
                          ? question.myAnswer
                          : '답변 작성하기'}
                      </p>
                    </div>
                    <div>
                      {question.type == 'VOICE' && (
                        <audio controls src={question.fileUrl} />
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
            ),
          )}
        </>
      )}
    </div>
  );
};

export default QuestionList;
