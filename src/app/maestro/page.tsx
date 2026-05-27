"use client";

import Link from "next/link";
import { useState } from "react";

type NivelEstado = "completado" | "activo" | "bloqueado";

type Amigo = {
  id: string;
  nombre: string;
  retoActivo: string;
  fluidez: number;
  bloqueoCreativo: string;
  nivelActual: number;
};

type RetoCasa = {
  id: string;
  titulo: string;
  emoji: string;
  descripcion: string;
  duracion: string;
  dificultad: "Suave" | "Medio" | "Intenso";
  color: string;
};

const nivelesMetodo = [
  {
    nivel: 1,
    titulo: "El Mapa de las 88 Teclas",
    subtitulo: "Ubicarse sin partituras",
    descripcion:
      "Usa las teclas negras como brújula. Encuentra Do, Fa y Sol en cualquier octava antes de leer una sola nota.",
    emoji: "🗺️",
    estado: "completado" as NivelEstado,
  },
  {
    nivel: 2,
    titulo: "El Truco de los 4 Acordes Mágicos",
    subtitulo: "Do · Sol · Lam · Fa",
    descripcion:
      "Con cuatro acordes tocas el 80% de las canciones cristianas y pop. El objetivo: cambiar sin mirar las manos.",
    emoji: "✨",
    estado: "activo" as NivelEstado,
  },
  {
    nivel: 3,
    titulo: "Ritmo e Independencia",
    subtitulo: "Manos con personalidad propia",
    descripcion:
      "Ejercicios creativos para que la izquierda no copie a la derecha. Patrones de bajo + acordes en la mano derecha.",
    emoji: "🥁",
    estado: "bloqueado" as NivelEstado,
  },
  {
    nivel: 4,
    titulo: "Transporte Express",
    subtitulo: "Cambiar de tono sin colapsar",
    descripcion:
      "Usa el botón transpose o cambia mentalmente de tonalidad. Practica subir/bajar un semitono sin perder el groove.",
    emoji: "🚀",
    estado: "bloqueado" as NivelEstado,
  },
] as const;

const amigosIniciales: Amigo[] = [
  {
    id: "carlos",
    nombre: "Carlos",
    retoActivo: "Dominar el cambio de Do a Sol en 60 BPM",
    fluidez: 72,
    bloqueoCreativo:
      "Le cuesta independizar la mano izquierda cuando el bajo va en corcheas.",
    nivelActual: 2,
  },
  {
    id: "charly",
    nombre: "Charly",
    retoActivo: "Tocar Lam → Fa → Do sin pausa en el puente",
    fluidez: 45,
    bloqueoCreativo:
      "Pierde el ritmo cuando canta al mismo tiempo; necesita anclar el pulso con el pie.",
    nivelActual: 2,
  },
  {
    id: "shoshanna",
    nombre: "Shoshanna",
    retoActivo: "Ubicar Do en 3 octavas con los ojos cerrados",
    fluidez: 88,
    bloqueoCreativo:
      "Ya domina la ubicación; siguiente paso: acordes con inversiones suaves en el coro.",
    nivelActual: 1,
  },
];

const retosCasa: RetoCasa[] = [
  {
    id: "manos-libres",
    titulo: 'Desafío "Manos Libres"',
    emoji: "🙈",
    descripcion:
      "Tocar el círculo de Do Mayor con los ojos cerrados para ganar memoria muscular y confianza en el teclado.",
    duracion: "5 min/día",
    dificultad: "Suave",
    color: "from-emerald-500/20 to-teal-500/10 ring-emerald-400/25",
  },
  {
    id: "metronomo-humano",
    titulo: 'Desafío "Metrónomo Humano"',
    emoji: "🦶",
    descripcion:
      "Mantener el pulso de una canción usando solo el pie izquierdo mientras la mano derecha hace el acorde base.",
    duracion: "3 canciones",
    dificultad: "Medio",
    color: "from-sky-500/20 to-blue-500/10 ring-sky-400/25",
  },
  {
    id: "cambio-relampago",
    titulo: 'Desafío "Cambio Relámpago"',
    emoji: "⚡",
    descripcion:
      "Cambiar entre Do, Sol, Lam y Fa cada 4 compases con metrónomo a 70 BPM. Sin mirar las teclas.",
    duracion: "10 min",
    dificultad: "Intenso",
    color: "from-violet-500/20 to-fuchsia-500/10 ring-violet-400/25",
  },
  {
    id: "canto-piano",
    titulo: 'Desafío "Canto + Piano"',
    emoji: "🎤",
    descripcion:
      "Cantar una estrofa mientras la mano izquierda mantiene un patrón de bajo fijo. Ideal para quien pierde el ritmo al cantar.",
    duracion: "1 canción",
    dificultad: "Medio",
    color: "from-amber-500/20 to-orange-500/10 ring-amber-400/25",
  },
];

