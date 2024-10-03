import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

const Landing = () => {
  const [showButton, setShowButton] = useState(false);
  const backgroundStyle = {
    background: `
          radial-gradient(56.98% 56.98% at 50% 43.02%, rgba(178, 202, 213, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), 
          linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%)
        `,
  };
  const textStyle = {
    color: 'rgba(138, 186, 221, 0.6)',
  };

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    router.push('https://www.khu-dino.n-e.kr/oauth2/authorization/kakao');
  };

  return (
    <div
      className="h-screen max-h-screen flex flex-col justify-between items-center"
      style={backgroundStyle}
    >
      {/* 중앙 컨텐츠 */}
      <div className="flex flex-col items-center text-center flex-grow mt-48">
        <div className="relative">
          <div
            className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-[52px] font-edensor z-10"
            style={textStyle}
          >
            Daydream
          </div>
          <Image
            alt="landing-flower"
            width={213}
            height={212}
            src="/image/LandingFlower.png"
          />
        </div>
        <div className="text-[#8ABADD] text-[20px] flex mt-5">
          <span className="font-pretendard-500">기다림이 설렘</span>
          <span className="font-pretendard-300">으로 피어날 때</span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        className={`w-[calc(100%-40px)] h-[52px] rounded-[10px] overflow-hidden mb-8 cursor-pointer transition-opacity duration-1000 ${
          showButton ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: '0px 2px 20px 0px rgba(136, 136, 136, 0.12)',
        }}
        onClick={handleLogin}
      >
        <div className="relative w-full h-full">
          <Image
            src="/image/kakao.png"
            alt="Kakao Login"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
