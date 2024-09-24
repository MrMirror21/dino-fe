'use client';

import { useMemo, useState } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';

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

function getDateRange(today: Date) {
  const oneDay = 24 * 60 * 60 * 1000; // 밀리초 단위의 하ß루
  const dateRange = [];
  // Intl.DateTimeFormat을 사용하여 요일 포맷터 생성
  const weekdayFormatter = new Intl.DateTimeFormat('en', { weekday: 'short' });

  // 현재 날짜로부터 1주일 전부터 1주일 후까지의 날짜를 계산
  for (let i = -7; i <= 7; i++) {
    const date = new Date(today.getTime() + i * oneDay);

    dateRange.push({
      date: date,
      day: date.getDate(), // 1~31 사이의 일
      dayOfWeek: weekdayFormatter.format(date), // 요일 (월, 화, 수, ...)
      isToday: i === 0, // 오늘 날짜 여부
    });
  }
  console.log(dateRange);
  return dateRange;
}

export default function DateChanger() {
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);
  const dateArr = useMemo(() => getDateRange(currentDay), [currentDay]);
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

  console.log(currentDay.getDate());

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
      setCurrentDay(tomorrow);
      setPage((page) => page + 1);
      console.log('increase');
    }
    if (x >= 10) {
      const yesterday = new Date(currentDay);
      yesterday.setDate(currentDay.getDate() - 1);
      setCurrentDay(yesterday);
      setPage((page) => page - 1);
      console.log('decrease');
    }
  };
  return (
    <div className=" w-[400px] overflow-hidden border border-white">
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
          {dateArr.map((day) => (
            <motion.div
              className={`flex flex-col m-2 items-center justify-center w-[46px] min-w-11 h-[46px] bg-white ${
                currentDay.getDate() === day.day
                  ? 'rounded-full drop-shadow-md'
                  : ''
              }`}
              transition={SPRING_OPTIONS}
            >
              <div
                className={`text-[8px] font-normal
                  ${getDayDiff(today, day.date) > 0 ? 'text-black' : ''}
                  ${getDayDiff(today, day.date) < 0 ? 'text-[#DDDDDD]' : ''}
                  `}
              >
                {day.dayOfWeek}
              </div>
              <div
                className={`text-base
                  ${getDayDiff(today, day.date) > 0 ? 'font-normal' : ''}
                  ${
                    getDayDiff(today, day.date) < 0
                      ? 'text-[#DDDDDD] font-normal'
                      : ''
                  }
                  ${getDayDiff(today, day.date) == 0 ? 'font-bold' : ''}
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
