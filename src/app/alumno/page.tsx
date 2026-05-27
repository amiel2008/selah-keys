"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const nivelActivo = {
  numero: 2,
  titulo: "El Truco de los 4 Acordes Mágicos",
  emoji: "✨",
};

const desafioSemana = {
  titulo: "Grande es tu fidelidad",
  tipo: "Canción de práctica",
  tonalidad: "Re Mayor (D)",
  retoMaestro: "Dominar el cambio de Do a Sol en 60 BPM",
  enfoqueTecnico:
    "Esta semana concéntrate en la fluidez al pasar de Do a Sol sin detener el ritmo. Mantén el pulso con el pie y no mires las manos en el cambio.",
  metaFluidez: 72,
  diasRestantes: 4,
};

const acordesGlosario = [
  {
    simbolo: "C",
    nombre: "Do Mayor",
    notas: "Do · Mi · Sol",
    dedos: "1 · 3 · 5",
    teclas: "Teclas blancas: Do, Mi, Sol",
    color: "border-emerald-400/30 bg-emerald-500/10",
  },
  {
    simbolo: "G",
    nombre: "Sol Mayor",
    notas: "Sol · Si · Re",
    dedos: "1 · 3 · 5",
    teclas: "Teclas blancas: Sol, Si, Re",
    color: "border-sky-400/30 bg-sky-500/10",
  },
  {
    simbolo: "Am",
    nombre: "La menor",
    notas: "La · Do · Mi",
    dedos: "1 · 2 · 5",
    teclas: "Teclas blancas: La, Do, Mi",
    color: "border-violet-400/30 bg-violet-500/10",
  },
  {
    simbolo: "F",
    nombre: "Fa Mayor",
    notas: "Fa · La · Do",
    dedos: "1 · 2 · 5",
    teclas: "Fa en negra + La y Do en blancas (mano izquierda)",
    color: "border-fuchsia-400/30 bg-fuchsia-500/10",
  },
] as const;

type NombreAcorde = (typeof acordesGlosario)[number]["nombre"];

const acordesTeclado: Record<NombreAcorde, readonly string[]> = {
  "Do Mayor": ["do", "mi", "sol"],
  "Sol Mayor": ["sol", "si", "re"],
  "La menor": ["la", "do", "mi"],
  "Fa Mayor": ["fa", "la", "do"],
};

const teclasBlancas = [
  { id: "do", label: "Do" },
  { id: "re", label: "Re" },
  { id: "mi", label: "Mi" },
  { id: "fa", label: "Fa" },
  { id: "sol", label: "Sol" },
  { id: "la", label: "La" },
  { id: "si", label: "Si" },
] as const;

const teclasNegras = [
  { id: "doS", label: "Do♯", offset: "left-[9%]" },
  { id: "reS", label: "Re♯", offset: "left-[23%]" },
  { id: "faS", label: "Fa♯", offset: "left-[51%]" },
  { id: "solS", label: "Sol♯", offset: "left-[65%]" },
  { id: "laS", label: "La♯", offset: "left-[79%]" },
] as const;

const recursosEstudio = [
  {
    id: "independencia",
    titulo: "Guía de Independencia de Manos (PDF)",
    descripcion:
      "Ejercicios rítmicos para separar la mano izquierda de la derecha.",
    formato: "PDF",
    accion: "Descargar",
  },
  {
    id: "cancionero",
    titulo: "El Cancionero de los 4 Acordes (PDF)",
    descripcion:
      "Repertorio inicial con cantos que usan la misma progresión.",
    formato: "PDF",
    accion: "Descargar",
  },
  {
    id: "ubicacion",
    titulo: "Método Expreso de Ubicación Visual",
    descripcion: "El truco de las teclas negras para ubicarte sin partituras.",
    formato: "Guía",
    accion: "Abrir Recurso",
  },
] as const;

const XP_ACTUAL = 450;
const XP_META = 600;
const XP_PORCENTAJE = Math.round((XP_ACTUAL / XP_META) * 100);

