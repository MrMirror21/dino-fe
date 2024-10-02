import React from 'react';
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  LegacyRef,
  ReactElement,
} from 'react';
import { motion, MotionValue, useMotionValue } from 'framer-motion';

interface TimePickerProps {
  onChange: (time: string) => void;
}

interface TimePickerBlockProps extends TimePickerProps {
  dragY: MotionValue<number>;
  ref: LegacyRef<HTMLDivElement>;
  children: ReactElement;
}

const DRAG_BUFFER = 10; // 페이지 이동을 유발하는 드래그 길이

// 애니메이션 설정
const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 600,
  damping: 50,
};

const TimePickerBlock: React.FC<TimePickerBlockProps> = ({
  dragY,
  children,
}) => {
  const [page, setPage] = useState(0);
  const onDragEnd = () => {
    const y = dragY.get();

    y <= -DRAG_BUFFER && page < 1 && setPage((page) => page + 1);
    y >= 1 && page > 0 && setPage((page) => page - 1);

    console.log(page);
  };
  return (
    <>
      <div className="h-40 overflow-y-scroll scrollbar-hide">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          style={{
            y: dragY,
            height: '160px',
          }}
          animate={{ translateY: `-${page * 64}px` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          dragElastic={0.2}
          className="flex items-center justify-start"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

const TimePicker: React.FC<TimePickerProps> = ({ onChange }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState<'오전' | '오후'>('오전');

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);
  const dragY = useMotionValue(0);
  const [page, setPage] = useState(0);

  const handleScroll = useCallback(
    (
      ref: React.RefObject<HTMLDivElement>,
      setter: React.Dispatch<React.SetStateAction<number>>,
      max: number,
    ) => {
      if (ref.current) {
        const { scrollTop, clientHeight } = ref.current;
        const index = Math.round(scrollTop / (clientHeight / 5));
        setter(index % max);
      }
    },
    [],
  );

  const handlePeriodScroll = useCallback(() => {
    if (periodRef.current) {
      const { scrollTop, clientHeight } = periodRef.current;
      setPeriod(scrollTop < clientHeight / 2 ? '오전' : '오후');
    }
  }, []);

  const onDragEnd = () => {
    const y = dragY.get();

    y <= -DRAG_BUFFER && page < 1 && setPage((page) => page + 1);
    y >= 1 && page > 0 && setPage((page) => page - 1);

    console.log(page);
  };

  useEffect(() => {
    const formattedHours = hours === 0 ? 12 : hours;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    onChange(`${formattedHours}:${formattedMinutes} ${period}`);
  }, [hours, minutes, period, onChange]);

  return (
    <div className="flex justify-center items-center space-x-4 bg-gray-800 text-white p-4 rounded-lg">
      <TimePickerBlock
        onChange={() => setPeriod}
        dragY={dragY}
        ref={periodRef}
      >
        <motion.div
          ref={periodRef}
          className="h-40"
          transition={SPRING_OPTIONS}
        >
          <div className="h-16 flex items-start justify-center">오전</div>
          <div className="h-16 flex items-start justify-center">오후</div>
        </motion.div>
      </TimePickerBlock>
      <div
        ref={hourRef}
        className="h-40 overflow-y-scroll scrollbar-hide"
        onScroll={() => handleScroll(hourRef, setHours, 12)}
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-8 flex items-center justify-center">
            {i === 0 ? 12 : i}
          </div>
        ))}
      </div>
      <div className="text-2xl">:</div>
      <div
        ref={minuteRef}
        className="h-40 overflow-y-scroll scrollbar-hide"
        onScroll={() => handleScroll(minuteRef, setMinutes, 60)}
      >
        {[...Array(60)].map((_, i) => (
          <div key={i} className="h-8 flex items-center justify-center">
            {i.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
