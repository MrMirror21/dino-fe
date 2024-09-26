import React, { useState, useEffect, useRef, useMemo } from 'react';
import Draggable from 'react-draggable';
import StarIcon from '@/assets/icon/starIcon.svg';
import { useEventContext } from '@/pages/ing/create';
import { calculateQuestionSize } from '@/utils/event';

const QuestionNumSelectSlider: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const { eventInfo, setEventInfo } = useEventContext();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    setPosition({ x: Number(sliderRef.current?.offsetWidth) - 23, y: -23 });
    setEventInfo({
      ...eventInfo,
      questionSize: calculateQuestionSize(eventInfo.endDate, 4),
    });
  }, []);

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: -23 });
  };

  const handleDragStop = () => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const sectionWidth = sliderWidth / 4;
      const nearestSection = Math.round(position.x / sectionWidth);
      const newX = nearestSection * sectionWidth;
      setPosition({ x: newX - 23, y: -23 });
      setEventInfo({
        ...eventInfo,
        questionSize: calculateQuestionSize(eventInfo.endDate, nearestSection),
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 box-border">
      <div
        ref={sliderRef}
        className="relative h-[1px] bg-gray-300 rounded-full"
      >
        {[0, 1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="absolute top-1/2 w-[1px] h-5 bg-gray-400 -translate-y-1/2"
            style={{ left: `${index * 25}%` }}
          />
        ))}
        <Draggable
          axis="x"
          bounds="parent"
          position={position}
          onDrag={handleDrag}
          onStop={handleDragStop}
        >
          <div className="absolute -translate-y-1/2 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center">
            <StarIcon />
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default QuestionNumSelectSlider;
