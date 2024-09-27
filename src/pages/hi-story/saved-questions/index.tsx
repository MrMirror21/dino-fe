import { useEffect, useState } from 'react';

import Header from '@/components/main/Header';
import { MonthAllEventsType } from '@/types/hiStory';
import MonthlyEventGroup from '@/components/hiStory/CompltedEvents/MonthlyEventGroup';
import NavBar from '@/components/common/NavBar';
import SlideMenu from '@/components/main/SideMenu';

const mockAllEventList: MonthAllEventsType[] = [
  {
    eventDate: '2023-09',
    questionContent: [
      {
        eventId: 1,
        title: '첫 번째 이벤트',
        questionId: 101,
        content: '오늘의 기분은 어떤가요?',
        isAnswer: true,
        myAnswer: '매우 좋습니다!',
        isPriority: true,
        fileUrl: 'https://example.com/image1.jpg',
        type: 'TEXT',
      },
      {
        eventId: 2,
        title: '두 번째 이벤트',
        questionId: 102,
        content: '가장 기억에 남는 순간은?',
        isAnswer: false,
        myAnswer: '',
        isPriority: false,
        fileUrl: '',
        type: 'TEXT',
      },
    ],
  },
  {
    eventDate: '2023-08',
    questionContent: [
      {
        eventId: 3,
        title: '음성 기록 이벤트',
        questionId: 103,
        content: '오늘의 목표를 말해보세요.',
        isAnswer: true,
        myAnswer: 'voice_answer.mp3',
        isPriority: true,
        fileUrl: 'https://example.com/voice_answer.mp3',
        type: 'VOICE',
      },
    ],
  },
  {
    eventDate: '2023-07',
    questionContent: [
      {
        eventId: 4,
        title: '사진 이벤트',
        questionId: 104,
        content: '오늘의 순간을 사진으로 남겨주세요.',
        isAnswer: true,
        myAnswer: 'today_photo.jpg',
        isPriority: false,
        fileUrl: 'https://example.com/today_photo.jpg',
        type: 'IMAGE',
      },
      {
        eventId: 5,
        title: '여름 휴가 계획',
        questionId: 105,
        content: '이번 여름 휴가 계획은 무엇인가요?',
        isAnswer: true,
        myAnswer: '제주도로 가족 여행을 갈 예정입니다.',
        isPriority: true,
        fileUrl: '',
        type: 'TEXT',
      },
      {
        eventId: 6,
        title: '새로운 취미',
        questionId: 106,
        content: '최근에 시작한 새로운 취미가 있나요?',
        isAnswer: true,
        myAnswer: '요가를 시작했어요. 매일 아침 30분씩 하고 있습니다.',
        isPriority: false,
        fileUrl: '',
        type: 'TEXT',
      },
      {
        eventId: 7,
        title: '좋아하는 여름 음식',
        questionId: 107,
        content: '가장 좋아하는 여름 음식은 무엇인가요?',
        isAnswer: true,
        myAnswer: '시원한 물냉면이요. 특히 더운 날 먹으면 정말 좋아요.',
        isPriority: false,
        fileUrl: '',
        type: 'TEXT',
      },
      {
        eventId: 8,
        title: '여름 플레이리스트',
        questionId: 108,
        content: '이번 여름에 자주 듣는 노래는?',
        isAnswer: true,
        myAnswer: 'summer.mp3',
        isPriority: false,
        fileUrl: 'https://example.com/summer.mp3',
        type: 'VOICE',
      },
    ],
  },
  {
    eventDate: '2023-06',
    questionContent: [
      {
        eventId: 9,
        title: '6월의 목표',
        questionId: 109,
        content: '이번 달의 개인적인 목표는 무엇인가요?',
        isAnswer: true,
        myAnswer: '매일 30분 이상 책 읽기',
        isPriority: true,
        fileUrl: '',
        type: 'TEXT',
      },
      {
        eventId: 10,
        title: '좋아하는 장소',
        questionId: 110,
        content: '요즘 자주 가는 좋아하는 장소가 있나요?',
        isAnswer: true,
        myAnswer: 'favorite_place.jpg',
        isPriority: false,
        fileUrl: 'https://example.com/favorite_place.jpg',
        type: 'IMAGE',
      },
      {
        eventId: 11,
        title: '새로운 도전',
        questionId: 111,
        content: '최근에 시도해 본 새로운 것이 있다면?',
        isAnswer: true,
        myAnswer:
          '베이킹을 처음 해봤어요. 쿠키를 만들었는데 생각보다 맛있었습니다!',
        isPriority: false,
        fileUrl: '',
        type: 'TEXT',
      },
      {
        eventId: 12,
        title: '감사한 순간',
        questionId: 112,
        content: '오늘 하루 동안 감사했던 순간은?',
        isAnswer: true,
        myAnswer: '동료가 어려운 업무를 도와줘서 정말 고마웠어요.',
        isPriority: true,
        fileUrl: '',
        type: 'TEXT',
      },
    ],
  },
];

const SavedQuestionsPage = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [allEventList, setAllEventList] = useState<MonthAllEventsType[]>([]);

  const fetchData = async () => {
    // API Call
    setAllEventList(mockAllEventList);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      <div className="flex-1 overflow-y-auto pb-[68px] mb-8">
        {allEventList.map((event) => (
          <MonthlyEventGroup key={event.eventDate.toString()} event={event} />
        ))}
      </div>

      <NavBar />
    </div>
  );
};

export default SavedQuestionsPage;
