'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Logo from '@/assets/logo.png';

export default function SplashScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Aguarda 3 segundos e redireciona
    const timer = setTimeout(() => {
      setVisible(false);
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {visible && (
        <div className="flex flex-col items-center justify-center animate-blink">
          <Image
            src={Logo} // coloque sua logo na pasta public/
            alt="Logo"
            width={150}
            height={150}
            className="animate-blink"
          />
          <h1 className="mt-4 text-2xl font-bold text-blue-500">
            LangBuddy
          </h1>
        </div>
      )}

      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
