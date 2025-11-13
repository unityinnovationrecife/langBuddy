'use client';

//component
import Header from '@/components/ui/Header';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Globe2, MessageCircle, Search, Bell, User2, Settings, Users } from 'lucide-react';
import Banner from '@/assets/banner.png';
import api from '@/services/api';

interface User {
  id: number;
  nome: string;
  nativeLang: string;
  learningLang: string;
  flag: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  //conexão com API e fetch dos usuários seriam feitos aqui

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios/');
        if (response.data.status === 'success') {
          setUsuarios(response.data.data);
          console.log('Usuários carregados:', response.data.data);
        } else {
          console.error('Erro:', response.data.message);
        }
      } catch (error) {
        console.error('Error ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsuarios();
  }, []);

  // Usuários mockados
  const users: User[] = [
    { id: 1, nome: 'Samuel Muniz', nativeLang: 'Inglês', learningLang: 'Português', flag: '🇺🇸' },
    { id: 2, nome: 'Eudes Jordão', nativeLang: 'Português', learningLang: 'Espanhol', flag: '🇧🇷' },
    { id: 3, nome: 'Júnior', nativeLang: 'Coreano', learningLang: 'Inglês', flag: '🇰🇷' },
    { id: 4, nome: 'Joana Silva', nativeLang: 'Espanhol', learningLang: 'Inglês', flag: '🇪🇸' },
    { id: 5, nome: 'Liu Wei', nativeLang: 'Chinês', learningLang: 'Português', flag: '🇨🇳' },
    { id: 6, nome: 'Fatima Khan', nativeLang: 'Urdu', learningLang: 'Inglês', flag: '🇵🇰' },
    { id: 7, nome: 'Hans Müller', nativeLang: 'Alemão', learningLang: 'Espanhol', flag: '🇩🇪' },
    { id: 8, nome: 'Sofia Rossi', nativeLang: 'Italiano', learningLang: 'Inglês', flag: '🇮🇹' },
    { id: 9, nome: 'Yuki Tanaka', nativeLang: 'Japonês', learningLang: 'Português', flag: '🇯🇵' },
    { id: 10, nome: 'Olivia Brown', nativeLang: 'Inglês', learningLang: 'Francês', flag: '🇬🇧' },
    { id: 11, nome: 'Carlos García', nativeLang: 'Espanhol', learningLang: 'Alemão', flag: '🇪🇸' },
    { id: 12, nome: 'Amina Yusuf', nativeLang: 'Árabe', learningLang: 'Inglês', flag: '🇸🇦' },
  ];

  const filteredUsers = users.filter((u) =>
    u.nome.toLowerCase().includes(search.toLowerCase()) ||
    u.learningLang.toLowerCase().includes(search.toLowerCase()) ||
    u.nativeLang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 flex flex-col">
      {/* HEADER */}
      <Header />

      <main className="max-w-6xl mx-auto py-10 px-6 w-full flex flex-col gap-10">
        {/* BANNER */}
        <section className="relative bg-blue-600 text-white rounded-2xl shadow-md p-8 overflow-hidden">
          {/* Fundo com imagem local */}
          <Image
            src={Banner}
            alt="Banner LangBuddy"
            fill
            className="object-cover opacity-25"
            priority
          />

          {/* Conteúdo do banner */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">{usuarios[0]?.nome || 'Usuário'}</h1>
            <h2 className="text-xl font-bold mb-2">Bem-vindo(a) ao LangBuddy</h2>
            <p className="text-sm text-blue-100 mb-5">
              Conecte-se com pessoas do mundo todo, pratique idiomas e faça novas amizades!
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#users-list"
                className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition"
              >
                Explorar usuários
              </a>
            </div>
          </div>
        </section>


        {/* BARRA DE BUSCA */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-lg mx-auto">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Buscar por idioma, nome ou país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-gray-700"
          />
        </div>

        {/* BOTÕES RÁPIDOS */}
        <section className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => router.push('/discover')}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl w-36 hover:shadow-lg transition"
          >
            <Globe2 size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium">Descobrir</span>
          </button>
          <button
            onClick={() => router.push('/friends')}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl w-36 hover:shadow-lg transition"
          >
            <Users size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium">Amigos</span>
          </button>
          <button
            onClick={() => router.push('/chat')}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl w-36 hover:shadow-lg transition"
          >
            <MessageCircle size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium">Mensagens</span>
          </button>
        </section>

        {/* LISTA DE USUÁRIOS */}
        <section id='users-list'>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Usuários disponíveis</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-700">{user.nome}</h3>
                <span className="text-xl mb-2">{user.flag}</span>
                <p className="text-sm text-gray-500">
                  Nativo em <strong>{user.nativeLang}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Aprendendo <strong>{user.learningLang}</strong>
                </p>
                <button
                  onClick={() => router.push(`/perfil/${user.id}`)}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  <MessageCircle size={18} /> Conversar
                </button>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Nenhum usuário encontrado 😔</p>
          )}
        </section>
      </main>
    </div>
  );
}
