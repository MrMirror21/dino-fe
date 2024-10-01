import { useEffect, useState } from 'react';

import { tokenUtils } from '@/utils/tokenUtils';
import { useRouter } from 'next/router';
import { useValidateToken } from '@/hooks/api/useAuth';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useValidateToken(accessCode);

  useEffect(() => {
    const checkToken = () => {
      const storedToken = tokenUtils.getToken();
      const storedUserName = tokenUtils.getUserName();

      if (storedToken && tokenUtils.isTokenValid(storedToken)) {
        setAccessCode(storedToken);
        setUserName(storedUserName);
        refetch(); // 토큰 유효성 재검사
      } else if (router.pathname !== '/login') {
        tokenUtils.removeTokenAndUserName();
        router.push('/login');
      }
    };

    checkToken();

    // 라우트 변경 시 토큰 체크
    router.events.on('routeChangeComplete', checkToken);

    return () => {
      router.events.off('routeChangeComplete', checkToken);
    };
  }, [router, refetch]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/oauth2/login')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        const code = params.get('access-code');
        const nickname = params.get('nickname');

        if (code && nickname) {
          setAccessCode(code);
          setUserName(nickname);
          tokenUtils.setTokenAndUserName(code, nickname);
          router.push('/');
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
    if (data && data.isSuccess) {
      if (!tokenUtils.getUserName()) {
        tokenUtils.setUserName(data.data.nickname);
      }
      console.log('Token validated:', data);
      if (router.pathname === '/login') {
        router.push('/');
      }
    } else if (isError && router.pathname !== '/login') {
      tokenUtils.removeTokenAndUserName();
      router.push('/login');
    }
  }, [data, isError, router]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
