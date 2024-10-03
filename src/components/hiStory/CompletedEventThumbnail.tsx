import { CompleteEventType } from '@/types/hiStory';
import Image from 'next/image';
import moment from 'moment';

interface Props {
  eventList: CompleteEventType[];
  onEventClick?: (eventId: number) => void;
}

const CompletedEventThumbnail = ({ eventList, onEventClick }: Props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[calc(100%-40px)] grid grid-cols-2 gap-4">
        {eventList.map((event) => (
          <div
            key={event.eventId}
            className="bg-white h-[200px] rounded-[12px] px-4 flex flex-col"
            style={{
              background:
                'linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%), #FFF',
              boxShadow: '0px 2px 32px 0px rgba(136, 136, 136, 0.12)',
            }}
            onClick={() => onEventClick && onEventClick(event.eventId)}
          >
            <div className="flex flex-col gap-0.5 mt-4">
              <span className="font-pretendard-200 text-[12px]">
                {moment(event.startDate.toString()).format('yyyy.MM.DD')} -{' '}
                {moment(event.endDate.toString()).format('MM.DD')}
              </span>

              <span className="font-pretendard-300 text-[14px]">
                {event.title}
              </span>
            </div>

            <div className="w-full flex items-center justify-center h-full">
              <Image
                alt="event-plant"
                src={event.fileUrl}
                width={130}
                height={130}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedEventThumbnail;
