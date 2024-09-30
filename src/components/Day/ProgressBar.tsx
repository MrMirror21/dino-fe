import React from 'react';

interface ProgressBarProps {
  answerNum: number;
  totalNum: number;
  endColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  answerNum,
  totalNum,
  endColor,
}) => {
  const percentage = (answerNum / totalNum) * 100;

  return (
    <div className="w-full px-16">
      <div className="w-full h-2 rounded-md overflow-hidden border border-[#DCDCDC] border-opacity-50">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, rgba(255, 255, 255, 0.80) 0%, ${endColor} 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
