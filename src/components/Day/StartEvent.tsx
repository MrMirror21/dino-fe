import Image from 'next/image';
import { useRequest } from '@/api/apiHandler';
import { useRouter } from 'next/router';
const StartEvent = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/ing/create');
  };

  const backgroundStyle = {
    background: `
          radial-gradient(56.98% 56.98% at 50% 43.02%, rgba(178, 202, 213, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), 
          linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%)
        `,
  };

  return (
    <div
      className="h-full flex flex-col justify-between items-center"
      style={backgroundStyle}
    >
      {/* 중앙 컨텐츠 */}
      <div className="flex flex-col items-center text-center flex-grow mt-56">
        <div>
          <Image
            alt="landing-flower"
            width={113}
            height={113}
            src="/image/notExistFlower.png"
          />
        </div>
        <div className="flex mt-[18px]">
          <span className="text-[#8ABADD] text-[20px] font-pretendard-300">
            지금, 무엇을 기다리고 있나요?
          </span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        className="w-[calc(100%-40px)] rounded-[10px] h-[52px] flex text-center items-center justify-center cursor-pointer mb-10"
        style={{
          background: 'rgba(255, 255, 255, 0.60)',
          boxShadow: '0px 2px 20px 0px rgba(136, 136, 136, 0.12)',
        }}
        onClick={handleStart}
      >
        <span className="text-[16px] font-pretendard-500">시작하기</span>
      </div>
    </div>
  );
};

export default StartEvent;
