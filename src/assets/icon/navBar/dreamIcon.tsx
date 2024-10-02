import React from 'react';

interface Props {
  active: boolean;
}

const DreamIcon = ({ active }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect
        x="4.5"
        y="8.92114"
        width="22"
        height="17.5789"
        rx="4.5"
        fill="white"
        stroke={active ? '#8ABADD' : '#CCCCCC'}
      />
      <path
        d="M11 6V10"
        stroke={active ? '#8ABADD' : '#CCCCCC'}
        strokeLinecap="round"
      />
      <path
        d="M16 6V10"
        stroke={active ? '#8ABADD' : '#CCCCCC'}
        strokeLinecap="round"
      />
      <path
        d="M21 6V10"
        stroke={active ? '#8ABADD' : '#CCCCCC'}
        strokeLinecap="round"
      />
      <circle
        cx="11.6316"
        cy="18.2632"
        r="1.10526"
        fill={active ? '#8ABADD' : '#CCCCCC'}
      />
      <circle
        cx="16.0525"
        cy="18.2632"
        r="1.10526"
        fill={active ? '#8ABADD' : '#CCCCCC'}
      />
      <circle
        cx="20.4737"
        cy="18.2632"
        r="1.10526"
        fill={active ? '#8ABADD' : '#CCCCCC'}
      />
    </svg>
  );
};

export default DreamIcon;
