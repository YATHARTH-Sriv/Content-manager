// import { getToken } from "next-auth/jwt";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/dashboard"] }

// export async function middleware(request: NextRequest) {
//   const cookie=cookies()
//   const googlecookie=await cookie.get('mygoogleid')
//   const googleuserId= googlecookie?.value
// // const token = await getToken({ req: request });
// // console.log("token is here",token);
// const url = await request.nextUrl;
// // console.log("url is here",url);
// if (
//     googleuserId &&
//     (url.pathname.startsWith('/Login') ||
//       url.pathname.startsWith('/sign-up') ||
//       url.pathname.startsWith('/verify') ||
//       url.pathname === '/')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   if (!googleuserId && url.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/Login', request.url));
//   }

//   return NextResponse.next();
// }
