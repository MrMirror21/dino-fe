interface Props {
  inactive: boolean;
  color?: string;
}

const PrevTriButtonIcon = ({ inactive, color }: Props) => {
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
          d="M12 16.1194V1.08062C12 0.242119 11.0301 -0.224054 10.3753 0.299757L0.976086 7.81913C0.475679 8.21946 0.47568 8.98054 0.976087 9.38087L10.3753 16.9002C11.0301 17.4241 12 16.9579 12 16.1194Z"
          fill={inactive ? '#EBEFF1' : color ? color : '#BAD7EC'}
        />
      </svg>
    </div>
  );
};

export default PrevTriButtonIcon;
