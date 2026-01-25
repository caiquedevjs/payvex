import { NextRequest, NextResponse } from "next/server"; // Correto ✅

export function middleware(request: NextRequest) {
  // 1. Tenta recuperar o token do cookie
  const token = request.cookies.get("@payvex:token")?.value;

  // 2. Define as rotas que precisam de proteção
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/integrations");

  // 3. Se for uma rota protegida e não tiver token, manda pro login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Se o usuário já estiver logado e tentar ir pro login, manda pro dashboard
  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// O 'matcher' define em quais caminhos o middleware vai rodar
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/integrations/:path*",
    "/login",
  ],
};
