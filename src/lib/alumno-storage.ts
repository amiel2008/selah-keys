export type HaTocadoPiano = "si" | "no";
export type TiempoTocando = "menos_mes" | "unos_meses" | "mas_anio";
export type NivelAutopercepcion = "principiante" | "intermedio" | "avanzado";
export type MotivoPiano = "iglesia" | "hobby" | "otro";

export interface CuestionarioInicial {
  haTocadoPiano: HaTocadoPiano;
  tiempoTocando: TiempoTocando;
  nivelAutopercepcion: NivelAutopercepcion;
  motivo: MotivoPiano;
  motivoOtroTexto?: string;
}

export interface DesafioSemana {
  titulo: string;
  tipo: string;
  tonalidad: string;
  retoMaestro: string;
  enfoqueTecnico: string;
  fluidez: number;
  diasRestantes: number;
}

export interface PerfilAlumno {
  usernameKey: string;
  nombreMostrar: string;
  pin: string;
  cuestionarioCompletado: boolean;
  cuestionario?: CuestionarioInicial;
  nivelNumero: number;
  nivelTitulo: string;
  nivelEmoji: string;
  rango: string;
  xp: number;
  xpMeta: number;
  rachaDias: number;
  ultimoAcceso: string;
  acordesExplorados: string[];
  recursosAbiertos: string[];
  evidenciaEnviada: boolean;
  enlaceEvidencia?: string;
  desafio: DesafioSemana;
  creadoEn: string;
}

const USERS_KEY = "selah-keys-users";
const SESSION_KEY = "selah-keys-session";

const NIVELES = [
  {
    numero: 1,
    titulo: "El Mapa de las 88 Teclas",
    emoji: "🗺️",
    rango: "Explorador del Teclado",
  },
  {
    numero: 2,
    titulo: "El Truco de los 4 Acordes Mágicos",
    emoji: "✨",
    rango: "Levita Aprendiz",
  },
  {
    numero: 3,
    titulo: "Ritmo e Independencia",
    emoji: "🥁",
    rango: "Músico en Formación",
  },
  {
    numero: 4,
    titulo: "Transporte Express",
    emoji: "🚀",
    rango: "Tecladista del Ministerio",
  },
] as const;

const DESAFIOS_POR_NIVEL: Record<number, Omit<DesafioSemana, "fluidez">> = {
  1: {
    titulo: "Ubicación en el teclado",
    tipo: "Ejercicio de ubicación",
    tonalidad: "Do central",
    retoMaestro: "Encuentra Do en 3 octavas con los ojos cerrados",
    enfoqueTecnico:
      "Usa las teclas negras como brújula. No mires el teclado: localiza Do, luego Re y Mi en la misma octava.",
    diasRestantes: 7,
  },
  2: {
    titulo: "Grande es tu fidelidad",
    tipo: "Canción de práctica",
    tonalidad: "Re Mayor (D)",
    retoMaestro: "Dominar el cambio de Do a Sol en 60 BPM",
    enfoqueTecnico:
      "Concéntrate en la fluidez al pasar de Do a Sol sin detener el ritmo. Mantén el pulso con el pie.",
    diasRestantes: 7,
  },
  3: {
    titulo: "Patrón de bajo independiente",
    tipo: "Ejercicio rítmico",
    tonalidad: "La menor (Am)",
    retoMaestro: "Mano izquierda en corcheas sin copiar la derecha",
    enfoqueTecnico:
      "La izquierda marca el pulso en negras o corcheas mientras la derecha sostiene el acorde del coro.",
    diasRestantes: 7,
  },
  4: {
    titulo: "Hay libertad (transporte)",
    tipo: "Canción con cambio de tono",
    tonalidad: "La Mayor (A) → Si bemol",
    retoMaestro: "Subir un semitono con transpose sin perder el groove",
    enfoqueTecnico:
      "Practica el estribillo en tonalidad original y luego sube un semitono usando transpose o mentalmente.",
    diasRestantes: 7,
  },
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function normalizarUsername(nombre: string) {
  return nombre.trim().toLowerCase();
}

function leerUsuarios(): Record<string, PerfilAlumno> {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, PerfilAlumno>) : {};
  } catch {
    return {};
  }
}

