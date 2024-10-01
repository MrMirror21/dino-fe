import {
  getBackGroundStyle,
  getProgressAndButtonColor,
} from '@/utils/emotionColor';
import { useEffect, useState } from 'react';

import { CompleteEventType } from '@/types/hiStory';
import { EmotionType } from '@/types/emotion';
import Header from '@/components/Day/Header';
import NavBar from '@/components/common/NavBar';
import NextTriButtonIcon from '@/assets/icon/NextTriButtonIcon';
import PrevTriButtonIcon from '@/assets/icon/PrevTriButtonIcon';
import ProgressBar from '@/components/Day/ProgressBar';
import QuestionAndAnswer from '@/components/hiStory/CompltedEvents/QuestionAndAnswer';
import { QuestionContentType } from '@/types/question';
import { useRouter } from 'next/router';

const mockCompletedEventList: CompleteEventType[] = [
  {
    eventId: 1,
    title: '완료된 첫 번째 이벤트',
    category: '일상',
    eventStatus: 'termination',
    startDate: '2023-09-01',
    endDate: '2023-09-01',
    fileUrl: 'https://example.com/event1.jpg',
    emotion: 'JOY',
    totalQuestionCount: 5,
    totalAnswerCount: 5,
    representativeQuestion: {
      questionId: 201,
      content: '이벤트를 통해 무엇을 배웠나요?',
      isPriority: false,
      isAnswer: true,
      myAnswer: '새로운 경험의 중요성을 깨달았습니다.',
      questionDate: '2023-09-01',
      answeredAt: '2023-09-01',
      fileUrl: '',
      type: 'TEXT',
      eventTitle: '완료된 첫 번째 이벤트',
    },
  },
  {
    eventId: 2,
    title: '완료된 두 번째 이벤트',
    category: '여행',
    eventStatus: 'termination',
    startDate: '2023-09-02',
    endDate: '2023-09-03',
    fileUrl: 'https://example.com/event2.jpg',
    emotion: 'HAPPINESS',
    totalQuestionCount: 7,
    totalAnswerCount: 6,
    representativeQuestion: {
      questionId: 202,
      content: '가장 인상 깊었던 순간은?',
      isPriority: true,
      isAnswer: true,
      myAnswer: '석양을 바라보며 느낀 평화로움이었습니다.',
      questionDate: '2023-09-03',
      answeredAt: '2023-09-03',
      fileUrl: 'https://example.com/sunset.jpg',
      type: 'IMAGE',
      eventTitle: '완료된 두 번째 이벤트',
    },
  },
  {
    eventId: 3,
    title: '완료된 세 번째 이벤트',
    category: '학습',
    eventStatus: 'termination',
    startDate: '2023-09-04',
    endDate: '2023-09-04',
    fileUrl: 'https://example.com/event3.jpg',
    emotion: 'SATISFACTION',
    totalQuestionCount: 4,
    totalAnswerCount: 4,
    representativeQuestion: {
      questionId: 203,
      content: '새롭게 알게 된 사실이 있나요?',
      isPriority: false,
      isAnswer: true,
      myAnswer: '내가 어케 알아~',
      questionDate: '2023-09-04',
      answeredAt: '2023-09-04',
      fileUrl: '',
      type: 'TEXT',
      eventTitle: '완료된 세 번째 이벤트',
    },
  },
  {
    eventId: 4,
    title: '예술적인소프트웨어 대회',
    category: '취미',
    eventStatus: 'termination',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    fileUrl: 'https://example.com/event4.jpg',
    emotion: 'EXPECTATION',
    totalQuestionCount: 10,
    totalAnswerCount: 8,
    representativeQuestion: {
      questionId: 204,
      content: '이번 달 가장 인상 깊었던 책은?',
      isPriority: false,
      isAnswer: true,
      myAnswer: '『사피엔스』, 인류 역사에 대한 새로운 시각을 얻었습니다.',
      questionDate: '2023-10-31',
      answeredAt: '2023-10-31',
      fileUrl: '',
      type: 'TEXT',
      eventTitle: '예술적인소프트웨어 대회',
    },
  },
  {
    eventId: 5,
    title: '30일 건강 챌린지',
    category: '건강',
    eventStatus: 'termination',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    fileUrl: 'https://example.com/event5.jpg',
    emotion: 'HOPE',
    totalQuestionCount: 30,
    totalAnswerCount: 28,
    representativeQuestion: {
      questionId: 205,
      content: '한 달간의 변화 중 가장 큰 것은?',
      isPriority: false,
      isAnswer: true,
      myAnswer:
        '아침 기상 시간이 규칙적으로 변했고, 전반적인 컨디션이 좋아졌습니다.',
      questionDate: '2023-11-30',
      answeredAt: '2023-11-30',
      fileUrl: 'https://example.com/health-chart.jpg',
      type: 'IMAGE',
      eventTitle: '30일 건강 챌린지',
    },
  },
  {
    eventId: 6,
    title: '연말 자선 봉사활동',
    category: '사회',
    eventStatus: 'termination',
    startDate: '2023-12-20',
    endDate: '2023-12-24',
    fileUrl: 'https://example.com/event6.jpg',
    emotion: 'LOVE',
    totalQuestionCount: 6,
    totalAnswerCount: 6,
    representativeQuestion: {
      questionId: 206,
      content: '봉사활동을 통해 느낀 점은?',
      isPriority: false,
      isAnswer: true,
      myAnswer:
        '작은 도움이 모여 큰 변화를 만들 수 있다는 것을 직접 경험했습니다.',
      questionDate: '2023-12-24',
      answeredAt: '2023-12-24',
      fileUrl: 'https://example.com/volunteer-audio.mp3',
      type: 'VOICE',
      eventTitle: '연말 자선 봉사활동',
    },
  },
];

