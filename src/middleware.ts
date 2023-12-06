import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("@cvlb_customers:token")?.value;

  if (!token && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
};

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/cadastro-cliente/:path*",
    "/listagem-clientes/:path*",
    "/cliente/:path*",
  ],
};