function StatsHeader() {
  return (
    <div className="sticky top-0 z-20 -mx-4 mb-2 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90 sm:-mx-6 sm:px-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-orange-500/25 bg-orange-500/10 px-4 py-3 transition-all duration-300 hover:scale-105">
          <span className="text-2xl animate-pulse" aria-hidden>
            🔥
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-300/80">
              Racha
            </p>
            <p className="text-sm font-bold text-orange-200">5 Días</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 transition-all duration-300 hover:scale-105">
          <span className="text-2xl" aria-hidden>
            🛡️
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-300/80">
              Rango
            </p>
            <p className="text-sm font-bold text-amber-200">Levita Aprendiz</p>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                ⚡
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300/80">
                XP
              </p>
            </div>
            <p className="text-xs font-bold tabular-nums text-emerald-200">
              {XP_ACTUAL} / {XP_META} XP
            </p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500"
              style={{ width: `${XP_PORCENTAJE}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AlumnoContent() {
  const searchParams = useSearchParams();
  const nombreUsuario =
    searchParams.get("user")?.trim() || "Músico";

  const [enlaceEvidencia, setEnlaceEvidencia] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [acordeTeclado, setAcordeTeclado] = useState<NombreAcorde | null>(
    "Do Mayor",
  );
  const [recursoAbierto, setRecursoAbierto] = useState<string | null>(null);

  const notasActivas = acordeTeclado ? acordesTeclado[acordeTeclado] : [];

  const toggleAcorde = (nombre: NombreAcorde) => {
    setAcordeTeclado((prev) => (prev === nombre ? null : nombre));
  };

  const abrirRecurso = (id: string) => {
    setRecursoAbierto(id);
  };

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ThemeToggle />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(167,139,250,0.06),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(56,189,248,0.05),transparent_38%)] dark:bg-[radial-gradient(circle_at_15%_0%,rgba(167,139,250,0.1),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(56,189,248,0.08),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.06),transparent_35%)]" />

      <main className="relative z-10 mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-12">
        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-sm text-slate-600 shadow-sm shadow-slate-200/40 transition-all duration-300 hover:scale-105 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-500 dark:shadow-none dark:hover:border-zinc-700 dark:hover:text-zinc-200"
        >
          ← Volver al Inicio
        </Link>

        <StatsHeader />

        {/* 1. Encabezado personalizado */}
        <header className="flex flex-col gap-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300/80">
              Selah Keys · Tu espacio
            </p>
            <h1 className="mt-2 text-balance bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl dark:from-zinc-50 dark:to-zinc-200">
              ¡Hola, {nombreUsuario}! ¿Listo para el reto de hoy?
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-zinc-400">
              Cada práctica te acerca al domingo. Enfócate en lo que tu maestro
              marcó — no en tocar perfecto, sino en mejorar un detalle a la vez.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 rounded-2xl border border-violet-500/25 bg-violet-500/10 px-4 py-3 ring-1 ring-violet-400/20 transition-all duration-300 hover:scale-105">
              <span className="text-2xl" aria-hidden>
                {nivelActivo.emoji}
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-300/80">
                  Nivel activo
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-zinc-50">
                  Nivel {nivelActivo.numero} — {nivelActivo.titulo}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-slate-200/80 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-zinc-800/80 dark:text-zinc-400">
              {desafioSemana.diasRestantes} días para la entrega
            </span>
          </div>
        </header>

        {/* 2. Mi desafío de la semana */}
        <section
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 backdrop-blur transition-all duration-300 hover:scale-[1.01] dark:border-zinc-800/90 dark:bg-gradient-to-br dark:from-zinc-900/80 dark:via-zinc-900/50 dark:to-violet-950/30 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.4)]"
          aria-labelledby="desafio-semana"
        >
          <div className="border-b border-slate-200/80 bg-slate-50/80 px-5 py-4 dark:border-zinc-800/80 dark:bg-zinc-950/30 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/90">
              Mi Desafío de la Semana
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-sky-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-200 ring-1 ring-sky-400/25">
                  {desafioSemana.tipo}
                </span>
                <h2
                  id="desafio-semana"
                  className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-zinc-50"
                >
                  {desafioSemana.titulo}
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                  Tonalidad:{" "}
                  <span className="font-medium text-slate-800 dark:text-zinc-200">
                    {desafioSemana.tonalidad}
                  </span>
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-center dark:border-zinc-800 dark:bg-zinc-950/50">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                  Meta de fluidez
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-300">
                  {desafioSemana.metaFluidez}%
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 ring-1 ring-amber-400/15">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-200/90">
                Reto asignado
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-zinc-200">
                {desafioSemana.retoMaestro}
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-violet-500/25 bg-violet-500/8 p-4">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm ring-1 ring-violet-400/30"
                  aria-hidden
                >
                  🎯
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-300/90">
                    Enfoque técnico (del maestro)
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-200">
                    {desafioSemana.enfoqueTecnico}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-zinc-500">
                    Esto es lo que debes corregir esta semana — léelo antes de
                    practicar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Glosario creativo */}
        <section
          lang="es"
          translate="no"
          className="notranslate rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-6"
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">
              Glosario Creativo
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-500">
              Los 4 acordes mágicos de tu reto — nomenclatura en español, sin
              buscar en otro lado.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {acordesGlosario.map((acorde) => (
              <article
                key={acorde.simbolo}
                translate="no"
                className={`notranslate rounded-xl border p-4 ring-1 ring-inset ${acorde.color}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl font-bold tabular-nums text-slate-900 dark:text-zinc-50">
                    {acorde.simbolo}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    {acorde.nombre}
                  </span>
                </div>

                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                  Notas del acorde
                </p>
                <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-zinc-100">
                  {acorde.notas}
                </p>

                <p className="mt-3 text-xs text-slate-500 dark:text-zinc-500">
                  Dedos (mano derecha):{" "}
                  <span className="font-medium text-slate-700 dark:text-zinc-300">
                    {acorde.dedos}
                  </span>
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-600">{acorde.teclas}</p>

                <div
                  className="mt-3 flex items-end justify-center gap-0.5 rounded-lg bg-slate-100 py-2 dark:bg-zinc-950/40"
                  aria-hidden
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((k) => (
                    <div
                      key={k}
                      className={`w-3 rounded-sm ${k === 1 || k === 3 || k === 5 ? "h-8 bg-zinc-100/90" : "h-5 bg-zinc-700/80"}`}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="notranslate mt-4 rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-2 text-center text-xs text-slate-600 dark:border-zinc-800/80 dark:bg-zinc-950/30 dark:text-zinc-500">
            Progresión sugerida:{" "}
            <span className="font-semibold text-slate-800 dark:text-zinc-300">
              Do Mayor → Sol Mayor → La menor → Fa Mayor
            </span>{" "}
            (C → G → Am → F) · repite en loop con metrónomo a 60 BPM
          </p>
        </section>

        {/* 4. Piano virtual de referencia */}
        <section
          lang="es"
          translate="no"
          className="notranslate rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-6"
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">
              🎹 Teclado de Referencia Rápida
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-500">
              Toca un acorde y observa qué teclas lo forman en el piano real.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(acordesTeclado) as NombreAcorde[]).map((nombre) => {
              const activo = acordeTeclado === nombre;
              return (
                <button
                  key={nombre}
                  type="button"
                  onClick={() => toggleAcorde(nombre)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    activo
                      ? "bg-sky-500/20 text-sky-700 ring-1 ring-sky-400/45 dark:text-sky-100"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-700/80 dark:bg-zinc-950/50 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
                  }`}
                >
                  {nombre}
                </button>
              );
            })}
          </div>

          {acordeTeclado && (
            <p className="mt-4 text-sm text-slate-600 dark:text-zinc-400">
              Acorde seleccionado:{" "}
              <span className="font-semibold text-emerald-300">
                {acordeTeclado}
              </span>{" "}
              — teclas resaltadas en verde.
            </p>
          )}

          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200/80 bg-slate-100 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <div className="relative mx-auto min-w-[280px] max-w-md">
              <div className="flex">
                {teclasBlancas.map((tecla) => {
                  const activa = notasActivas.includes(tecla.id);
                  return (
                    <div
                      key={tecla.id}
                      className={`relative flex h-36 flex-1 flex-col items-center justify-end border border-zinc-300/20 pb-2 transition duration-300 first:rounded-l-md last:rounded-r-md ${
                        activa
                          ? "bg-gradient-to-b from-emerald-300 to-emerald-500 shadow-[inset_0_-4px_12px_rgba(16,185,129,0.4)]"
                          : "bg-gradient-to-b from-zinc-100 to-zinc-300"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold ${activa ? "text-emerald-950" : "text-zinc-600"}`}
                      >
                        {tecla.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {teclasNegras.map((tecla) => {
                const activa = notasActivas.includes(tecla.id);
                return (
                  <div
                    key={tecla.id}
                    className={`absolute top-0 z-10 flex h-24 w-[12%] -translate-x-1/2 items-end justify-center rounded-b-md border border-zinc-900/40 pb-1.5 transition duration-300 ${tecla.offset} ${
                      activa
                        ? "bg-gradient-to-b from-sky-400 to-sky-600 shadow-[0_4px_12px_rgba(56,189,248,0.35)]"
                        : "bg-gradient-to-b from-zinc-800 to-zinc-950"
                    }`}
                  >
                    <span
                      className={`text-[8px] font-semibold ${activa ? "text-sky-50" : "text-zinc-500"}`}
                    >
                      {tecla.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Biblioteca de recursos */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-zinc-800/90 dark:bg-zinc-900/35 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">
              📚 Material de Apoyo y Libros
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-500">
              Recursos digitales para reforzar lo que practicas en clase.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recursosEstudio.map((recurso) => (
              <article
                key={recurso.id}
                className="flex flex-col rounded-xl border border-slate-200/80 bg-slate-50 p-4 transition-all duration-300 hover:scale-105 hover:border-slate-300 hover:bg-white dark:border-zinc-800/90 dark:bg-zinc-950/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-950/60"
              >
                <span className="w-fit rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-zinc-800/80 dark:text-zinc-400">
                  {recurso.formato}
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-slate-900 dark:text-zinc-50">
                  {recurso.titulo}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-zinc-500">
                  {recurso.descripcion}
                </p>
                <button
                  type="button"
                  onClick={() => abrirRecurso(recurso.id)}
                  className="mt-4 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  {recurso.accion}
                </button>
              </article>
            ))}
          </div>

          {recursoAbierto && (
            <p
              className="mt-4 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-3 text-sm text-sky-200"
              role="status"
            >
              Recurso preparado (demo):{" "}
              <span className="font-semibold">
                {recursosEstudio.find((r) => r.id === recursoAbierto)?.titulo}
              </span>{" "}
              estará disponible para descarga cuando se conecte el almacenamiento
              de archivos.
            </p>
          )}
        </section>

        {/* 6. Zona de entrega */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-zinc-800/90 dark:bg-zinc-900/35 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-6">
          <div className="border-b border-slate-200/80 pb-4 dark:border-zinc-800/80">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">
              Subir mi Progreso
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-500">
              Graba tu práctica (video o audio) y comparte el enlace para recibir
              feedback de tu maestro.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="enlace-evidencia"
                className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500"
              >
                Enlace de video o audio
              </label>
              <input
                id="enlace-evidencia"
                type="url"
                value={enlaceEvidencia}
                onChange={(e) => {
                  setEnviado(false);
                  setEnlaceEvidencia(e.target.value);
                }}
                placeholder="https://drive.google.com/... o enlace de YouTube / Dropbox"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500/45 focus:ring-2 focus:ring-emerald-500/15 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-300/80 bg-slate-50 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-zinc-700/80 dark:bg-zinc-950/25">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                  ¿Primera vez subiendo?
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  No tiene que ser perfecto. 2–3 minutos de tu reto activo son
                  suficientes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnviado(true)}
                disabled={!enlaceEvidencia.trim()}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                Enviar al Maestro para Feedback
              </button>
            </div>

            {enviado && (
              <p
                className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200"
                role="status"
              >
                ¡Listo! Tu enlace quedó preparado para envío. Tu maestro podrá
                escucharlo y dejarte comentarios en su panel.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function AlumnoPageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-slate-600 dark:bg-zinc-950 dark:text-zinc-400">
      <p className="animate-pulse text-sm">Cargando tu espacio...</p>
    </div>
  );
}

export default function AlumnoPage() {
  return (
    <Suspense fallback={<AlumnoPageFallback />}>
      <AlumnoContent />
    </Suspense>
  );
}
