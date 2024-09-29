interface Props {
  active: boolean;
}

const IngIcon = ({ active }: Props) => {
  return (
    <>
      <svg
        width="32"
        height="8"
        viewBox="0 0 32 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 1000016202">
          <g id="Group 1000016195">
            <circle
              id="Ellipse 2594"
              cx="4"
              cy="4"
              r="3.5"
              fill={active ? '#8ABADD' : '#CCCCCC'}
              stroke={active ? '#8ABADD' : '#CCCCCC'}
            />
            <path
              id="Ellipse 2595"
              d="M3.85742 7C5.59317 7 7.00028 5.65685 7.00028 4C7.00028 2.34315 5.59317 1 3.85742 1V7Z"
              fill="white"
            />
          </g>
          <circle
            id="Ellipse 2594_2"
            cx="16"
            cy="4"
            r="3.5"
            fill={active ? '#8ABADD' : '#CCCCCC'}
            stroke={active ? '#8ABADD' : '#CCCCCC'}
          />
          <circle
            id="Ellipse 2594_3"
            cx="28"
            cy="4"
            r="3.5"
            fill={active ? '#8ABADD' : '#CCCCCC'}
            stroke={active ? '#8ABADD' : '#CCCCCC'}
          />
        </g>
      </svg>
    </>
  );
};

export default IngIcon;
