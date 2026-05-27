/** Rol de acceso en la aplicación. */
export type RolUsuario = "maestro" | "alumno";

/** Usuario autenticado (maestro o alumno). */
export interface Usuario {
  id: string;
  email: string;
  nombreCompleto: string;
  rol: RolUsuario;
  /** Fecha ISO 8601 de creación del registro. */
  creadoEn: string;
}

/** Alumno vinculado a un maestro y a su cuenta de usuario. */
export interface Alumno {
  id: string;
  usuarioId: string;
  maestroId: string;
  /** Fecha ISO 8601 en que el alumno quedó asociado al maestro. */
  fechaInscripcion: string;
  instrumentoPrincipal?: string;
}

/** Canción con notación cifrada (acordes). */
export interface CancionCifrada {
  id: string;
  titulo: string;
  interprete?: string;
  tonalidad?: string;
  /** Texto con acordes (cifrado) o referencia al recurso almacenado. */
  contenidoCifrado: string;
  maestroId: string;
  /** Fecha ISO 8601 de última actualización o creación. */
  actualizadoEn: string;
}

export type EstadoTarea = "pendiente" | "en_progreso" | "completada";

/** Tarea de estudio/práctica asignada por el maestro a un alumno. */
export interface TareaAsignada {
  id: string;
  alumnoId: string;
  cancionCifradaId: string;
  maestroId: string;
  estado: EstadoTarea;
  /** Fecha ISO 8601 de asignación. */
  asignadaEn: string;
  /** Fecha ISO 8601 límite opcional. */
  fechaLimite?: string;
  notas?: string;
}
