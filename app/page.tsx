import Image from "next/image";
import Logo from "@/assets/logoBranco.png";
import Link from "next/link";

import BannerLp from "@/assets/banner-lp.png";
import bannerHero from "@/assets/banner-hero.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      {/* HERO */}
      <section className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white  flex flex-col items-center">
        <Image
          src={bannerHero}
          alt="Ilustração"
          className="drop-shadow-2xl"
        />

      </section>

      <div className="mt-20 mb-10 text-center">
        <Link
          href="/login"
          className="bg-blue-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl hover:bg-blue-100 transition text-lg"
        >
          Criar minha conta gratuita
        </Link>
        <p className="mt-6 text-sm opacity-80">Leva menos de 1 minuto</p>
      </div>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Conversas Reais",
              desc: "Pratique com pessoas de verdade, não com frases prontas.",
              icon: "🌍",
            },
            {
              title: "Aprimore Seu Vocabulário",
              desc: "Cada conversa expande seu domínio do idioma.",
              icon: "📚",
            },
            {
              title: "Match Inteligente",
              desc: "Conectamos você com pessoas que querem aprender seu idioma também.",
              icon: "🤝",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Image
            src={BannerLp}
            alt="Sobre"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-bold mb-6">Aprender nunca foi tão natural</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O LangBuddy funciona como uma ponte entre pessoas de diferentes países
              que querem evoluir no idioma através de conversas reais.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nossa plataforma usa IA para sugerir conexões que fazem sentido e
              ajudar você a melhorar sua pronúncia, escrita e compreensão.
            </p>
            <Link
              href="/cadastro"
              className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-700 text-white text-center px-6">
        <h2 className="text-4xl font-extrabold mb-4">
          Comece a aprender de verdade conversando
        </h2>
        <p className="opacity-90 mb-10 max-w-2xl mx-auto text-lg">
          Conecte-se com pessoas reais, pratique no seu ritmo e evolua naturalmente.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/login"
            className="bg-white text-blue-700 px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:bg-gray-100 transition"
          >
            Criar conta gratuita
          </Link>

          <Link
            href="/login"
            className="text-white underline underline-offset-4 hover:text-blue-200 transition"
          >
            Já tenho uma conta
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} LangBuddy · Conectando pessoas e idiomas.
      </footer>
    </div>
  );
}
