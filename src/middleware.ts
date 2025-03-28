import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth({
  loginRedirectPath: '/api/auth/login',
});

export const config = {
  matcher: [
    "/((?!_next|api|about|contact|favicon.ico|public|static|$).*)", // Exclude `/`
    '/dashboard',
    // '/recipes/:path*'
  ],
};

