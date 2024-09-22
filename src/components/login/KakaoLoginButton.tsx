import React from 'react';
import { useRouter } from 'next/router';

const KakaoLoginButton = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('https://www.khu-dino.n-e.kr/oauth2/authorization/kakao');
  };

  return <button onClick={handleLogin}>카카오로 로그인</button>;
};

export default KakaoLoginButton;
