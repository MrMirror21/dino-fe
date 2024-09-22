import { destroyCookie, parseCookies, setCookie } from 'nookies';

const TOKEN_KEY = 'access-code';

export const tokenUtils = {
  setToken: (token: string, ctx?: any) => {
    setCookie(ctx, TOKEN_KEY, token, {
      maxAge: 24 * 60 * 60, // 1일
      path: '/',
      sameSite: 'strict', // CSRF 공격 방지
    });
  },

  getToken: (ctx?: any): string | null => {
    const cookies = parseCookies(ctx);
    return cookies[TOKEN_KEY] || null;
  },

  removeToken: (ctx?: any) => {
    destroyCookie(ctx, TOKEN_KEY);
  },

  isTokenValid: (token: string): boolean => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // sec -> ms
      return Date.now() < expirationTime;
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  },
};
