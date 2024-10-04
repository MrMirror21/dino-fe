import React from 'react';
import EventElement from '../eventManage/EventElement';
import { useRouter } from 'next/router';

interface EventCardProps {
  eventId: number;
  title: string;
  category?: string; // 테마 (카테고리)
  eventStatus?: string; // 이벤트 상태(종료/진행)
  startDate: string; // 'yyyy-MM-dd' 형식
  memo?: string;
  endDate: string; // 'yyyy-MM-dd' 형식
  fileUrl: string; // 성장 파일 CDN 주소 반환
  step?: string;
  progress?: number; // 진척률 % [전체 답변 갯수 / 전체 질문 갯수] * 100
}

const EventCard: React.FC<EventCardProps> = ({
  eventId,
  title,
  startDate,
  endDate,
  memo,
  fileUrl,
}) => {
  const router = useRouter();
  return (
    <EventElement eventId={eventId}>
      <div className="flex items-center justify-center w-[350px] h-[200px] bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="flex flex-col justify-between h-full flex-grow mr-4">
          <div>
            <div className="text-[#000] font-pretendard-200 text-sm tracking-[-0.56px]">
              {startDate.replace(/-/g, '.')} -{' '}
              {endDate.slice(5).replace(/-/g, '.')}
            </div>
            <h2 className="text-[#000] font-pretendard-300 text-xl tracking-[-0.8px] break-keep">
              {title}
            </h2>
          </div>
          <p className="max-w-40 text-[10px] font-pretendard-200 tracking-[-0.4px] break-keep">
            {memo || ''}
          </p>
        </div>
        <img
          src={fileUrl}
          className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-xs text-gray-500"
        />
      </div>
    </EventElement>
  );
};

export default EventCard;
