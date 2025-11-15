'use client';

import { useRouter } from 'next/navigation';
import { MessageSquare, Clock } from 'lucide-react';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';

interface ChatPreview {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  language: string;
}

export default function ChatListPage() {
  const router = useRouter();

  const chats: ChatPreview[] = [
    {
      id: 1,
      name: 'Anna 🇺🇸',
      lastMessage: 'Let’s practice some Portuguese today?',
      time: '10:24',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      language: 'Inglês / Português',
    },
    {
      id: 2,
      name: 'Lucas 🇧🇷',
      lastMessage: 'Hola amigo! Cómo estás?',
      time: 'Ontem',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      language: 'Português / Espanhol',
    },
    {
      id: 3,
      name: 'Mina 🇰🇷',
      lastMessage: 'See you tomorrow 😄',
      time: '2 dias atrás',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      language: 'Coreano / Inglês',
    },
  ];

  return (
    <div className="flex min-h-screen bg-blue-50 text-gray-800">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 lg:ml-64">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Conversas</h1>
            <button
              onClick={() => router.push('/descobrir')}
              className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-lg font-medium shadow"
            >
              + Nova conversa
            </button>
          </div>

          {/* Lista de chats */}
          <div className="flex flex-col gap-4">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => router.push(`/chat/${chat.id}`)}
                  className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
                >
                  {/* Avatar */}
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                  />

                  {/* Conteúdo */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex flex-col">
                      <h2 className="font-semibold text-gray-800">{chat.name}</h2>
                      <p className="text-sm text-gray-600 truncate max-w-[400px]">{chat.lastMessage}</p>
                      <p className="text-xs text-blue-500 mt-1">{chat.language}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {chat.time}
                      </span>
                      <MessageSquare
                        size={20}
                        className="text-blue-500 opacity-70 hover:opacity-100"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">
                Nenhuma conversa iniciada ainda 😅
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
