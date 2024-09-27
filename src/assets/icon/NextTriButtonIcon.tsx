interface Props {
  inactive: boolean;
}

const NextTriButtonIcon = ({ inactive }: Props) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="18"
        viewBox="0 0 12 18"
        fill="none"
      >
        <path
          d="M0 16.1194V1.08062C0 0.242119 0.969932 -0.224054 1.6247 0.299757L11.0239 7.81913C11.5243 8.21946 11.5243 8.98054 11.0239 9.38087L1.6247 16.9002C0.969932 17.4241 0 16.9579 0 16.1194Z"
          fill={inactive ? '#EBEFF1' : '#BAD7EC'}
        />
      </svg>
    </div>
  );
};

export default NextTriButtonIcon;
