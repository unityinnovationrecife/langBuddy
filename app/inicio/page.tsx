'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { Globe2, MessageCircle, Users, Video, Star, Award } from 'lucide-react';
import Banner from '@/assets/banner.png';
import api from '@/services/api';

export default function DashboardPage() {
  const router = useRouter();
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  useEffect(() => {
    const fetchUserLogado = async () => {
      try {
        const res = await api.get("/me");
        setUsuarioLogado(res.data);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
        router.push("/login");
      }
    };
    fetchUserLogado();
  }, []);

  // Vídeos de onboarding / tutorial do app
  const videoTips = [
    {
      id: 1,
      title: "Aprenda inglês com diálogos reais",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Como memorizar vocabulário de forma divertida",
      thumbnail: "https://img.youtube.com/vi/3GwjfUFyY6M/0.jpg",
      url: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
    },
    {
      id: 3,
      title: "Gamificação: pontos, streaks e badges",
      thumbnail: "https://img.youtube.com/vi/tVj0ZTS4WF4/0.jpg",
      url: "https://www.youtube.com/watch?v=tVj0ZTS4WF4",
    },
  ];

  // Exemplos de progresso/gamificação
  const userProgress = {
    level: "Intermediário",
    points: 450,
    streak: 5,
    badges: ["Primeira conversa", "Desafio diário", "Amigo do mês"]
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="max-w-7xl mx-auto py-10 px-6 w-full flex flex-col gap-12">
          {/* Banner interativo */}
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
                Explore, pratique e se divirta aprendendo idiomas
              </h2>
              <p className="text-blue-100 text-sm">
                Siga sua trilha, complete desafios e veja seu progresso aumentar.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push('/discover')}
                  className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-50 transition"
                >
                  Começar a explorar
                </button>

              </div>
            </div>
          </section>



          {/* Trilha de aprendizado */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Sua trilha de aprendizado</h3>
            <div className="flex flex-col md:flex-row items-center gap-4">
              {["Vocabulário", "Gramática", "Conversação", "Desafios diários"].map((step, idx) => (
                <div key={idx} className="flex-1 bg-blue-50 rounded-xl p-4 text-center relative">
                  <p className="font-medium">{step}</p>
                  <div className={`h-2 w-full bg-gray-200 rounded-full mt-2 overflow-hidden`}>
                    <div className="h-full bg-blue-600" style={{ width: `${(idx + 1) * 25}%` }} />
                  </div>
                  <Award size={20} className="absolute top-2 right-2 text-yellow-400" />
                </div>
              ))}
            </div>
          </section>

          {/* Vídeos tutoriais */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Vídeos explicativos</h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
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


        </main>
      </div>
    </div>
  );
}