function guardarUsuarios(usuarios: Record<string, PerfilAlumno>) {
  if (!isBrowser()) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
}

export function usuarioExiste(nombre: string) {
  const key = normalizarUsername(nombre);
  return Boolean(leerUsuarios()[key]);
}

export function obtenerUsuario(nombre: string): PerfilAlumno | null {
  const key = normalizarUsername(nombre);
  return leerUsuarios()[key] ?? null;
}

export function guardarUsuario(usuario: PerfilAlumno) {
  const usuarios = leerUsuarios();
  usuarios[usuario.usernameKey] = usuario;
  guardarUsuarios(usuarios);
}

export function setSesionActiva(usernameKey: string) {
  if (!isBrowser()) return;
  localStorage.setItem(SESSION_KEY, usernameKey);
}

export function getSesionActiva(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(SESSION_KEY);
}

export function clearSesion() {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}

export function obtenerUsuarioActivo(): PerfilAlumno | null {
  const key = getSesionActiva();
  if (!key) return null;
  return leerUsuarios()[key] ?? null;
}

function crearDesafioInicial(nivelNumero: number): DesafioSemana {
  const base = DESAFIOS_POR_NIVEL[nivelNumero] ?? DESAFIOS_POR_NIVEL[1];
  return { ...base, fluidez: 0 };
}

export function calcularNivelInicial(c: CuestionarioInicial) {
  let puntaje = 0;
  if (c.haTocadoPiano === "si") puntaje += 1;
  if (c.tiempoTocando === "unos_meses") puntaje += 2;
  if (c.tiempoTocando === "mas_anio") puntaje += 3;
  if (c.nivelAutopercepcion === "intermedio") puntaje += 2;
  if (c.nivelAutopercepcion === "avanzado") puntaje += 4;

  let indice = 0;
  if (puntaje >= 7) indice = 3;
  else if (puntaje >= 4) indice = 2;
  else if (puntaje >= 2) indice = 1;

  return NIVELES[indice];
}

export function calcularRangoPorXp(xp: number, nivelNumero: number) {
  const base = NIVELES.find((n) => n.numero === nivelNumero)?.rango ?? "Levita Aprendiz";
  if (xp >= 500) return "Guardián del Coro";
  if (xp >= 250) return "Tecladista del Ministerio";
  if (xp >= 100) return "Músico en Formación";
  return base;
}

function actualizarRacha(usuario: PerfilAlumno): PerfilAlumno {
  const hoy = new Date().toISOString().slice(0, 10);
  const ultimo = usuario.ultimoAcceso.slice(0, 10);

  if (ultimo === hoy) {
    return { ...usuario, ultimoAcceso: new Date().toISOString() };
  }

  const diffMs =
    new Date(hoy).getTime() - new Date(ultimo).getTime();
  const diffDias = Math.round(diffMs / 86_400_000);

  const rachaDias =
    diffDias === 1 ? usuario.rachaDias + 1 : diffDias > 1 ? 1 : usuario.rachaDias;

  return {
    ...usuario,
    rachaDias: ultimo ? rachaDias : 1,
    ultimoAcceso: new Date().toISOString(),
  };
}

export function registrarUsuarioNuevo(
  nombre: string,
  pin: string,
): PerfilAlumno {
  const usernameKey = normalizarUsername(nombre);
  const usuario: PerfilAlumno = {
    usernameKey,
    nombreMostrar: nombre.trim(),
    pin,
    cuestionarioCompletado: false,
    nivelNumero: 1,
    nivelTitulo: NIVELES[0].titulo,
    nivelEmoji: NIVELES[0].emoji,
    rango: NIVELES[0].rango,
    xp: 0,
    xpMeta: 100,
    rachaDias: 1,
    ultimoAcceso: new Date().toISOString(),
    acordesExplorados: [],
    recursosAbiertos: [],
    evidenciaEnviada: false,
    desafio: crearDesafioInicial(1),
    creadoEn: new Date().toISOString(),
  };
  guardarUsuario(usuario);
  setSesionActiva(usernameKey);
  return usuario;
}

