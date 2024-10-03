import {
  getBackGroundStyle,
  getEmotionColor,
  getProgressAndButtonColor,
} from '@/utils/emotionColor';
import { mockCompletedEventList, mockEventDetailList } from '@/utils/dummy';
import { useEffect, useState } from 'react';

import { CompleteEventType } from '@/types/hiStory';
import { EmotionType } from '@/types/emotion';
import Header from '@/components/Day/Header';
import Image from 'next/image';
import NavBar from '@/components/common/NavBar';
import NextTriButtonIcon from '@/assets/icon/NextTriButtonIcon';
import PrevTriButtonIcon from '@/assets/icon/PrevTriButtonIcon';
import ProgressBar from '@/components/Day/ProgressBar';
import QuestionAndAnswer from '@/components/hiStory/CompltedEvents/QuestionAndAnswer';
import { QuestionContentType } from '@/types/question';
import { useRouter } from 'next/router';

export interface EventDetailType {
  eventId: number;
  title: string;
  emotion: string;
  eventStatus: 'termination' | 'execution';
  startDate: string; // Format: 'yyyy-MM-dd'
  memo?: string;
  endDate: string; // Format: 'yyyy-MM-dd'
  fileUrl: string;
  totalQuestionCount: number;
  totalAnswerCount: number;
  occurrenceTime: string; // Format: 'HH:mm'
  representativeQuestion?: QuestionContentType | null;
  questionContent: QuestionContentType[];
}

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<CompleteEventType | null>(null);
  const [eventList, setEventList] = useState<CompleteEventType[]>([]);
  const [eventDetail, setEventDetail] = useState<EventDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (eventId: number) => {
    setEventDetail(
      mockEventDetailList.find((event) => event.eventId === eventId) || null,
    );
  };

  useEffect(() => {
    setEventList(mockCompletedEventList);
  }, []);

  useEffect(() => {
    if (eventId && eventList.length > 0) {
      const currentEvent = eventList.find(
        (event) => event.eventId === Number(eventId),
      );
      setEvent(currentEvent || null);
    }
    fetchData(Number(eventId));
  }, [eventId, eventList]);

  const currentIndex = eventList.findIndex(
    (e) => e.eventId === Number(eventId),
  );
  const prevEventId =
    currentIndex > 0 ? eventList[currentIndex - 1].eventId : null;
  const nextEventId =
    currentIndex < eventList.length - 1
      ? eventList[currentIndex + 1].eventId
      : null;

  const handlePrevClick = () => {
    if (prevEventId) router.push(`/hi-story/completed-events/${prevEventId}`);
  };

  const handleNextClick = () => {
    if (nextEventId) router.push(`/hi-story/completed-events/${nextEventId}`);
  };

  if (!event) return <div>Loading...</div>;
  return (
    <div
      className="flex flex-col w-full h-screen"
      style={getBackGroundStyle(event.emotion as EmotionType)}
    >
      <Header />
      <div className="flex-1 overflow-y-auto pb-[68px] mb-8 flex flex-col items-center">
        <div className="w-[calc(100%-40px)] max-w-2xl">
          <div className="flex items-center justify-between my-4">
            <button onClick={handlePrevClick} disabled={!prevEventId}>
              <PrevTriButtonIcon inactive={!prevEventId} />
            </button>

            <div className="flex flex-col items-center">
              <span
                className="font-pretendard-300 text-[20px] text-center"
                style={{ color: 'rgba(0,0,0,0.60)' }}
              >
                {event.title}
              </span>
              <span className="font-pretendard-200 text-[12px] text-[#969A9C] text-center">
                {event.startDate.toString()} - {event.endDate.toString()}
              </span>
            </div>

            <button onClick={handleNextClick} disabled={!nextEventId}>
              <NextTriButtonIcon inactive={!nextEventId} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center my-4">
            <div className="mb-5 text-center w-3/5 h-[32px] max-h-[32px]">
              {event.memo && (
                <span
                  className="text-[12px] font-pretendard-200 text-[#969A9C]"
                  style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.5',
                    display: 'block',
                  }}
                >
                  {event.memo}
                </span>
              )}
            </div>
            <Image
              src={event.fileUrl}
              alt="식물 이미지..."
              className="mb-[30px]"
              width={228}
              height={214}
            />
            <ProgressBar
              answerNum={event.totalAnswerCount}
              totalNum={event.totalQuestionCount}
              endColor={getProgressAndButtonColor(event.emotion as EmotionType)}
            />
            <div className="mt-2.5">
              <span
                className={`text-[16px] font-edensor leading-normal`}
                style={{ color: getEmotionColor(event.emotion as EmotionType) }}
              >
                {event.totalAnswerCount} / {event.totalQuestionCount}
              </span>
            </div>
          </div>

          <div className="my-1 flex justify-start">
            <span className="font-pretendard-400 text-[14px] text-[#888]">
              대표 질문
            </span>
          </div>
        </div>

        {/* 대표 질문 */}
        <QuestionAndAnswer
          question={event.representativeQuestion}
          isRepresent={true}
          emotion={event.emotion as EmotionType}
          isAvailBookmark={true}
        />

        <div className="mt-10 w-full">
          {eventDetail?.questionContent.map((question) => (
            <QuestionAndAnswer
              key={question.questionId}
              question={question}
              isAvailBookmark={true}
            />
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default EventDetailPage;
