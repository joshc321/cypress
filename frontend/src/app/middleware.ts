import type { NextRequest } from 'next/server'
import { useUser } from '@/lib/auth'
 
export function middleware(request: NextRequest) {
  const currentUser = useUser();
 
  if (currentUser.data && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url))
  }
 
  if (!currentUser.data && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}