const mockEventDetailList: EventDetailType[] = [
  {
    eventId: 1,
    title: '완료된 첫 번째 이벤트',
    emotion: '행복',
    eventStatus: 'termination',
    startDate: '2023-09-01',
    endDate: '2023-09-01',
    memo: '일상의 소중함을 깨달은 하루',
    fileUrl: 'https://example.com/event1.jpg',
    totalQuestionCount: 3,
    totalAnswerCount: 3,
    occurrenceTime: '09:00',
    representativeQuestion: {
      questionId: 201,
      content: '이벤트를 통해 무엇을 배웠나요?',
      isAnswer: true,
      myAnswer: '새로운 경험의 중요성을 깨달았습니다.',
      answeredAt: '2023-09-01',
      isPriority: true,
      questionDate: '2023-09-01',
      fileUrl: '',
      type: 'TEXT',
      eventTitle: '완료된 첫 번째 이벤트',
    },
    questionContent: [
      {
        questionId: 201,
        content: '이벤트를 통해 무엇을 배웠나요?',
        isAnswer: true,
        myAnswer: '새로운 경험의 중요성을 깨달았습니다.',
        answeredAt: '2023-09-01',
        isPriority: true,
        questionDate: '2023-09-01',
        fileUrl: '',
        type: 'TEXT',
        eventTitle: '완료된 첫 번째 이벤트',
      },
      {
        questionId: 202,
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        isAnswer: true,
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        answeredAt: '2023-09-01',
        isPriority: false,
        questionDate: '2023-09-01',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
        eventTitle: '완료된 첫 번째 이벤트',
      },
    ],
  },
  {
    eventId: 2,
    title: '완료된 두 번째 이벤트',
    emotion: '설렘',
    eventStatus: 'termination',
    startDate: '2023-09-02',
    endDate: '2023-09-03',
    memo: '잊지 못할 주말 여행',
    fileUrl: 'https://example.com/event2.jpg',
    totalQuestionCount: 2,
    totalAnswerCount: 2,
    occurrenceTime: '10:30',
    representativeQuestion: {
      questionId: 203,
      content: '가장 인상 깊었던 순간은?',
      isAnswer: true,
      myAnswer: '석양을 바라보며 느낀 평화로움이었습니다.',
      answeredAt: '2023-09-02',
      isPriority: true,
      questionDate: '2023-09-02',
      fileUrl: 'https://example.com/sunset.jpg',
      type: 'IMAGE',
      eventTitle: '완료된 두 번째 이벤트',
    },
    questionContent: [
      {
        questionId: 203,
        content: '가장 인상 깊었던 순간은?',
        isAnswer: true,
        myAnswer: '석양을 바라보며 느낀 평화로움이었습니다.',
        answeredAt: '2023-09-02',
        isPriority: true,
        questionDate: '2023-09-02',
        fileUrl: 'https://example.com/sunset.jpg',
        type: 'IMAGE',
        eventTitle: '완료된 두 번째 이벤트',
      },
      {
        questionId: 204,
        content: '이번 여행에서 새롭게 시도해본 것이 있다면?',
        isAnswer: true,
        myAnswer: '현지 요리 수업에 참여해 전통 음식을 만들어 보았습니다.',
        answeredAt: '2023-09-03',
        isPriority: false,
        questionDate: '2023-09-03',
        fileUrl: 'https://example.com/cooking-class.mp3',
        type: 'VOICE',
        eventTitle: '완료된 두 번째 이벤트',
      },
    ],
  },
  {
    eventId: 3,
    title: '완료된 세 번째 이벤트',
    emotion: '호기심',
    eventStatus: 'termination',
    startDate: '2023-09-04',
    endDate: '2023-09-04',
    memo: '새로운 지식의 발견',
    fileUrl: 'https://example.com/event3.jpg',
    totalQuestionCount: 1,
    totalAnswerCount: 1,
    occurrenceTime: '14:00',
    representativeQuestion: {
      questionId: 205,
      content: '새롭게 알게 된 사실이 있나요?',
      isAnswer: true,
      myAnswer: '인공지능의 윤리적 측면에 대해 깊이 있게 배웠습니다.',
      answeredAt: '2023-09-04',
      isPriority: true,
      questionDate: '2023-09-04',
      fileUrl: '',
      type: 'TEXT',
      eventTitle: '완료된 세 번째 이벤트',
    },
    questionContent: [
      {
        questionId: 205,
        content: '새롭게 알게 된 사실이 있나요?',
        isAnswer: true,
        myAnswer: '인공지능의 윤리적 측면에 대해 깊이 있게 배웠습니다.',
        answeredAt: '2023-09-04',
        isPriority: true,
        questionDate: '2023-09-04',
        fileUrl: '',
        type: 'TEXT',
        eventTitle: '완료된 세 번째 이벤트',
      },
    ],
  },
];

interface EventDetailType {
  eventId: number;
  title: string;
  emotion: string;
  eventStatus: 'termination' | 'execution';
  startDate: string; // Format: 'yyyy-MM-dd'
  memo: string;
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
            <img
              // src={event.fileUrl}
              alt="식물 이미지..."
              className="max-w-full h-auto"
            />
            <ProgressBar
              answerNum={event.totalAnswerCount}
              totalNum={event.totalQuestionCount}
              endColor={getProgressAndButtonColor(event.emotion as EmotionType)}
            />
            <div>
              <span className="text-[#969A9C] text-[12px] font-pre leading-normal">
                {event.totalAnswerCount}/{event.totalQuestionCount}
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
