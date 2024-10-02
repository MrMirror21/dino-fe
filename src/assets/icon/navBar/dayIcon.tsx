import React from 'react';

interface Props {
  active: boolean;
}

const DayIcon = ({ active }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <circle
        cx="15.5"
        cy="16.5"
        r="9"
        fill={active ? '#8ABADD' : '#CCCCCC'}
        stroke={active ? '#8ABADD' : '#CCCCCC'}
      />
      <path
        d="M15.0928 25C20.0107 25 23.9975 21.1944 23.9975 16.5C23.9975 11.8056 20.0107 8 15.0928 8V25Z"
        fill="white"
      />
    </svg>
  );
};

export default DayIcon;
