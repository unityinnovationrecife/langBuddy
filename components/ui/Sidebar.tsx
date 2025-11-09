import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageCircle, 
  Settings,
  User,
  UserPlus,
  LogOut
} from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-blue-100 text-blue-600'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/home', icon: <Home size={20} />, label: 'Início' },
    { href: '/match', icon: <Users size={20} />, label: 'Match' },
    { href: '/agenda', icon: <Calendar size={20} />, label: 'Agenda' },
    { href: '/chat', icon: <MessageCircle size={20} />, label: 'Chat' },
    { href: '/friends', icon: <UserPlus size={20} />, label: 'Amigos' },
    { href: '/perfil/me', icon: <User size={20} />, label: 'Perfil' },
    { href: '/settings', icon: <Settings size={20} />, label: 'Configurações' },
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">LangBuddy</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={pathname === link.href}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 text-red-600 px-4 py-3 w-full rounded-lg hover:bg-red-50 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
