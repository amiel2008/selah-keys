"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) return;
    router.push(`/alumno?user=${encodeURIComponent(nombreLimpio)}`);
  };

  return (
    <div className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-zinc-50 px-6 py-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ThemeToggle />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.1),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.18),_transparent_40%)]" />

      <main className="relative z-10 flex w-full max-w-lg flex-col items-center gap-10">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-zinc-400">
            Bienvenido
          </p>
          <h1 className="bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-balance text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl dark:from-zinc-50 dark:to-zinc-200">
            Selah Keys: Escuela de Piano para Ministerios de Alabanza
          </h1>
          <p className="mx-auto max-w-md text-pretty text-sm text-slate-600 sm:text-base dark:text-zinc-300">
            Ingresa tu nombre para acceder a tu ruta de aprendizaje gamificada y
            retos semanales del ministerio.
          </p>
        </header>

        <section className="w-full rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 backdrop-blur transition-all duration-300 hover:border-fuchsia-300/60 dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.35)] dark:hover:border-fuchsia-400/30">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="nombre-usuario"
                className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500"
              >
                Nombre de usuario
              </label>
              <input
                id="nombre-usuario"
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Ej. Carlos, Shoshanna..."
                autoComplete="username"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/15 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-fuchsia-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={!nombre.trim()}
              className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-all duration-300 hover:scale-105 hover:from-fuchsia-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              Entrar al Ministerio
            </button>
          </form>
        </section>

        <p className="text-center text-xs text-slate-500 dark:text-zinc-600">
          ¿Eres maestro?{" "}
          <Link
            href="/maestro"
            className="font-medium text-slate-600 transition-all duration-300 hover:scale-105 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-300"
          >
            Ir al Panel del Maestro →
          </Link>
        </p>
      </main>
    </div>
  );
}
