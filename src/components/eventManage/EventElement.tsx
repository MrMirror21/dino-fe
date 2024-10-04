import { PanInfo, motion, useMotionValue } from 'framer-motion';
import React, { Children, ReactElement, useEffect, useState } from 'react';

import ConfirmModal from '../common/ConfirmModal';
import Loading from '../Loading';
import { useDeleteEvent } from '@/hooks/api/useEvent';
import { useRouter } from 'next/router';

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

interface Props {
  children: ReactElement;
  eventId: number;
}

const EventElement = ({ children, eventId }: Props) => {
  const [dragStartX, setDragStartX] = useState(0);
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState<number>(0);
  const dragX = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useDeleteEvent();

  const handleDelete = () => {
    alert('삭제');
    mutate(eventId);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);

  const onDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    setDragStartX(info.point.x);
    setIsDragging(true);
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
    x >= DRAG_BUFFER && page == 0 && setIsDelete(true);
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      router.push('/ing/detail');
    }
    setIsDragging(false);
  };

  if (isPending) return <Loading />;
  return (
    <>
      <div className="w-[400px] overflow-hidden">
        <div className="w-[4000px] overflow-hidden -translate-x-[100px]">
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
            <div className="w-[100px] h-[200px] flex items-center justify-center bg-black rounded-md text-white text-center font-light text-base leading-tight tracking-tighter">
              삭제
            </div>
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="w-[400px] flex gap-[30px items-center justify-center overflow-hidden"
              >
                <motion.div transition={SPRING_OPTIONS} onClick={handleClick}>
                  {children}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      {isDelete && (
        <ConfirmModal
          content="삭제하시겠습니까?"
          isOpen={isDelete}
          setIsOpen={setIsDelete}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default EventElement;
