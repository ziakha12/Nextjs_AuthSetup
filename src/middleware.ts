import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('token')



    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
}
 
export const config = {
  matcher: [
    '/login',
    '/profile',
    '/profile/:path*',
    '/signup',
    '/',
  ],
}