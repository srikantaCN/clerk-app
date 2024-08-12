import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/profile', '/register','/'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)',"/organization/:path*"],
};
// export const config = {
//   matcher: ["/organization/:path*"],
// };

// app/middleware.js
// import { authMiddleware } from '@clerk/nextjs';

// export default authMiddleware({});

// export const config = {
//   matcher: ["/organization/:path*"],
// };