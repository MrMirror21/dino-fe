import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { AppProps } from 'next/app';
//  AuthWrapper: 로그인 여부를 확인하고, 로그인이 되어있지 않다면 로그인 페이지로 리다이렉트하는 컴포넌트 (CSR 방식)
// middleware.ts: 로그인 여부를 확인하고, 로그인이 되어있지 않다면 로그인 페이지로 리다이렉트하는 미들웨어 (SSR 방식)
import { AuthWrapper } from '@/components/AuthWrapper';
import Head from 'next/head';
import MainLayout from '@/components/common/MainLayout';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>DayDream</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <AuthWrapper>
        <MainLayout>
          <Component {...pageProps} />
          <Toaster position="top-center" />
        </MainLayout>
      </AuthWrapper>
    </QueryClientProvider>
  );
}
