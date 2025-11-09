'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send, Languages } from 'lucide-react';
import Image from 'next/image';
import User from '@/assets/user.png';


interface Message {
    id: number;
    sender: 'me' | 'buddy';
    text: string;
}

export default function ChatPage() {
    const router = useRouter();
    const { id } = useParams();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'buddy', text: 'Hey! 👋 How are you?' },
        { id: 2, sender: 'me', text: 'I’m great, and you?' },
        { id: 3, sender: 'buddy', text: 'I’m fine! Ready to practice languages?' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const newMsg = {
            id: messages.length + 1,
            sender: 'me' as const,
            text: newMessage.trim(),
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, sender: 'buddy', text: 'Nice! 😄' },
            ]);
        }, 1000);
    };

    const handleTranslate = () => {
        alert('Tradução ativada! (aqui entrará a API de tradução futuramente)');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
            {/* HEADER FIXO */}
            <header className="flex items-center justify-between bg-white px-5 py-3 border-b shadow-sm sticky top-0 z-10">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
                >
                    <ArrowLeft size={20} /> Voltar
                </button>

                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <Image
                            src={User}
                            alt="LangBuddy Avatar"
                            fill
                            className="rounded-full object-cover border border-blue-300"
                        />
                    </div>

                    <div>
                        <h2 className="font-semibold text-blue-700 flex items-center gap-1">
                            Samuel Muniz
                        </h2>
                        <p className="text-xs text-green-500">🟢 Online</p>
                    </div>
                </div>

                <div className="w-6" />
            </header>

            {/* ÁREA DE MENSAGENS */}
            <div
                ref={chatRef}
                className="flex-1 overflow-y-auto px-5 py-6 space-y-3 scrollbar-thin scrollbar-thumb-blue-300"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm transition-transform ${msg.sender === 'me'
                                    ? 'bg-blue-600 text-white rounded-br-none hover:scale-[1.02]'
                                    : 'bg-white text-gray-800 rounded-bl-none hover:scale-[1.02]'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* INPUT + TRADUZIR + ENVIAR */}
            <form
                onSubmit={handleSend}
                className="bg-white flex items-center gap-3 px-4 py-3 border-t shadow-sm"
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                />

                {/* Botão de tradução */}
                <button
                    type="button"
                    onClick={handleTranslate}
                    className="p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition transform hover:scale-105 active:scale-95"
                    title="Traduzir mensagens"
                >
                    <Languages size={18} />
                </button>

                {/* Botão de enviar */}
                <button
                    type="submit"
                    className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-105 active:scale-95"
                    title="Enviar mensagem"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
