'use client';

import { useRouter } from 'next/navigation';
import { MessageSquare, Clock, Globe2 } from 'lucide-react';

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

  // Exemplo de chats recentes
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Globe2 size={22} /> Minhas Conversas
        </h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          + Nova conversa
        </button>
      </header>

      {/* Lista de chats */}
      <main className="max-w-2xl mx-auto py-6 px-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => router.push(`/chat/${chat.id}`)}
            className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 mb-3 hover:shadow-md transition cursor-pointer"
          >
            {/* Avatar */}
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
            />

            {/* Conteúdo */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-semibold text-gray-800">{chat.name}</h2>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} /> {chat.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              <p className="text-xs text-blue-500 mt-1">{chat.language}</p>
            </div>

            <MessageSquare
              size={20}
              className="text-blue-500 opacity-70 hover:opacity-100"
            />
          </div>
        ))}

        {chats.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Nenhuma conversa iniciada ainda 😅
          </p>
        )}
      </main>
    </div>
  );
}
