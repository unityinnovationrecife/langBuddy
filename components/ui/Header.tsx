import { useRouter } from 'next/navigation';
import { Bell, User2, Settings } from 'lucide-react';

export default function Header() {
    const router = useRouter();

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-blue-100">
            <div className="flex items-center gap-3">
                <a href="/dashboard">
                    <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                        LangBuddy
                    </h1>
                </a>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-blue-600 hover:text-blue-700 transition">
                    <Bell size={22} />
                </button>
                <button onClick={() => router.push('/profile/me')} className="text-blue-600 hover:text-blue-700 transition">
                    <User2 size={22} />
                </button>
                <button className="text-blue-600 hover:text-blue-700 transition">
                    <Settings size={22} />
                </button>
            </div>
        </header>
    );
}