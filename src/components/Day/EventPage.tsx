import ConfirmModal, { ConfirmEndingModal } from '../common/ConfirmModal';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { calculatePeriod, formatDate } from '@/utils/event';

import DateChanger from '../DateChanger';
import { EmotionType } from '@/types/emotion';
import Image from 'next/image';
import Loading from '../Loading';
import ProgressBar from './ProgressBar';
import QuestionList from './QuestionList';
import QuestionModal from './QuestionModal';
import { QuestionType } from '@/types/event';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import { stringToDate } from '../../utils/event';
import { useGetEvent } from '@/hooks/api/useEvent';
import { useRouter } from 'next/router';

interface FunnelDispenserProps {
  eventId: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const EventPage = ({ eventId, setStep }: FunnelDispenserProps) => {
  const router = useRouter();
  const { data, isSuccess, error } = useGetEvent(eventId);
  const [selectedQuestion, setSelectedQuestion] = useState<
    QuestionType | undefined
  >(undefined);
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);
  const questionsOfToday =
    data?.data?.questionContent?.filter(
      (question: QuestionType) =>
        question.questionDate === formatDate(currentDay),
    ) || [];
  const isEnding =
    today == stringToDate(data?.data?.endDate) &&
    questionsOfToday.every(
      (question: QuestionType) => question.isAnswer === true,
    );

  useEffect(() => {
    setCurrentDay(today);
    setSelectedQuestion(undefined);
  }, [eventId]);

  if (!isSuccess || !data) return <Loading />; // 또는 로딩 컴포넌트를 표시

  return (
    <>
      <Image
        src={data.data.fileUrl}
        alt="growth"
        width={220}
        height={300}
        className="mb-6"
      />
      <ProgressBar
        answerNum={data.data.totalAnswerCount}
        totalNum={data.data.totalQuestionCount}
        endColor={getProgressAndButtonColor(data.data.emotion as EmotionType)}
      />
      <DateChanger
        event={data.data}
        today={today}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
      <QuestionList
        setChosenEvent={setSelectedQuestion}
        questionList={questionsOfToday}
        isFuture={
          (today.getMonth >= currentDay.getMonth) &&
          (today.getDate() > currentDay.getDate())
        }
      />
      {selectedQuestion && (
        <QuestionModal
          selectedQuestion={selectedQuestion}
          onClose={setSelectedQuestion}
          eventId={eventId}
          questionId={selectedQuestion.questionId}
        />
      )}
      {isEnding && (
        <ConfirmEndingModal
          isOpen={isEnding}
          content1="일 간의 여정, 의미 있는 기다림이었나요?"
          content2="기억할 수 있는 대표질문을 선택해주세요!"
          keyword={data.data.title}
          period={calculatePeriod(data.data.startDate, data.data.endDate)}
          imgUrl={data.data.fileUrl}
          onConfirm={() =>
            router.push(
              {
                pathname: '/daydream',
                query: { id: eventId },
              },
              '/daydream',
            )
          }
        />
      )}
    </>
  );
};

export default EventPage;
