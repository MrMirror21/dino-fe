import { useEffect, useRef, useState } from 'react';

import { tokenUtils } from '@/utils/tokenUtils';
import { useRouter } from 'next/router';
import { useValidateToken } from '@/hooks/api/useAuth';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState<string | null>(null);
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

        if (code) {
          setAccessCode(code);
          tokenUtils.setToken(code); // 쿠키에 저장 (nookies 라이브러리 사용)
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
      router.push('/');
    }
  }, [data, router]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    tokenUtils.removeToken();
    return <div>Error validating token</div>;
  }

  return <>{children}</>;
}
