interface Props {
  active: boolean;
}

const DayIcon = ({ active }: Props) => {
  return (
    <>
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 1000016195">
          <circle
            id="Ellipse 2594"
            cx="9.5"
            cy="9.5"
            r="9"
            fill={active ? "#8ABADD": "#CCCCCC"}
            stroke={active ? "#8ABADD": "#CCCCCC"}
          />
          <path
            id="Ellipse 2595"
            d="M9.09277 18C14.0107 18 17.9975 14.1944 17.9975 9.5C17.9975 4.80558 14.0107 1 9.09277 1V18Z"
            fill="white"
          />
        </g>
      </svg>
    </>
  );
};

export default DayIcon;
