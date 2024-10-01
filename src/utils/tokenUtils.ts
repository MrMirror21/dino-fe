import { destroyCookie, parseCookies, setCookie } from 'nookies';

const TOKEN_KEY = 'access-code';
const USER_NAME_KEY = 'user-name';

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

  // 새로 추가된 메서드들
  setUserName: (userName: string, ctx?: any) => {
    setCookie(ctx, USER_NAME_KEY, userName, {
      maxAge: 24 * 60 * 60, // 1일
      path: '/',
      sameSite: 'strict',
    });
  },

  getUserName: (ctx?: any): string | null => {
    const cookies = parseCookies(ctx);
    return cookies[USER_NAME_KEY] || null;
  },

  removeUserName: (ctx?: any) => {
    destroyCookie(ctx, USER_NAME_KEY);
  },

  // 토큰과 사용자 이름을 한 번에 설정하는 메서드
  setTokenAndUserName: (token: string, userName: string, ctx?: any) => {
    tokenUtils.setToken(token, ctx);
    tokenUtils.setUserName(userName, ctx);
  },

  // 토큰과 사용자 이름을 한 번에 제거하는 메서드
  removeTokenAndUserName: (ctx?: any) => {
    tokenUtils.removeToken(ctx);
    tokenUtils.removeUserName(ctx);
  },
};
