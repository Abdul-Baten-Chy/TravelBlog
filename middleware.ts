// middleware.ts
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/signin", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  User: [/^\/user/],
  Admin: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/signin?redirect=${pathname}`, request.url)
      );
    }
  }

  let decodedToken;
  if (token) {
    decodedToken = await jwtDecode(token);
  }
  if (decodedToken?.role && roleBasedRoutes[decodedToken?.role as Role]) {
    const routes = roleBasedRoutes[decodedToken?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/user", "/user/:page*", "/admin", "/login", "/register"],
};
