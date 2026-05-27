"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  type CuestionarioInicial,
  type HaTocadoPiano,
  type MotivoPiano,
  type NivelAutopercepcion,
  type TiempoTocando,
  completarCuestionario,
  getSesionActiva,
  obtenerUsuario,
} from "@/lib/alumno-storage";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-all duration-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:focus:border-violet-500/50";

const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500";

const optionClass = (selected: boolean) =>
  `cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
    selected
      ? "border-violet-400/60 bg-violet-500/10 text-violet-800 ring-1 ring-violet-400/40 dark:text-violet-100"
      : "border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400 dark:hover:border-zinc-700"
  }`;

export default function CuestionarioPage() {
  const router = useRouter();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [haTocado, setHaTocado] = useState<HaTocadoPiano | "">("");
  const [tiempo, setTiempo] = useState<TiempoTocando | "">("");
  const [nivel, setNivel] = useState<NivelAutopercepcion | "">("");
  const [motivo, setMotivo] = useState<MotivoPiano | "">("");
  const [motivoOtro, setMotivoOtro] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const key = getSesionActiva();
    if (!key) {
      router.replace("/");
      return;
    }
    const usuario = obtenerUsuario(key);
    if (!usuario) {
      router.replace("/");
      return;
    }
    if (usuario.cuestionarioCompletado) {
      router.replace("/alumno");
      return;
    }
    setNombreUsuario(usuario.nombreMostrar);
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!haTocado || !tiempo || !nivel || !motivo) {
      setError("Responde todas las preguntas obligatorias.");
      return;
    }
    if (motivo === "otro" && !motivoOtro.trim()) {
      setError("Especifica tu motivo en el campo de texto.");
      return;
    }

    const key = getSesionActiva();
    if (!key) {
      router.replace("/");
      return;
    }

    const cuestionario: CuestionarioInicial = {
      haTocadoPiano: haTocado,
      tiempoTocando: tiempo,
      nivelAutopercepcion: nivel,
      motivo,
      ...(motivo === "otro" ? { motivoOtroTexto: motivoOtro.trim() } : {}),
    };

    const actualizado = completarCuestionario(key, cuestionario);
    if (!actualizado) {
      setError("No se pudo guardar tu perfil. Intenta de nuevo.");
      return;
    }
    router.push("/alumno");
  };

  if (!nombreUsuario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="animate-pulse text-sm text-slate-500">Cargando cuestionario...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-50 px-4 py-12 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ThemeToggle />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.08),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15),_transparent_40%)]" />

      <main className="relative z-10 mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300/80">
            Selah Keys · Perfil inicial
          </p>
          <h1 className="mt-2 bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-3xl font-bold text-transparent dark:from-zinc-50 dark:to-zinc-200">
            Cuestionario Inicial
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            Hola, <span className="font-semibold text-violet-700 dark:text-violet-200">{nombreUsuario}</span>.
            Con esto asignamos tu nivel de partida en el método.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-black/30 sm:p-8"
        >
          <fieldset className="space-y-3">
            <legend className={labelClass}>
              ¿Has tocado alguna vez el piano?
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {(["si", "no"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setHaTocado(v)}
                  className={optionClass(haTocado === v)}
                >
                  {v === "si" ? "Sí" : "No"}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className={labelClass}>
              ¿Cuánto tiempo llevas tocando?
            </legend>
            <div className="grid gap-2">
              {(
                [
                  ["menos_mes", "Menos de un mes"],
                  ["unos_meses", "Unos meses"],
                  ["mas_anio", "Más de un año"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setTiempo(v)}
                  className={optionClass(tiempo === v)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className={labelClass}>
              ¿En qué nivel te consideras?
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["principiante", "Principiante"],
                  ["intermedio", "Intermedio"],
                  ["avanzado", "Avanzado"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setNivel(v)}
                  className={optionClass(nivel === v)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className={labelClass}>¿Para qué tocas el piano?</legend>
            <div className="grid gap-2">
              {(
                [
                  ["iglesia", "Para la iglesia"],
                  ["hobby", "Hobby"],
                  ["otro", "Otro"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMotivo(v)}
                  className={optionClass(motivo === v)}
                >
                  {label}
                </button>
              ))}
            </div>
            {motivo === "otro" && (
              <input
                type="text"
                value={motivoOtro}
                onChange={(e) => setMotivoOtro(e.target.value)}
                placeholder="Cuéntanos tu motivo..."
                className={inputClass}
              />
            )}
          </fieldset>

          {error && (
            <p
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-105"
          >
            Enviar y comenzar mi ruta
          </button>
        </form>
      </main>
    </div>
  );
}
