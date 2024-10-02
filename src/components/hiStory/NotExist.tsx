interface Props {
  title: string;
}
const NotExist = ({ title }: Props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="mt-7 mb-[152px]">
        <span
          className="font-pretendard-300 text-[16px]"
          style={{ color: 'rgba(0,0,0,0.6)' }}
        >
          {title} 없습니다.
        </span>
      </div>
    </div>
  );
};

export default NotExist;
