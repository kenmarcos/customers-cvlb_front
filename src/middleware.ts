import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("@cvlb_customers:token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return null;
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cadastro-cliente/:path*",
    "/listagem-clientes/:path*",
    "/cliente/:path*",
  ],
};