export function verificarPin(nombre: string, pin: string): boolean {
  const usuario = obtenerUsuario(nombre);
  return usuario?.pin === pin;
}

export function iniciarSesion(nombre: string, pin: string): PerfilAlumno | null {
  const usuario = obtenerUsuario(nombre);
  if (!usuario || usuario.pin !== pin) return null;

  const actualizado = actualizarRacha(usuario);
  guardarUsuario(actualizado);
  setSesionActiva(actualizado.usernameKey);
  return actualizado;
}

export function completarCuestionario(
  usernameKey: string,
  cuestionario: CuestionarioInicial,
): PerfilAlumno | null {
  const usuario = leerUsuarios()[usernameKey];
  if (!usuario) return null;

  const nivel = calcularNivelInicial(cuestionario);
  const actualizado: PerfilAlumno = {
    ...usuario,
    cuestionario,
    cuestionarioCompletado: true,
    nivelNumero: nivel.numero,
    nivelTitulo: nivel.titulo,
    nivelEmoji: nivel.emoji,
    rango: nivel.rango,
    xpMeta: nivel.numero * 150,
    desafio: crearDesafioInicial(nivel.numero),
    ultimoAcceso: new Date().toISOString(),
  };
  guardarUsuario(actualizado);
  return actualizado;
}

const XP_ACORDE = 15;
const XP_RECURSO = 20;
const XP_EVIDENCIA = 80;
const XP_FLUIDEZ_POR_ACORDE = 5;

export function registrarAcordeExplorado(
  usuario: PerfilAlumno,
  acorde: string,
): PerfilAlumno {
  if (usuario.acordesExplorados.includes(acorde)) {
    return usuario;
  }

  const acordesExplorados = [...usuario.acordesExplorados, acorde];
  const fluidez = Math.min(100, usuario.desafio.fluidez + 8);
  const xp = usuario.xp + XP_ACORDE;

  const actualizado: PerfilAlumno = {
    ...usuario,
    acordesExplorados,
    xp,
    rango: calcularRangoPorXp(xp, usuario.nivelNumero),
    desafio: { ...usuario.desafio, fluidez },
  };
  guardarUsuario(actualizado);
  return actualizado;
}

export function registrarRecursoAbierto(
  usuario: PerfilAlumno,
  recursoId: string,
): PerfilAlumno {
  if (usuario.recursosAbiertos.includes(recursoId)) {
    return usuario;
  }

  const xp = usuario.xp + XP_RECURSO;
  const actualizado: PerfilAlumno = {
    ...usuario,
    recursosAbiertos: [...usuario.recursosAbiertos, recursoId],
    xp,
    rango: calcularRangoPorXp(xp, usuario.nivelNumero),
  };
  guardarUsuario(actualizado);
  return actualizado;
}

export function registrarEvidenciaEnviada(
  usuario: PerfilAlumno,
  enlace: string,
): PerfilAlumno {
  const xp = usuario.evidenciaEnviada ? usuario.xp : usuario.xp + XP_EVIDENCIA;
  const fluidez = Math.min(100, usuario.desafio.fluidez + 15);

  const actualizado: PerfilAlumno = {
    ...usuario,
    evidenciaEnviada: true,
    enlaceEvidencia: enlace,
    xp,
    rango: calcularRangoPorXp(xp, usuario.nivelNumero),
    desafio: { ...usuario.desafio, fluidez },
  };
  guardarUsuario(actualizado);
  return actualizado;
}

export function registrarPracticaAcorde(
  usuario: PerfilAlumno,
): PerfilAlumno {
  const fluidez = Math.min(100, usuario.desafio.fluidez + XP_FLUIDEZ_POR_ACORDE);
  const xp = usuario.xp + 5;
  const actualizado: PerfilAlumno = {
    ...usuario,
    xp,
    rango: calcularRangoPorXp(xp, usuario.nivelNumero),
    desafio: { ...usuario.desafio, fluidez },
  };
  guardarUsuario(actualizado);
  return actualizado;
}

export function xpPorcentaje(usuario: PerfilAlumno) {
  return Math.min(100, Math.round((usuario.xp / usuario.xpMeta) * 100));
}
