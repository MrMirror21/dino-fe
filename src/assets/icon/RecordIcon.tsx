interface Props {
  active: boolean;
  onClick: () => void;
}

const RecordIcon = ({ active, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.5 3.25C12.9315 3.25 13.2812 3.58579 13.2812 4V20C13.2812 20.4142 12.9315 20.75 12.5 20.75C12.0685 20.75 11.7188 20.4142 11.7188 20V4C11.7188 3.58579 12.0685 3.25 12.5 3.25Z"
          fill={active ? '#BAD7EC' : '#D5D8D9'}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.33301 8.25C8.76448 8.25 9.11426 8.58579 9.11426 9V15C9.11426 15.4142 8.76448 15.75 8.33301 15.75C7.90154 15.75 7.55176 15.4142 7.55176 15V9C7.55176 8.58579 7.90154 8.25 8.33301 8.25Z"
          fill={active ? '#BAD7EC' : '#D5D8D9'}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.833 9.25C21.2645 9.25 21.6143 9.58579 21.6143 10V14C21.6143 14.4142 21.2645 14.75 20.833 14.75C20.4015 14.75 20.0518 14.4142 20.0518 14V10C20.0518 9.58579 20.4015 9.25 20.833 9.25Z"
          fill={active ? '#BAD7EC' : '#D5D8D9'}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.16699 9.25C4.59846 9.25 4.94824 9.58579 4.94824 10V14C4.94824 14.4142 4.59846 14.75 4.16699 14.75C3.73552 14.75 3.38574 14.4142 3.38574 14V10C3.38574 9.58579 3.73552 9.25 4.16699 9.25Z"
          fill={active ? '#BAD7EC' : '#D5D8D9'}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.667 6.25C17.0985 6.25 17.4482 6.58579 17.4482 7V17C17.4482 17.4142 17.0985 17.75 16.667 17.75C16.2355 17.75 15.8857 17.4142 15.8857 17V7C15.8857 6.58579 16.2355 6.25 16.667 6.25Z"
          fill={active ? '#BAD7EC' : '#D5D8D9'}
        />
      </svg>
    </div>
  );
};

export default RecordIcon;
