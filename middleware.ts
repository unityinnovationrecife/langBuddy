import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas públicas (que não precisam de login)
const publicRoutes = ["/", "/login", "/api/login", "/api/cadastro"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Se a rota for pública → libera
  if (publicRoutes.includes(pathname) || pathname.startsWith("/")) {
    return NextResponse.next();
  }

  // Checa se tem token no cookie ou header
  const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');

  // Se não tiver token → redireciona para login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Token existe → libera rota
  return NextResponse.next();
}

// Define quais rotas o middleware vai interceptar
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
