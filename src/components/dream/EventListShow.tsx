import { EventContent } from '@/pages/dream';
import QuestionAndAnswer from '../hiStory/CompltedEvents/QuestionAndAnswer';

interface Props {
  events: EventContent[];
}

const EventListShow = ({ events }: Props) => {
  return (
    <div className="mt-[50px] w-full gap-5 flex flex-col">
      {events.map((event) => (
        <QuestionAndAnswer question={event} title={event.title} />
      ))}
    </div>
  );
};

export default EventListShow;
