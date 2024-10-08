import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient':
          'linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%)',
      },
      fontFamily: {
        'pretendard-800': ['Pretendard-ExtraBold'],
        'pretendard-700': ['Pretendard-Bold'],
        'pretendard-600': ['Pretendard-SemiBold'],
        'pretendard-500': ['Pretendard-Medium'],
        'pretendard-400': ['Pretendard-Regular'],
        'pretendard-300': ['Pretendard-Light'],
        'pretendard-200': ['Pretendard-ExtraLight'],
        'pretendard-100': ['Pretendard-Thin'],
        edensor: ['Edensor-Bold'],
      },
      dropShadow: {
        custom: '0px 2px 16px rgba(68, 68, 68, 0.12)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
