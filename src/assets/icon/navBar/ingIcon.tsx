import React from 'react';

interface Props {
  active: boolean;
}

const IngIcon = ({ active }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <circle
        cx="4"
        cy="16"
        r="3.5"
        fill={active ? '#8ABADD' : '#CCCCCC'}
        stroke={active ? '#8ABADD' : '#CCCCCC'}
      />
      <path
        d="M3.85742 19C5.59317 19 7.00028 17.6569 7.00028 16C7.00028 14.3431 5.59317 13 3.85742 13V19Z"
        fill="white"
      />
      <circle
        cx="16"
        cy="16"
        r="3.5"
        fill={active ? '#8ABADD' : '#CCCCCC'}
        stroke={active ? '#8ABADD' : '#CCCCCC'}
      />
      <circle
        cx="28"
        cy="16"
        r="3.5"
        fill={active ? '#8ABADD' : '#CCCCCC'}
        stroke={active ? '#8ABADD' : '#CCCCCC'}
      />
    </svg>
  );
};

export default IngIcon;
