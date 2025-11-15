'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { Globe2, MessageCircle, Users, Video } from 'lucide-react';
import Banner from '@/assets/banner.png';
import api from '@/services/api';

export default function DashboardPage() {
  const router = useRouter();
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  useEffect(() => {
    const fetchUserLogado = async () => {
      try {
        const res = await api.get("/me"); // rota do backend
        setUsuarioLogado(res.data);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
        router.push("/login");
      }
    };
    fetchUserLogado();
  }, []);

  const videoTips = [
    {
      id: 1,
      title: "Aprenda inglês com diálogos reais",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Dicas para memorizar vocabulário",
      thumbnail: "https://img.youtube.com/vi/3GwjfUFyY6M/0.jpg",
      url: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* SIDEBAR FIXA */}
      <Sidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col">
        {/* HEADER FIXO */}
        <Header />

        {/* MAIN */}
        <main className="max-w-7xl mx-auto py-10 px-6 w-full flex flex-col gap-12">
          {/* BANNER INTERATIVO */}
          <section className="relative bg-blue-600 text-white rounded-2xl shadow-lg p-8 overflow-hidden">
            <Image
              src={Banner}
              alt="Banner LangBuddy"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="relative z-10 flex flex-col gap-4">
              <h1 className="text-4xl font-bold">
                Olá, {usuarioLogado?.nome || "Usuário"}!
              </h1>
              <h2 className="text-xl font-semibold">
                Vamos praticar idiomas hoje?
              </h2>
              <p className="text-blue-100 text-sm">
                Explore conteúdos, vídeos, desafios e interaja com a comunidade.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push('/discover')}
                  className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-50 transition"
                >
                  Começar a explorar 🌎
                </button>
                <button
                  onClick={() => router.push('/friends')}
                  className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-50 transition"
                >
                  Meus amigos 👥
                </button>
              </div>
            </div>
          </section>

          {/* PROGRESSO DO USUÁRIO */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Seu progresso
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Nível atual</p>
                <p className="font-bold text-2xl">Intermediário</p>
              </div>
              <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Tempo diário</p>
                <p className="font-bold text-2xl">25 min/dia</p>
              </div>
              <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Desafios concluídos</p>
                <p className="font-bold text-2xl">3/5</p>
              </div>
            </div>
          </section>

          {/* VÍDEOS E CONTEÚDOS */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Conteúdos recomendados
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videoTips.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex items-center gap-2">
                    <Video size={20} className="text-blue-600" />
                    <span className="font-medium">{video.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* AÇÕES RÁPIDAS */}
          <section className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => router.push('/chat')}
              className="flex flex-col items-center bg-white shadow-md p-5 rounded-xl w-36 hover:shadow-lg transition"
            >
              <MessageCircle size={28} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium">Mensagens</span>
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
