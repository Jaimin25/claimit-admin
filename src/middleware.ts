import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { Config } from "@/lib/config";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const isAuthenticated = await checkAuthentication(request);

  const { pathname } = request.nextUrl;

  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/overview", request.url));
  }

  if (!isAuthenticated) {
    return NextResponse.rewrite(new URL("/", request.nextUrl.origin));
  }
  return response;
}

async function checkAuthentication(request: NextRequest): Promise<boolean> {
  try {
    const res = await fetch(`${Config.APP_URL}/api/auth/authUser`, {
      credentials: "include",
      headers: {
        cookie: `session=${request.cookies.get("session")?.value}`,
      },
      method: "POST",
    });
    const data = await res.json();

    return data.statusMessage === "Admin Authenticated!";
  } catch (error) {
    console.log(error);
    return false;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
