import { PanInfo, useMotionValue, motion } from 'framer-motion';
import React, { useState } from 'react';

const DRAG_BUFFER = 80; // 페이지 이동을 유발하는 드래그 길이

const slides = [
  {
    id: 1,
    text: '이벤트',
  },
];

// 애니메이션 설정
const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const EventElement = () => {
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
    const currentDrag = info.point.x - dragStartX;
    dragX.set(currentDrag > 0 ? Math.min(currentDrag, 100) : 0);
  };
  const onDragEnd = () => {
    const x = dragX.get();

    x <= -DRAG_BUFFER &&
      page < slides.length - 1 &&
      setPage((point) => point + 1);
    x >= DRAG_BUFFER && page > 0 && setPage((point) => point - 1);
    x >= DRAG_BUFFER && page == 0 && alert('게시물 삭제');
  };
  return (
    <>
      <div className="w-[400px] overflow-hidden">
        ㅇㅇ
        <div className="w-[4000px] bg-white overflow-hidden -translate-x-[100px]">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{
              x: dragX,
              width: '4000px',
            }}
            animate={{ translateX: `-${page * width}px` }}
            transition={SPRING_OPTIONS}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            dragElastic={0.2}
            className="flex items-center justify-start overflow-hidden mb-5"
          >
            <div className="w-[100px] bg-red-500">삭제</div>
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="w-[400px] flex flex-row gap-[30px] bg-blue-500 items-center justify-center overflow-hidden"
              >
                <motion.div transition={SPRING_OPTIONS}>
                  <div className="w-[100px] bg-blue-500">{slide.text}</div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EventElement;
