import { NextRequest, NextResponse } from 'next/server';

import { parse } from 'cookie';

const TOKEN_KEY = 'access-code'; // tokenUtils에서 사용하는 키와 동일하게 설정

export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies[TOKEN_KEY];

  const currentPath = request.nextUrl.pathname;
  const isLoginPage = currentPath === '/login';

  if (!token || token.trim() === '') {
    if (!isLoginPage) {
      console.log(
        `Unauthenticated user redirected to /login from ${currentPath}`,
      );
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (isLoginPage) {
    console.log('Authenticated user redirected to / from /login');
    return NextResponse.redirect(new URL('/', request.url));
  }

  console.log(`Proceeding to ${currentPath}`);
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
