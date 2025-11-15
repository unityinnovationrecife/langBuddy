'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import api from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';

interface User {
    id: number;
    nome: string;
    idioma_nativo: string;
    idioma_aprendendo: string;
    pais: string;
    estado: string;
    cidade: string;
    interesses: string[];
    email: string;
    avatar?: string | null;
    bio?: string | null;
    credits?: number;
    actionsCount?: number;
    brandsCount?: number;
}

export default function PerfilDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get('/me');
                setUser(res.data);
            } catch (err) {
                console.error('Erro /me', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, []);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadPreview(URL.createObjectURL(file));
    };

    return (
        <div className="flex min-h-screen bg-blue-50 text-gray-800">
            {/* Sidebar */}
            <Sidebar/>

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header />

                {/* Conteúdo principal */}
                <main className="flex-1 p-6 max-w-7xl mx-auto lg:ml-64">
                    {/* Welcome Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="relative w-28 h-28 rounded-lg overflow-hidden border">
                                    <Image
                                        src={uploadPreview ?? user?.avatar ?? '/default-avatar.png'}
                                        alt="avatar"
                                        fill
                                        sizes="112px"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl font-extrabold">{user?.nome ?? 'Usuário'}</h2>
                                    <p className="text-sm text-gray-500">{user?.bio ?? 'Bem-vindo ao LangBuddy'}</p>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <label className="px-3 py-1 bg-gray-100 rounded-lg text-sm cursor-pointer">
                                            <input onChange={handleAvatarChange} type="file" className="hidden" />
                                            {uploading ? 'Enviando...' : 'Alterar foto'}
                                        </label>

                                        <Link
                                            href="/perfil/editar"
                                            className="px-3 py-1 bg-pink-600 text-white rounded-lg text-sm"
                                        >
                                            Editar Perfil
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4 lg:mt-0">
                                <div className="bg-blue-100 p-4 rounded-xl text-center min-w-[140px]">
                                    <p className="text-sm text-blue-700">Créditos</p>
                                    <p className="text-2xl font-bold">{user?.credits ?? 20}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Cards Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Resumo */}
                        <div className="col-span-2 bg-white rounded-2xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Resumo</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Idioma</p>
                                    <p className="font-medium">
                                        {user?.idioma_nativo ?? '-'} → {user?.idioma_aprendendo ?? '-'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Local</p>
                                    <p className="font-medium">{user?.cidade ?? '-'}, {user?.estado ?? '-'}</p>
                                </div>

                                <div className="md:col-span-2 mt-2">
                                    <p className="text-sm text-gray-500">Progresso semanal</p>
                                    <div className="mt-2 w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                                            style={{ width: '45%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Premium */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Premium</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Aproveite benefícios, matches prioritários e boost de visibilidade.
                            </p>
                            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition">
                                Assinar Premium
                            </button>
                        </div>
                    </div>

                    {/* Actions & Activities */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Ações rápidas */}
                        <div className="col-span-2 bg-white rounded-2xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-4 py-2 border rounded-lg hover:bg-blue-50 transition">
                                    Iniciar conversa
                                </button>
                                <button className="px-4 py-2 border rounded-lg hover:bg-blue-50 transition">
                                    Buscar parceiros
                                </button>
                                <button className="px-4 py-2 border rounded-lg hover:bg-blue-50 transition">
                                    Criar sala de estudo
                                </button>
                                <button className="px-4 py-2 border rounded-lg hover:bg-blue-50 transition">
                                    Exportar dados
                                </button>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-md font-semibold mb-2">Atividades Recentes</h4>
                                <ul className="space-y-3">
                                    <li className="p-3 border rounded-lg hover:bg-gray-50 transition">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Chat com Maria</p>
                                                <p className="text-sm text-gray-500">Há 2 dias</p>
                                            </div>
                                            <span className="text-sm text-gray-400 cursor-pointer">Ver</span>
                                        </div>
                                    </li>
                                    <li className="p-3 border rounded-lg hover:bg-gray-50 transition">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Sessão de pronúncia</p>
                                                <p className="text-sm text-gray-500">Há 4 dias</p>
                                            </div>
                                            <span className="text-sm text-gray-400 cursor-pointer">Ver</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Estatísticas */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Estatísticas</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Nível</p>
                                    <p className="font-medium">Intermediário</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Tempo diário</p>
                                    <p className="font-medium">20 min/dia</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Meta atual</p>
                                    <p className="font-medium">Praticar 5 dias esta semana</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </main>
            </div>
        </div>
    );
}
