import React from 'react';

interface EventCardProps {
  eventId: number;
  title: string;
  category: string; // 테마 (카테고리)
  eventStatus: string; // 이벤트 상태(종료/진행)
  startDate: string; // 'yyyy-MM-dd' 형식
  memo: string;
  endDate: string; // 'yyyy-MM-dd' 형식
  fileUrl: string; // 성장 파일 CDN 주소 반환
  step: string;
  progress: number; // 진척률 % [전체 답변 갯수 / 전체 질문 갯수] * 100
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  category,
  eventStatus,
  startDate,
  endDate,
  memo,
  step,
  progress,
  fileUrl,
}) => {
  const statusText = eventStatus === 'execution' ? '진행 중' : '종료';
  const formattedProgress = Math.round(progress);

  return (
    <div className="flex items-center justify-center w-full h-[200px] bg-white p-6 rounded-lg shadow-md max-w-md">
      <div className="flex flex-col justify-between h-full flex-grow mr-4">
        <div>
          <div className="text-sm text-gray-600">
            {startDate} - {endDate}
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <p className="text-sm text-gray-600">{memo}</p>
      </div>
      <img
        src={fileUrl}
        className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-xs text-gray-500"
      />
    </div>
  );
};

export default EventCard;
