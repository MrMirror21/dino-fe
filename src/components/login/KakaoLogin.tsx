import Image from 'next/image';
import { useRequest } from '@/api/apiHandler';
import { useRouter } from 'next/router';
const KakaoLogin = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('https://www.khu-dino.n-e.kr/oauth2/authorization/kakao');
  };

  const backgroundStyle = {
    background: `
          radial-gradient(56.98% 56.98% at 50% 43.02%, rgba(178, 202, 213, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), 
          linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%)
        `,
  };
  const textStyle = {
    color: 'rgba(138, 186, 221, 0.6)',
  };
  return (
    <div
      className="h-screen max-h-screen flex flex-col justify-between items-center"
      style={backgroundStyle}
    >
      {/* 중앙 컨텐츠 */}
      <div className="flex flex-col items-center text-center flex-grow mt-56">
        <div>
          <Image
            alt="landing-flower"
            width={113}
            height={113}
            src="/image/LandingFlower.png"
          />
        </div>
        <div className="flex mt-6">
          <span className="text-[#8ABADD] text-[28px] font-edensor">
            Daydream
          </span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        className="w-[calc(100%-40px)] h-[52px] rounded-[10px] overflow-hidden mb-8 cursor-pointer"
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

export default KakaoLogin;
