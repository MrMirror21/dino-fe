import KakaoLogin from '@/components/login/KakaoLogin';
import Landing from '@/components/login/Landing';
import { useState } from 'react';

const LoginPage = () => {
  const [isLanding, setIsLanding] = useState(true);

  const handleStart = () => {
    setIsLanding(false);
  };

  return (
    <div className="w-full">
      {isLanding ? <Landing handleStart={handleStart} /> : <KakaoLogin />}
    </div>
  );
};

export default LoginPage;
