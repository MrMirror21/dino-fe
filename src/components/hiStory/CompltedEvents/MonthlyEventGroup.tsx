import { MonthAllEventsType } from '@/types/hiStory';
import QuestionAndAnswer from './QuestionAndAnswer';
import moment from 'moment';

interface Props {
  event: MonthAllEventsType;
}

const MonthlyEventGroup = ({ event }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className="text-center font-pretendard-300 text-[20px] mb-5 mt-8"
        style={{ color: 'rgba(0, 0, 0, 0.60)' }}
      >
        {moment(event.eventDate.toString()).format('MMM, yyyy')}
      </div>

      {event.questionContent.map((question) => (
        <QuestionAndAnswer key={question.questionId} question={question} />
      ))}
    </div>
  );
};

export default MonthlyEventGroup;
