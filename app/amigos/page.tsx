'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { Search, MessageCircle, UserMinus, UserPlus, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import User from '@/assets/user.png';

interface Friend {
  id: number;
  name: string;
  nativeLang: string;
  learningLang: string;
  avatar: typeof User;
  isOnline: boolean;
}

export default function FriendsPage() {
  const [search, setSearch] = useState('');

  const friends: Friend[] = [
    { id: 1, name: 'Maria Lopez', nativeLang: 'Espanhol', learningLang: 'Inglês', avatar: User, isOnline: true },
    { id: 2, name: 'Lucas Silva', nativeLang: 'Português', learningLang: 'Francês', avatar: User, isOnline: false },
    { id: 3, name: 'Aiko Tanaka', nativeLang: 'Japonês', learningLang: 'Português', avatar: User, isOnline: true },
  ];

  const requests = [
    { id: 4, name: 'Emma Brown', lang: 'Inglês', avatar: User },
    { id: 5, name: 'Ravi Kumar', lang: 'Hindi', avatar: User },
  ];

  const suggestions = [
    { id: 6, name: 'Anna Müller', lang: 'Alemão', avatar: User },
    { id: 7, name: 'Carlos Torres', lang: 'Espanhol', avatar: User },
    { id: 8, name: 'Sofia Wang', lang: 'Chinês', avatar: User },
  ];

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-5 py-8 flex flex-col gap-10">
          {/* BUSCA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Meus Amigos</h1>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar amigos..."
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl w-full bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
              />
            </div>
          </div>

          {/* AMIGOS */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map(friend => (
              <motion.div
                key={friend.id}
                layout
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 border border-gray-100 hover:shadow-lg transition"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-400 p-[2px]">
                    <Image src={friend.avatar} alt={friend.name} width={56} height={56} className="rounded-full object-cover" />
                  </div>
                  <span
                    className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                  ></span>
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">{friend.name}</h2>
                  <p className="text-sm text-gray-500">
                    🌍 {friend.nativeLang} • 🎯 {friend.learningLang}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                    <MessageCircle size={18} />
                  </button>
                  <button className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition">
                    <UserMinus size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* SOLICITAÇÕES */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Solicitações pendentes</h2>
            <div className="flex flex-wrap gap-4">
              {requests.map(r => (
                <motion.div key={r.id} whileHover={{ scale: 1.03 }} className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                  <Image src={r.avatar} alt={r.name} width={50} height={50} className="rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-gray-700">{r.name}</p>
                    <span className="text-sm text-gray-500">{r.lang}</span>
                  </div>
                  <div className="flex gap-2 ml-3">
                    <button className="p-2 bg-green-100 rounded-xl text-green-600 hover:bg-green-200 transition">
                      <Check size={16} />
                    </button>
                    <button className="p-2 bg-red-100 rounded-xl text-red-600 hover:bg-red-200 transition">
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SUGESTÕES */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descubra novos amigos</h2>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {suggestions.map(s => (
                <motion.div key={s.id} whileHover={{ scale: 1.05 }} className="min-w-[280px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={s.avatar} alt={s.name} width={55} height={55} className="rounded-full" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{s.name}</h3>
                      <p className="text-sm text-gray-500">Fala {s.lang}</p>
                    </div>
                  </div>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition">
                    <UserPlus size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
