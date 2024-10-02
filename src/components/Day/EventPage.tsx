import { useGetEvent } from '@/hooks/api/useEvent';
import React, { Dispatch, SetStateAction, useState } from 'react';
import EventElement from '../eventManage/EventElement';
import ProgressBar from './ProgressBar';
import DateChanger from '../DateChanger';
import QuestionList from './QuestionList';
import QuestionModal from './QuestionModal';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import { EmotionType } from '@/types/emotion';
interface FunnelDispenserProps {
  eventId: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const EventPage = ({ eventId, setStep }: FunnelDispenserProps) => {
  const { data, isSuccess, error } = useGetEvent(eventId);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  return (
    <>
      <ProgressBar
        answerNum={data?.data.totalAnswerCount}
        totalNum={data?.data.totalQuestionCount}
        endColor={getProgressAndButtonColor(data?.data.emotion as EmotionType)}
      />
      <DateChanger event={data?.data} />
      {data && (
        <QuestionList
          setChosenEvent={setIsQuestionModalOpen}
          questionList={data.data.questionContent}
        />
      )}
      {isQuestionModalOpen && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          setIsOpen={setIsQuestionModalOpen}
        />
      )}
    </>
  );
};

export default EventPage;
