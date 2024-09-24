import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { AppProps } from 'next/app';
//  AuthWrapper: 로그인 여부를 확인하고, 로그인이 되어있지 않다면 로그인 페이지로 리다이렉트하는 컴포넌트 (CSR 방식)
// middleware.ts: 로그인 여부를 확인하고, 로그인이 되어있지 않다면 로그인 페이지로 리다이렉트하는 미들웨어 (SSR 방식)
import { AuthWrapper } from '@/components/AuthWrapper';
import { useState } from 'react';
import MainLayout from '@/components/common/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthWrapper>
    </QueryClientProvider>
  );
}
