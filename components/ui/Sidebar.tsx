'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo-side.png';
import { Home, Footprints, Globe2, Users, MessagesSquare } from 'lucide-react';

export default function Sidebar() {
  // Aqui você pode adicionar lógica para detectar rota ativa futuramente
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white min-h-screen px-3 py-6 fixed z-50 shadow-sm">
      {/* Logo */}
      <a href="/inicio">
        <div className="mb-8 flex justify-center">
          <Image src={Logo} alt="LangBuddy Logo" width={180} height={40} />
        </div>
      </a>

      {/* Navegação */}
      <nav className="flex-1 mt-4">
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              href="/inicio"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 font-semibold hover:bg-blue-100 hover:text-blue-800 transition"
            >
              <Home size={22} /> Home
            </Link>
          </li>

          <li>
            <Link
              href="/descobrir"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
            >
              <Globe2 size={22} /> Descobrir
            </Link>
          </li>
          <li>
            <Link
              href="/amigos"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
            >
              <Users size={22} /> Amigos
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
            >
              <MessagesSquare size={22} /> Conversas
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
            >
              <Footprints size={22} />Aprendizado
            </Link>
          </li>
        </ul>
      </nav>

      {/* Ações */}
      <div className="mt-8 px-1">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-5 flex flex-col gap-4">
          {/* Título do plano */}
          <div className="flex flex-col items-start justify-between gap-2">
            <h3 className=" font-semibold">Plano Atual:</h3>
            <h3 className="text-xl font-bold text-blue-100">Gratuito</h3>

          </div>


          {/* Botão de upgrade */}
          <Link
            href="/premium"
            className="bg-white text-blue-600 font-semibold rounded-lg py-2 text-center hover:bg-blue-50 transition"
          >
            Fazer Upgrade
          </Link>
        </div>
      </div>

    </aside>
  );
}
