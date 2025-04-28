import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "@/lib/config/routes.js";
import Cookies from "js-cookie";

export async function middleware(request) {
  const currentUser = request.cookies.get("token")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!currentUser || Date.now() > JSON.stringify(currentUser).expiredAt) {
      request.cookies.delete("token");
      const response = NextResponse.redirect(
        new URL("/account/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }

    try {
      if (currentUser) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/checklogin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser}`,
            },
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          request.cookies.delete("token");
          Cookies.remove("token");
        }

        if (currentUser !== responseData.token) {
          const response = NextResponse.redirect(
            new URL("/account", request.url)
          );

          return response;
        }
      }
    } catch (error) {
      console.error("Verification Error:", error);
      request.cookies.delete("token");
      Cookies.remove("token");
    }
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }
}
export const config = {
  matcher: ["/account/:path*", "/login"],
};
