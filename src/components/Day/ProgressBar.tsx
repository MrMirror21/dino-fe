import React from 'react';

interface ProgressBarProps {
  answerNum: number;
  totalNum: number;
  startColor: string;
  endColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  answerNum,
  totalNum,
  startColor,
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
            background: `linear-gradient(to right, ${startColor}, ${endColor})`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
