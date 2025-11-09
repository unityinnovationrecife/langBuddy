'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit3, MessageCircle } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { username } = useParams();
  const displayName = Array.isArray(username) ? username[0] : username;

  // Usuário mockado (você pode substituir por API futuramente)
  const user = {
    name: 'Samuel Muniz',
    avatar: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
    bio: 'Apaixonado por idiomas e culturas 🌍. Adoro conversar sobre música, viagens e comida!',
    nativeLang: 'Inglês 🇺🇸',
    learningLang: 'Português 🇧🇷',
    interests: ['Música', 'Viagens', 'Culinária', 'Cultura brasileira'],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 flex flex-col">
      {/* 🔹 HEADER MELHORADO */}
      <header className="relative flex items-center justify-center bg-white px-5 py-3 shadow-sm border-b border-blue-100">
        {/* Botão voltar */}
        <button
          onClick={() => router.push('/dashboard')}
          className="absolute left-5 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        {/* Título centralizado */}
        <h2 className="text-blue-700 font-semibold text-lg">Meu Perfil</h2>

        {/* Botão editar */}
        <button
          onClick={() => alert('Função de edição em breve!')}
          className="absolute right-5 text-blue-600 hover:text-blue-700 transition"
        >
          <Edit3 size={20} />
        </button>
      </header>

      {/* 🔹 CONTEÚDO */}
      <main className="flex-1 flex flex-col items-center py-10 px-6">
        {/* Foto do perfil */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
        />

        <h1 className="text-2xl font-bold text-blue-700 mt-4">{user.name}</h1>
        <p className="text-gray-600 text-center mt-2 max-w-md">{user.bio}</p>

        {/* Idiomas */}
        <div className="mt-6 bg-white shadow-md rounded-2xl p-5 w-full max-w-md border border-blue-50">
          <h3 className="font-semibold text-blue-600 mb-3 text-lg">Idiomas</h3>
          <div className="flex justify-between text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Nativo:</p>
              <p className="font-medium">{user.nativeLang}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Aprendendo:</p>
              <p className="font-medium">{user.learningLang}</p>
            </div>
          </div>
        </div>

        {/* Interesses */}
        <div className="mt-5 bg-white shadow-md rounded-2xl p-5 w-full max-w-md border border-blue-50">
          <h3 className="font-semibold text-blue-600 mb-3 text-lg">Interesses</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((item, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Botão de mensagem */}
        <button
          onClick={() => router.push(`/chat/${username}`)}
          className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition transform hover:scale-[1.03] active:scale-[0.97]"
        >
          <MessageCircle size={18} /> Enviar mensagem
        </button>
      </main>
    </div>
  );
}