const estadoNivelStyles: Record<
  NivelEstado,
  { ring: string; badge: string; badgeText: string; dot: string }
> = {
  completado: {
    ring: "ring-emerald-400/40",
    badge: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
    badgeText: "Desbloqueado",
    dot: "bg-emerald-400",
  },
  activo: {
    ring: "ring-sky-400/50 shadow-[0_0_24px_rgba(56,189,248,0.15)]",
    badge: "bg-sky-500/15 text-sky-200 ring-sky-400/35",
    badgeText: "En curso",
    dot: "bg-sky-400 animate-pulse",
  },
  bloqueado: {
    ring: "ring-zinc-700/80",
    badge: "bg-zinc-800/80 text-zinc-500 ring-zinc-700/80",
    badgeText: "Próximamente",
    dot: "bg-zinc-600",
  },
};

function fluidezColor(pct: number) {
  if (pct >= 75) return "from-emerald-400 to-teal-400";
  if (pct >= 50) return "from-amber-400 to-orange-400";
  return "from-rose-400 to-pink-400";
}

function fluidezLabel(pct: number) {
  if (pct >= 75) return "Fluyendo";
  if (pct >= 50) return "En progreso";
  return "Construyendo base";
}

export default function MaestroPage() {
  const [amigos, setAmigos] = useState<Amigo[]>(amigosIniciales);
  const [retosAsignados, setRetosAsignados] = useState<string[]>([]);
  const [amigoSeleccionado, setAmigoSeleccionado] = useState<string>("carlos");

  const asignarReto = (retoId: string) => {
    setRetosAsignados((prev) =>
      prev.includes(retoId) ? prev : [...prev, retoId],
    );
  };

  const amigoActivo = amigos.find((a) => a.id === amigoSeleccionado);

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.1),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(167,139,250,0.08),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.06),transparent_35%)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:py-12">
        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3.5 py-1.5 text-sm text-zinc-500 transition hover:border-zinc-700 hover:text-zinc-200"
        >
          ← Volver al Inicio
        </Link>

        {/* Encabezado */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300/80">
              Método Selah Keys
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Panel del Maestro — Piano Creativo para Principiantes
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Enseña a tus amigos desde cero con un camino visual, retos
              divertidos y seguimiento gamificado. Sin abrumar con teoría: primero
              suena, luego se entiende.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm">
            <span className="text-lg">🎹</span>
            <span className="font-medium text-zinc-300">
              {amigos.length} amigos aprendiendo
            </span>
          </div>
        </header>

        {/* 1. Ruta de aprendizaje creativo */}
        <section className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-6">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-50">
                Ruta de Aprendizaje Creativo
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                El método paso a paso — desbloquea niveles como en un videojuego.
              </p>
            </div>
            <span className="w-fit rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200 ring-1 ring-violet-400/30">
              Nivel 2 activo con el grupo
            </span>
          </div>

          <div className="relative">
            <div
              className="absolute left-[1.125rem] top-8 hidden h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-emerald-500/60 via-sky-500/40 to-zinc-700/40 sm:block"
              aria-hidden
            />

            <ol className="flex flex-col gap-5 sm:gap-6">
              {nivelesMetodo.map((nivel) => {
                const styles = estadoNivelStyles[nivel.estado];
                const isLocked = nivel.estado === "bloqueado";

                return (
                  <li
                    key={nivel.nivel}
                    className={`group relative flex gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 ring-1 transition duration-300 sm:gap-5 sm:p-5 ${styles.ring} ${isLocked ? "opacity-70" : "hover:bg-zinc-900/50"}`}
                  >
                    <div className="relative z-10 flex shrink-0 flex-col items-center gap-2">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-zinc-950 sm:h-10 sm:w-10 ${nivel.estado === "completado" ? "bg-emerald-400" : nivel.estado === "activo" ? "bg-sky-400" : "bg-zinc-600"}`}
                      >
                        {nivel.estado === "completado" ? "✓" : nivel.nivel}
                      </div>
                      <span
                        className={`hidden h-2 w-2 rounded-full sm:block ${styles.dot}`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <span className="text-xl" aria-hidden>
                            {nivel.emoji}
                          </span>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                              Nivel {nivel.nivel}
                            </p>
                            <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">
                              {nivel.titulo}
                            </h3>
                            <p className="text-xs font-medium text-violet-300/90">
                              {nivel.subtitulo}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ${styles.badge}`}
                        >
                          {styles.badgeText}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {nivel.descripcion}
                      </p>
                      {nivel.estado === "activo" && (
                        <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-200 ring-1 ring-sky-400/20">
                          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                          Carlos y Charly están aquí ahora
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* 2. Panel de seguimiento gamificado */}
        <section className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
          <div className="border-b border-zinc-800/80 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-50">
                  Panel de Seguimiento de Amigos
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Retos activos, fluidez y bloqueos creativos — todo en un vistazo.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {amigos.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAmigoSeleccionado(a.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      amigoSeleccionado === a.id
                        ? "bg-violet-500/20 text-violet-100 ring-1 ring-violet-400/40"
                        : "bg-zinc-800/60 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {a.nombre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {amigoActivo && (
            <div className="border-b border-zinc-800/60 bg-gradient-to-r from-violet-500/5 to-transparent px-5 py-4 sm:px-6">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Vista rápida — {amigoActivo.nombre}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold tabular-nums text-zinc-50">
                    {amigoActivo.fluidez}%
                  </span>
                  <span className="text-xs text-zinc-500">fluidez</span>
                </div>
                <span className="rounded-full bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-400">
                  Nivel {amigoActivo.nivelActual} del método
                </span>
                <span
                  className={`text-xs font-medium ${amigoActivo.fluidez >= 75 ? "text-emerald-300" : amigoActivo.fluidez >= 50 ? "text-amber-300" : "text-rose-300"}`}
                >
                  {fluidezLabel(amigoActivo.fluidez)}
                </span>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800/90 bg-zinc-950/40">
                  <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                    Nombre del amigo
                  </th>
                  <th className="min-w-[220px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Reto activo
                  </th>
                  <th className="min-w-[160px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Barra de fluidez
                  </th>
                  <th className="min-w-[240px] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                    Bloqueo creativo actual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {amigos.map((amigo) => (
                  <tr
                    key={amigo.id}
                    onClick={() => setAmigoSeleccionado(amigo.id)}
                    className={`cursor-pointer align-top transition hover:bg-zinc-800/20 ${amigoSeleccionado === amigo.id ? "bg-violet-500/5" : ""}`}
                  >
                    <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-sm font-bold text-violet-100 ring-1 ring-violet-400/25">
                          {amigo.nombre.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-100">
                            {amigo.nombre}
                          </p>
                          <p className="text-xs text-zinc-500">
                            Nivel {amigo.nivelActual}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-lg bg-zinc-800/60 px-2.5 py-1.5 text-xs font-medium leading-snug text-zinc-300 ring-1 ring-zinc-700/80">
                        {amigo.retoActivo}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold tabular-nums text-zinc-300">
                            {amigo.fluidez}%
                          </span>
                          <span className="text-[10px] text-zinc-600">
                            {fluidezLabel(amigo.fluidez)}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${fluidezColor(amigo.fluidez)}`}
                            style={{ width: `${amigo.fluidez}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <textarea
                        value={amigo.bloqueoCreativo}
                        onChange={(e) => {
                          setAmigos((prev) =>
                            prev.map((a) =>
                              a.id === amigo.id
                                ? { ...a, bloqueoCreativo: e.target.value }
                                : a,
                            ),
                          );
                        }}
                        onClick={(e) => e.stopPropagation()}
                        rows={2}
                        className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs leading-relaxed text-zinc-300 outline-none transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/15"
                        placeholder="¿Qué le cuesta entender hoy?"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Generador de retos caseros */}
        <section className="rounded-2xl border border-zinc-800/90 bg-zinc-900/35 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-2 border-b border-zinc-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-50">
                Generador de Retos Caseros
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Creador de desafíos — asigna tareas divertidas con un clic.
              </p>
            </div>
            {amigoActivo && (
              <p className="text-xs text-zinc-500">
                Asignando a:{" "}
                <span className="font-semibold text-violet-200">
                  {amigoActivo.nombre}
                </span>
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {retosCasa.map((reto) => {
              const asignado = retosAsignados.includes(reto.id);
              return (
                <article
                  key={reto.id}
                  className={`group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-gradient-to-br ${reto.color} p-5 ring-1 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-3xl" aria-hidden>
                      {reto.emoji}
                    </span>
                    <span className="rounded-full bg-zinc-950/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                      {reto.dificultad}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-zinc-50">
                    {reto.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {reto.descripcion}
                  </p>
                  <p className="mt-3 text-xs text-zinc-500">
                    Duración sugerida: {reto.duracion}
                  </p>
                  <button
                    type="button"
                    onClick={() => asignarReto(reto.id)}
                    disabled={asignado}
                    className={`mt-4 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      asignado
                        ? "cursor-default bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30"
                        : "bg-zinc-100 text-zinc-950 hover:bg-white active:scale-[0.98]"
                    }`}
                  >
                    {asignado
                      ? `✓ Asignado a ${amigoActivo?.nombre ?? "amigo"}`
                      : `Asignar a ${amigoActivo?.nombre ?? "amigo"}`}
                  </button>
                </article>
              );
            })}
          </div>

          {retosAsignados.length > 0 && (
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/90">
                Retos asignados esta sesión
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {retosAsignados.map((id) => {
                  const r = retosCasa.find((x) => x.id === id);
                  return r ? (
                    <li
                      key={id}
                      className="rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700/80"
                    >
                      {r.emoji} {r.titulo}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
