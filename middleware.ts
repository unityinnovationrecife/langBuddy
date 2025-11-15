import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Rotas públicas (que não precisam de login)
const publicRoutes = ["/", "/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Se a rota for pública → libera
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Checa token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

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
