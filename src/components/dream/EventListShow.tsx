import { EventContent } from '@/pages/dream';

interface Props {
  events: EventContent[];
}

const EventListShow = ({ events }: Props) => {
  return (
    <div className="mt-[50px] w-full">
      {events.map((event) => (
        <div
          key={event.title}
          className="w-full flex flex-col items-center justify-center"
        >
          {/* title */}
          <div className="w-[calc(100%-60px)] h-[20px] mb-3">
            <span className="font-pretendard-400 text-[#888] text-[14px]">
              {event.title}
            </span>
          </div>

          <div
            className="w-[calc(100%-40px)] h-[80px] mb-[25px] rounded-[10px] bg-white"
            style={{ boxShadow: '0px 2px 16px 0px rgba(68, 68, 68, 0.12)' }}
          >
            <div className="w-full h-[80px] flex flex-col items-center justify-center px-[10px]">
              <div className="w-full items-center flex h-[26px]">
                <span className="font-pretendard-300 text-[#BAD7EC] text-[24px]">
                  Q.
                </span>
                <span className="ml-[10px] font-pretendard-200 text-[14px]">
                  {event.content}
                </span>
              </div>
              <div className="w-full flex items-center h-[26px]">
                <span className="font-pretendard-300 text-[#BAD7EC] text-[24px]">
                  A.
                </span>
                <span className="ml-[10px] font-pretendard-200 text-[14px]">
                  {event.myAnswer}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListShow;
