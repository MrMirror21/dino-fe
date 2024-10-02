import React from 'react';

interface Props {
  active: boolean;
}

const DreamIcon = ({ active }: Props) => {
  return (
    <>
      <svg
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 1000016201">
          <rect
            id="Rectangle 46279"
            x="0.5"
            y="3.92102"
            width="22"
            height="17.5789"
            rx="4.5"
            fill="white"
            stroke={active ? '#8ABADD' : '#CCCCCC'}
          />
          <path
            id="Vector 3419"
            d="M7 1V5"
            stroke={active ? '#8ABADD' : '#CCCCCC'}
            stroke-linecap="round"
          />
          <path
            id="Vector 3420"
            d="M12 1V5"
            stroke={active ? '#8ABADD' : '#CCCCCC'}
            stroke-linecap="round"
          />
          <path
            id="Vector 3421"
            d="M17 1V5"
            stroke={active ? '#8ABADD' : '#CCCCCC'}
            stroke-linecap="round"
          />
          <circle
            id="Ellipse 2620"
            cx="7.63163"
            cy="13.2631"
            r="1.10526"
            fill={active ? '#8ABADD' : '#CCCCCC'}
          />
          <circle
            id="Ellipse 2621"
            cx="12.0525"
            cy="13.2631"
            r="1.10526"
            fill={active ? '#8ABADD' : '#CCCCCC'}
          />
          <circle
            id="Ellipse 2622"
            cx="16.4739"
            cy="13.2631"
            r="1.10526"
            fill={active ? '#8ABADD' : '#CCCCCC'}
          />
        </g>
      </svg>
    </>
  );
};

export default DreamIcon;
