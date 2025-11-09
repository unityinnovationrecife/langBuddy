'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LangImage from '@/assets/imagem-login.png';
import Logo from '@/assets/logo-branco.png';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      router.push('/dashboard');
    } else {
      alert('Conta criada com sucesso!');
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-600 to-blue-400">
      {/* Lado esquerdo (desktop) */}
      <div className="hidden md:flex w-2/5 items-center justify-center bg-blue-700 relative overflow-hidden">
        <Image
          src={LangImage}
          alt="LangBuddy illustration"
          className="object-cover object-center h-full w-full absolute inset-0"
        />
        <div className="absolute inset-0 bg-blue-700/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-start text-center px-8 pt-36"> 
          <div className="mb-6 flex justify-center">
            <Image
              src={Logo}
              alt="LangBuddy Logo"
              width={140}
              height={140}
              className="drop-shadow-lg"
            />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Bem-vindo ao LangBuddy
          </h2>
          <p className="text-white text-lg max-w-xs">
            Conecte-se com nativos e aprenda novos idiomas de forma natural.
          </p>
        </div>
      </div>

      {/* Versão mobile (mostra logo + fundo gradiente suave) */}
      <div className="md:hidden flex flex-col items-center justify-center py-8 bg-gradient-to-b from-blue-700 to-blue-500 text-white">
        <Image
          src={Logo}
          alt="LangBuddy Logo"
          width={100}
          height={100}
          className="drop-shadow-md mb-3"
        />
        <h2 className="text-2xl font-semibold mb-1">LangBuddy</h2>
        <p className="text-sm text-blue-100 text-center max-w-[280px]">
          Aprenda idiomas conversando com nativos. Simples, divertido e eficaz.
        </p>
      </div>

      {/* Lado direito (formulário) */}
      <div className="flex-1 flex items-center justify-center bg-white text-gray-800">
        <div className="w-full max-w-md p-8">
          <h1
            className={`text-3xl font-bold text-center text-blue-600 mb-6 transition-all duration-500 ${
              isLogin ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100'
            }`}
          >
            {isLogin ? 'Entrar no LangBuddy' : 'Criar Conta'}
          </h1>

          {/* Switch Login/Cadastro */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 rounded-full p-1 flex w-64 shadow-inner">
              <button
                type="button"
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                  isLogin
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                  !isLogin
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Cadastro
              </button>
            </div>
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 transition-all duration-500"
          >
            {!isLogin && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          {isLogin && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Esqueceu a senha?{' '}
              <button className="text-blue-600 font-medium hover:underline">
                Recuperar
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
