import React, { useEffect, useState } from 'react';

import CustomCalendar from '@/components/dream/CustomCalendar';
import EventListShow from '@/components/dream/EventListShow';
import Header from '@/components/main/Header';
import NavBar from '@/components/common/NavBar';
import SlideMenu from '@/components/main/SideMenu';
import moment from 'moment';

export interface MonthEventType {
  eventDate: Date | string;
  eventContent: EventContent[];
}

export type EmotionType =
  | 'JOY'
  | 'HAPPINESS'
  | 'LOVE'
  | 'SATISFACTION'
  | 'HOPE'
  | 'EXPECTATION';
// export enum Emotion {
//   JOY = 'JOY',
//   HAPPINESS = 'HAPPINESS',
//   LOVE = 'LOVE',
//   SATISFACTION = 'SATISFACTION',
//   HOPE = 'HOPE',
//   EXPECTATION = 'EXPECTATION',
// }

export interface EventContent {
  eventId: number;
  title: string; // 질문 주제
  content: string; // 질문
  category: string;
  step: string;
  emotion: EmotionType;
  eventStatus: string;
  questionId: number;
  isAnswer: boolean;
  myAnswer: string; // 내 답변
  isPriority: boolean;
}

const DreamPage = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [eventList, setEventList] = useState<MonthEventType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | string>(
    moment().format('YYYY-MM-DD'),
  );
  const [filteredEvents, setFilteredEvents] = useState<EventContent[]>([]);

  const events: MonthEventType[] = [
    {
      eventDate: '2024-09-24',
      eventContent: [
        {
          eventId: 1001,
          title: '운동과 정신 건강',
          content: '아침 요가가 당신의 정신 건강에 어떤 영향을 미치나요?',
          category: '운동',
          step: 'level2',
          emotion: 'JOY',
          eventStatus: 'execution',
          questionId: 101,
          isAnswer: true,
          myAnswer: '마음이 평온해지고 긍정적 에너지가 생깁니다.',
          isPriority: true,
        },
        {
          eventId: 1002,
          title: '효과적인 팀 커뮤니케이션',
          content: '오늘의 팀 미팅에서 가장 중요하게 다룬 주제는 무엇이었나요?',
          category: '업무',
          step: 'level3',
          emotion: 'SATISFACTION',
          eventStatus: 'termination',
          questionId: 102,
          isAnswer: false,
          myAnswer: '',
          isPriority: false,
        },
      ],
    },
    {
      eventDate: '2024-09-25',
      eventContent: [
        {
          eventId: 1003,
          title: '사회적 관계와 행복',
          content: '친구와의 저녁 식사가 당신의 기분에 어떤 영향을 주었나요?',
          category: '사회생활',
          step: 'level1',
          emotion: 'HAPPINESS',
          eventStatus: 'execution',
          questionId: 103,
          isAnswer: true,
          myAnswer: '스트레스 해소와 행복감을 느꼈습니다.',
          isPriority: false,
        },
      ],
    },
    {
      eventDate: '2024-09-26',
      eventContent: [
        {
          eventId: 1004,
          title: '새로운 도전과 성장',
          content: '새 프로젝트에서 가장 기대되는 부분은 무엇인가요?',
          category: '업무',
          step: 'level4',
          emotion: 'EXPECTATION',
          eventStatus: 'execution',
          questionId: 104,
          isAnswer: true,
          myAnswer: '새로운 기술을 배우고 적용할 기회입니다.',
          isPriority: true,
        },
        {
          eventId: 1005,
          title: '일상 속 운동의 의미',
          content: '저녁 조깅이 당신의 하루 일과에 어떤 변화를 주나요?',
          category: '운동',
          step: 'level2',
          emotion: 'SATISFACTION',
          eventStatus: 'termination',
          questionId: 105,
          isAnswer: false,
          myAnswer: '',
          isPriority: false,
        },
      ],
    },
    {
      eventDate: '2024-09-27',
      eventContent: [
        {
          eventId: 1006,
          title: '독서를 통한 자기 성장',
          content:
            '이번 독서 클럽 모임에서 가장 인상 깊었던 의견은 무엇인가요?',
          category: '취미',
          step: 'level3',
          emotion: 'SATISFACTION',
          eventStatus: 'execution',
          questionId: 106,
          isAnswer: true,
          myAnswer: '책 속 주인공과 우리 삶의 유사성에 대한 토론이었습니다.',
          isPriority: false,
        },
      ],
    },
    {
      eventDate: '2024-09-28',
      eventContent: [
        {
          eventId: 1007,
          title: '가족과의 소중한 시간',
          content: '가족 소풍에서 가장 기억에 남는 순간은 무엇인가요?',
          category: '가족',
          step: 'level1',
          emotion: 'LOVE',
          eventStatus: 'execution',
          questionId: 107,
          isAnswer: true,
          myAnswer: '함께 도시락을 먹으며 나눈 대화입니다.',
          isPriority: true,
        },
        {
          eventId: 1008,
          title: '정리정돈의 힘',
          content: '대청소 후 가장 큰 변화를 느낀 공간은 어디인가요?',
          category: '집안일',
          step: 'level2',
          emotion: 'SATISFACTION',
          eventStatus: 'termination',
          questionId: 108,
          isAnswer: false,
          myAnswer: '',
          isPriority: false,
        },
      ],
    },
    {
      eventDate: '2024-09-29',
      eventContent: [
        {
          eventId: 1009,
          title: '온라인 학습의 효과',
          content: '온라인 강의를 통해 새롭게 깨달은 점은 무엇인가요?',
          category: '학습',
          step: 'level3',
          emotion: 'SATISFACTION',
          eventStatus: 'execution',
          questionId: 109,
          isAnswer: true,
          myAnswer: '시공간 제약 없는 학습의 장점을 깨달았습니다.',
          isPriority: false,
        },
      ],
    },
    {
      eventDate: '2024-09-30',
      eventContent: [
        {
          eventId: 1010,
          title: '목표 설정과 동기부여',
          content: '이번 달 목표 중 가장 도전적인 것은 무엇인가요?',
          category: '자기계발',
          step: 'level4',
          emotion: 'HOPE',
          eventStatus: 'execution',
          questionId: 110,
          isAnswer: true,
          myAnswer: '매일 30분 독서하는 습관 들이기입니다.',
          isPriority: true,
        },
        {
          eventId: 1011,
          title: '명상과 마음의 평화',
          content: '명상 세션 후 당신의 마음 상태는 어떻게 변화했나요?',
          category: '건강',
          step: 'level1',
          emotion: 'SATISFACTION',
          eventStatus: 'termination',
          questionId: 111,
          isAnswer: false,
          myAnswer: '',
          isPriority: false,
        },
      ],
    },
  ];
  const getEventList = async () => {
    setEventList(events);
  };

  useEffect(() => {
    getEventList();
  }, []);

  useEffect(() => {
    const filterEventsForDate = (date: string) => {
      return eventList
        .filter(
          (event) => moment(event.eventDate).format('YYYY-MM-DD') === date,
        )
        .flatMap((event) => event.eventContent);
    };

    const currentDateEvents = filterEventsForDate(selectedDate as string);
    setFilteredEvents(currentDateEvents);
  }, [eventList, selectedDate]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Header onClick={() => setIsSideMenuOpen(true)} />
      <SlideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
      <div
        style={{
          background:
            'linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%), #FFF',
          boxShadow: '0px 2px 32px 0px rgba(136, 136, 136, 0.12)',
        }}
        className="flex-1 overflow-y-auto pb-[68px]"
      >
        <CustomCalendar
          eventList={eventList}
          setSelectedDate={handleDateSelect}
        />
        {/* <span className="text-slate-500">{selectedDate.toString()}</span> */}
        <EventListShow events={filteredEvents} />
      </div>
      <NavBar />
    </div>
  );
};

export default DreamPage;
