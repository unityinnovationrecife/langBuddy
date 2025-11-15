'use client';

import Image from 'next/image';
import User from '@/assets/user.png';
import { useState } from 'react';
import { HelpCircle, Bell, Settings, Search as SearchIcon } from 'lucide-react';

export default function Header() {
    const [query, setQuery] = useState('');

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar por usuário, país ou idioma..."
                            className="w-full rounded-full border border-gray-200 px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-300 outline-none"
                        />
                        <SearchIcon
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:opacity-95 transition">
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button title="Ajuda" className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <HelpCircle size={20} />
                    </button>

                    <button title="Notificações" className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <Bell size={20} />
                    </button>

                    <button title="Configurações" className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <Settings size={20} />
                    </button>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image src={User} alt="avatar" width={40} height={40} priority />
                    </div>
                </div>
            </div>
        </header>
    );
}
