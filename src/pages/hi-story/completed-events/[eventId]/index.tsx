import { useEffect, useState } from 'react';

import { CompleteEventType } from '@/types/hiStory';
import Header from '@/components/Day/Header';
import NavBar from '@/components/common/NavBar';
import NextTriButtonIcon from '@/assets/icon/NextTriButtonIcon';
import PrevTriButtonIcon from '@/assets/icon/PrevTriButtonIcon';
import QuestionAndAnswer from '@/components/hiStory/CompltedEvents/QuestionAndAnswer';
import SlideMenu from '@/components/Day/SideMenu';
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
    representativeQuestion: {
      questionId: 201,
      content: '이벤트를 통해 무엇을 배웠나요?',
      isAnswer: true,
      myAnswer: '새로운 경험의 중요성을 깨달았습니다.',
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
    representativeQuestion: {
      questionId: 202,
      content: '가장 인상 깊었던 순간은?',
      isAnswer: true,
      myAnswer: '석양을 바라보며 느낀 평화로움이었습니다.',
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
    representativeQuestion: {
      questionId: 203,
      content: '새롭게 알게 된 사실이 있나요?',
      isAnswer: true,
      myAnswer: '내가 어케 알아~',
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
    representativeQuestion: {
      questionId: 204,
      content: '이번 달 가장 인상 깊었던 책은?',
      isAnswer: true,
      myAnswer: '『사피엔스』, 인류 역사에 대한 새로운 시각을 얻었습니다.',
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
    representativeQuestion: {
      questionId: 205,
      content: '한 달간의 변화 중 가장 큰 것은?',
      isAnswer: true,
      myAnswer:
        '아침 기상 시간이 규칙적으로 변했고, 전반적인 컨디션이 좋아졌습니다.',
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
    representativeQuestion: {
      questionId: 206,
      content: '봉사활동을 통해 느낀 점은?',
      isAnswer: true,
      myAnswer:
        '작은 도움이 모여 큰 변화를 만들 수 있다는 것을 직접 경험했습니다.',
    },
  },
];

const mockEventDetailList: EventDetailTyoe[] = [
  {
    eventId: 1,
    title: '완료된 첫 번째 이벤트',
    category: '일상',
    eventStatus: 'termination',
    startDate: '2023-09-01',
    endDate: '2023-09-01',
    memo: '일상의 소중함을 깨달은 하루',
    fileUrl: 'https://example.com/event1.jpg',
    step: 'level3',
    progress: 100,
    questionContent: [
      {
        questionId: 201,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 1,
        isPriority: true,
        step: 'level3',
        content: '이벤트를 통해 무엇을 배웠나요?',
        myAnswer: '새로운 경험의 중요성을 깨달았습니다.',
        fileUrl: '',
        type: 'TEXT',
      },
      {
        questionId: 202,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 203,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 204,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 205,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 206,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 207,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 208,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 209,
        questionDate: '2023-09-01',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level3',
        content: '오늘 하루 중 가장 기억에 남는 순간은?',
        myAnswer: '가족과 함께한 저녁 식사 시간이었습니다.',
        fileUrl: 'https://example.com/family-dinner.jpg',
        type: 'IMAGE',
      },
    ],
  },
  {
    eventId: 2,
    title: '완료된 두 번째 이벤트',
    category: '여행',
    eventStatus: 'termination',
    startDate: '2023-09-02',
    endDate: '2023-09-03',
    memo: '잊지 못할 주말 여행',
    fileUrl: 'https://example.com/event2.jpg',
    step: 'level4',
    progress: 100,
    questionContent: [
      {
        questionId: 203,
        questionDate: '2023-09-02',
        isAnswer: true,
        sequence: 1,
        isPriority: true,
        step: 'level4',
        content: '가장 인상 깊었던 순간은?',
        myAnswer: '석양을 바라보며 느낀 평화로움이었습니다.',
        fileUrl: 'https://example.com/sunset.jpg',
        type: 'IMAGE',
      },
      {
        questionId: 204,
        questionDate: '2023-09-03',
        isAnswer: true,
        sequence: 2,
        isPriority: false,
        step: 'level4',
        content: '이번 여행에서 새롭게 시도해본 것이 있다면?',
        myAnswer: '현지 요리 수업에 참여해 전통 음식을 만들어 보았습니다.',
        fileUrl: 'https://example.com/cooking-class.mp3',
        type: 'VOICE',
      },
    ],
  },
  {
    eventId: 3,
    title: '완료된 세 번째 이벤트',
    category: '학습',
    eventStatus: 'termination',
    startDate: '2023-09-04',
    endDate: '2023-09-04',
    memo: '새로운 지식의 발견',
    fileUrl: 'https://example.com/event3.jpg',
    step: 'level2',
    progress: 100,
    questionContent: [
      {
        questionId: 205,
        questionDate: '2023-09-04',
        isAnswer: true,
        sequence: 1,
        isPriority: true,
        step: 'level2',
        content: '새롭게 알게 된 사실이 있나요?',
        myAnswer: '인공지능의 윤리적 측면에 대해 깊이 있게 배웠습니다.',
        fileUrl: '',
        type: 'TEXT',
      },
    ],
  },
];

type EventStatus = 'termination' | 'execution';
type Step = 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
type QuestionType = 'TEXT' | 'VOICE' | 'IMAGE';

interface QuestionContent {
  questionId: number;
  questionDate: string; // Format: 'yyyy-MM-dd'
  isAnswer: boolean;
  sequence: number;
  isPriority: boolean;
  step: Step;
  content: string;
  myAnswer: string;
  fileUrl: string;
  type: QuestionType;
}

interface EventDetailTyoe {
  eventId: number;
  title: string;
  category: string;
  eventStatus: EventStatus;
  startDate: string; // Format: 'yyyy-MM-dd'
  memo: string;
  endDate: string; // Format: 'yyyy-MM-dd'
  fileUrl: string;
  step: Step;
  progress: number;
  questionContent: QuestionContent[];
}

const EventDetailPage = () => {
  const router = useRouter();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { eventId } = router.query;
  const [event, setEvent] = useState<CompleteEventType | null>(null);
  const [eventList, setEventList] = useState<CompleteEventType[]>([]);
  const [eventDetail, setEventDetail] = useState<EventDetailTyoe | null>(null);
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
      style={{
        background: `
          radial-gradient(56.98% 56.98% at 50% 43.02%, rgba(74, 159, 168, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%),
          linear-gradient(168deg, rgba(161, 219, 210, 0.20) 0%, rgba(250, 221, 135, 0.20) 47.11%, rgba(244, 241, 199, 0.20) 100%)
        `,
      }}
    >
      <Header onClick={() => setIsSideMenuOpen(true)} />
      <SlideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />

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

          <div className="flex justify-center my-4">
            <img
              src={event.fileUrl}
              alt="식물 이미지..."
              className="max-w-full h-auto"
            />
          </div>

          <div className="my-1 flex justify-start">
            <span className="font-pretendard-400 text-[14px] text-[#888]">
              대표 질문
            </span>
          </div>

          <QuestionAndAnswer
            question={event.representativeQuestion}
            isRepresent={true}
          />

          <div className="mt-10">
            {eventDetail?.questionContent.map((question) => (
              <div key={question.questionId}>
                <QuestionAndAnswer question={question} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default EventDetailPage;
