import { CompleteEventType } from '@/types/hiStory';
import CompletedEventThumbnail from '@/components/hiStory/CompletedEventThumbnail';
import Header from '@/components/main/Header';
import NavBar from '@/components/common/NavBar';
import SlideMenu from '@/components/main/SideMenu';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

const CompletedEventsPage = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [completedEventList, setCompletedEventList] = useState(
    mockCompletedEventList,
  );
  const router = useRouter();

  const handleEventClick = (eventId: number) => {
    router.push(`/hi-story/completed-events/${eventId}`);
  };

  return (
    <div
      className="flex flex-col w-full h-screen"
      style={{
        background:
          'linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%), #FFF',
        boxShadow: '0px 2px 32px 0px rgba(136, 136, 136, 0.12)',
      }}
    >
      <Header onClick={() => setIsSideMenuOpen(true)} />
      <SlideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />

      <div className="mt-9">
        <CompletedEventThumbnail
          eventList={completedEventList}
          onEventClick={handleEventClick}
        />
      </div>
      <NavBar />
    </div>
  );
};

export default CompletedEventsPage;
