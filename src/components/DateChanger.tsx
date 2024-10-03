'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { PanInfo, motion, useMotionValue } from 'framer-motion';

import DDayCounter from './Day/DDayCounter';
import { EmotionType } from '@/types/emotion';
import { EventType } from '../types/event';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import { stringToDate } from '@/utils/event';

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
  const startDate = stringToDate(event?.startDate);
  const endDate = stringToDate(event?.endDate);

  const period = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const dateArr = useMemo(
    () => getDateRange(currentDay, period),
    [currentDay, period],
  );

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
      const tomorrow = new Date(currentDay);
      tomorrow.setDate(currentDay.getDate() + 1);
      if (tomorrow > stringToDate(event?.endDate)) {
        return;
      }
      setCurrentDay(tomorrow);
      setPage((page) => page + 1);
    }
    if (x >= 10) {
      const yesterday = new Date(currentDay);
      yesterday.setDate(currentDay.getDate() - 1);
      if (yesterday <= stringToDate(event?.startDate)) {
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
                  ${
                    getDayDiff(today, day.date) > 0
                      ? stringToDate(event?.endDate) < day.date
                        ? 'text-transparent'
                        : 'text-black'
                      : ''
                  }

                  ${
                    getDayDiff(today, day.date) < 0
                      ? stringToDate(event?.startDate) > day.date
                        ? 'text-transparent'
                        : 'text-[#DDDDDD]'
                      : ''
                  }
                  ${getDayDiff(today, day.date) == 0 ? 'text-white' : ''}
                  `}
              >
                {day.dayOfWeek}
              </div>
              <div
                className={`text-center font-pretendard text-base font-light tracking-[-0.64px]
                  ${
                    getDayDiff(today, day.date) > 0
                      ? stringToDate(event?.endDate) < day.date
                        ? 'text-transparent'
                        : 'font-normal'
                      : ''
                  }
                  ${
                    getDayDiff(today, day.date) < 0
                      ? stringToDate(event?.startDate) > day.date
                        ? 'text-transparent'
                        : 'text-[#DDDDDD] font-normal'
                      : ''
                  }
                  ${getDayDiff(today, day.date) == 0 ? 'text-white' : ''}
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
