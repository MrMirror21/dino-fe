import Image from 'next/image';

interface Props {
  title: string;
  isFlower?: boolean;
}
const NotExist = ({ title, isFlower = false }: Props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="mt-7 mb-[152px] flex items-center justify-center flex-col">
        {isFlower && (
          <Image
            src="/image/LandingFlower.png"
            alt="flower"
            width={100}
            height={100}
            className="mb-4"
          />
        )}
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
