'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { PanInfo, motion, useMotionValue } from 'framer-motion';

import DDayCounter from './Day/DDayCounter';
import { EmotionType } from '@/types/emotion';
import { EventType } from '../types/event';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import { calculatePeriod, stringToDate } from '@/utils/event';

interface DateChangerProps {
  event: EventType;
  today: Date;
  currentDay: Date;
  setCurrentDay: Dispatch<SetStateAction<Date>>;
}

const DRAG_BUFFER = 10; // 페이지 이동을 유발하는 드래그 길이

// 애니메이션 설정
const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 600,
  damping: 50,
};

function getDayDiff(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000; // 밀리초 단위의 하루
  const timeDiff = date2.getTime() - date1.getTime();
  return Math.round(timeDiff / oneDay);
}

function getDateRange(today: Date, period: number) {
  const oneDay = 24 * 60 * 60 * 1000; // 밀리초 단위의 하ß루
  const dateRange = [];
  // Intl.DateTimeFormat을 사용하여 요일 포맷터 생성
  const weekdayFormatter = new Intl.DateTimeFormat('en', { weekday: 'short' });

  // 이벤트 기간의 2배 길이의 날짜 범위 생성
  for (let i = -period; i <= period; i++) {
    const date = new Date(today.getTime() + i * oneDay);

    dateRange.push({
      date: date,
      day: date.getDate(), // 1~31 사이의 일
      dayOfWeek: weekdayFormatter.format(date), // 요일 (월, 화, 수, ...)
      isToday: i === 0, // 오늘 날짜 여부
    });
  }
  return dateRange;
}

export default function DateChanger({
  event,
  today,
  currentDay,
  setCurrentDay,
}: DateChangerProps) {
  const period = calculatePeriod(event?.startDate, event?.endDate);
  const dateArr = getDateRange(currentDay, period);
  const [dragStartX, setDragStartX] = useState(0);
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState<number>(0);
  const dragX = useMotionValue(0);
  const onDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    setDragStartX(info.point.x);
  };

  const onDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    //const currentDrag = info.point.x - dragStartX;
    //dragX.set(currentDrag > 0 ? Math.min(currentDrag, 100) : 0);
  };

  // 마우스 드래그를 통한 슬라이드 이동 함수
  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && page < dateArr.length - 1) {
      const tomorrow = new Date(currentDay.getTime() + 24 * 60 * 60 * 1000);
      const endDate = stringToDate(event?.endDate);
      if (tomorrow > endDate) {
        // endDate까지 이동할 수 있도록 수정
        if (currentDay.getTime() !== endDate.getTime()) {
          setCurrentDay(endDate);
          setPage((prevPage) => prevPage + 1);
        }
        return;
      }
      setCurrentDay(tomorrow);
      setPage((prevPage) => prevPage + 1);
    }
    if (x >= 10) {
      const yesterday = new Date(currentDay.getTime() - 24 * 60 * 60 * 1000);
      const startDate = stringToDate(event?.startDate);
      if (yesterday < startDate) {
        // startDate 이동할 수 있도록
        if (currentDay.getTime() !== startDate.getTime()) {
          setCurrentDay(startDate);
          setPage((prevPage) => prevPage - 1);
        }
        return;
      }
      setCurrentDay(yesterday);
      setPage((page) => page - 1);
    }
  };
  return (
    <div className=" w-[400px] overflow-hidden">
      <DDayCounter
        currentDay={currentDay}
        dDay={event?.endDate}
        emotion={event?.emotion as EmotionType}
      />
      <div className="flex items-center justify-center overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{
            x: dragX,
            width: '550px',
          }}
          animate={{ translateX: `-${page * width}px` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          dragElastic={0.2}
          className="flex gap-x-8 items-center justify-center mb-5"
        >
          {/* {dateArr.length === 0 && <div>dd</div>} */}
          {dateArr.map((day) => (
            <motion.div
              style={
                currentDay.getDate() === day.day
                  ? {
                      backgroundColor: getProgressAndButtonColor(
                        event?.emotion as EmotionType,
                      ),
                    }
                  : {}
              }
              className={`flex flex-col m-2 items-center justify-center w-[46px] min-w-11 h-[46px] ${
                currentDay.getDate() === day.day
                  ? `rounded-full drop-shadow-md`
                  : ''
              }`}
              transition={SPRING_OPTIONS}
            >
              <div
                className={`text-center font-pretendard text-[8px] font-light tracking-[-0.32px]
                  ${(() => {
                    const today = new Date();
                    const eventStartDate = stringToDate(event?.startDate);
                    const eventEndDate = stringToDate(event?.endDate);
                    const dayDiff = getDayDiff(eventEndDate, day.date);
                    const isCurrent =
                      currentDay.getMonth() == day.date.getMonth() &&
                      currentDay.getDate() == day.date.getDate();

                    if (isCurrent) {
                      return 'text-white font-pretendard-300';
                    }

                    // D-day 처리
                    if (dayDiff === 0) {
                      return 'font-pretendard-300 text-black'; // D-day 스타일
                    }

                    // 미래 날짜 처리
                    if (dayDiff > 0) {
                      if (day.date > eventEndDate) {
                        return 'text-transparent';
                      }
                      return 'font-pretendard-300';
                    }

                    // 과거 날짜 처리
                    if (dayDiff < 0) {
                      if (day.date < eventStartDate) {
                        return 'text-transparent';
                      }
                      return 'text-black font-pretendard-300';
                    }

                    return ''; // 기본 스타일
                  })()}
                  ${
                    getDayDiff(today, day.date) == 0
                      ? 'font-pretendard-400'
                      : ''
                  }
                ${
                  currentDay.getMonth() == day.date.getMonth() &&
                  currentDay.getDate() == day.date.getDate() &&
                  'text-white'
                }}
                  `}
              >
                {day.dayOfWeek}
              </div>
              <div
                className={`text-center font-pretendard text-base font-light tracking-[-0.64px]
                  ${(() => {
                    const today = new Date();
                    const eventStartDate = stringToDate(event?.startDate);
                    const eventEndDate = stringToDate(event?.endDate);
                    const dayDiff = getDayDiff(eventEndDate, day.date);
                    const isCurrent =
                      currentDay.getMonth() == day.date.getMonth() &&
                      currentDay.getDate() == day.date.getDate();

                    if (isCurrent) {
                      return 'text-white font-pretendard-300';
                    }

                    // D-day 처리
                    if (dayDiff === 0) {
                      return 'font-pretendard-300 text-black'; // D-day 스타일
                    }

                    // 미래 날짜 처리
                    if (dayDiff > 0) {
                      if (day.date > eventEndDate) {
                        return 'text-transparent';
                      }
                      return 'font-normal';
                    }

                    // 과거 날짜 처리
                    if (dayDiff < 0) {
                      if (day.date < eventStartDate) {
                        return 'text-transparent';
                      }
                      return 'text-black font-pretendard-300';
                    }

                    return ''; // 기본 스타일
                  })()}
                  ${
                    getDayDiff(today, day.date) == 0
                      ? 'font-pretendard-400'
                      : ''
                  }
                  `}
              >
                {day.day}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const days = {
  current: 'rounded-full drop-shadow-md',
};
