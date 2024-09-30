import { useEffect, useRef, useState } from 'react';

import { tokenUtils } from '@/utils/tokenUtils';
import { useRouter } from 'next/router';
import { useValidateToken } from '@/hooks/api/useAuth';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { data, isLoading, isError } = useValidateToken(accessCode);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const storedToken = tokenUtils.getToken();
    if (storedToken && tokenUtils.isTokenValid(storedToken)) {
      setAccessCode(storedToken);
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/oauth2/login')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        const code = params.get('access-code');
        const nickname = params.get('nickname');

        if (code && nickname) {
          setAccessCode(code);
          setUserName(nickname);
          tokenUtils.setToken(code);
          router.push('/'); // OAuth 로그인 후 루트로 리다이렉트
        } else {
          console.error('No access code received');
          router.push('/login?error=no_access_code');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router]);

  useEffect(() => {
    if (data && data.isSuccess && !hasRedirected.current) {
      console.log('Token validated:', data);
      hasRedirected.current = true;

      // 현재 경로가 '/login'이고 유효한 토큰이 있는 경우에만 루트로 리다이렉트
      if (router.pathname === '/login') {
        router.push('/');
      }
    }
  }, [data, router]);

  // 토큰이 유효하지 않고 현재 경로가 '/login'이 아닌 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (isError && router.pathname !== '/login') {
      tokenUtils.removeToken();
      router.push('/login');
    }
  }, [isError, router]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
