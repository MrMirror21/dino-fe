import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import DateChanger from '../DateChanger';
import { EmotionType } from '@/types/emotion';
import Image from 'next/image';
import Loading from '../Loading';
import ProgressBar from './ProgressBar';
import QuestionList from './QuestionList';
import QuestionModal from './QuestionModal';
import { QuestionType } from '@/types/event';
import { formatDate } from '@/utils/event';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import { useGetEvent } from '@/hooks/api/useEvent';

interface FunnelDispenserProps {
  eventId: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const EventPage = ({ eventId, setStep }: FunnelDispenserProps) => {
  const { data, isSuccess, error } = useGetEvent(eventId);
  const [selectedQuestion, setSelectedQuestion] = useState<
    QuestionType | undefined
  >(undefined);
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);

  useEffect(() => {
    setCurrentDay(today);
    setSelectedQuestion(undefined);
  }, [eventId]);

  const questionsOfToday =
    data?.data?.questionContent?.filter(
      (question: QuestionType) =>
        question.questionDate === formatDate(currentDay),
    ) || [];

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
      />
      {selectedQuestion && (
        <QuestionModal
          selectedQuestion={selectedQuestion}
          onClose={setSelectedQuestion}
          eventId={eventId}
          questionId={selectedQuestion.questionId}
        />
      )}
    </>
  );
};

export default EventPage;
