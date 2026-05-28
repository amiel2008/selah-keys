export type EstadoAlumno = 'En Proceso' | 'Funcional' | 'Listo para Culto';

export interface EvaluacionCompetencias {
  tecnica: number;
  ritmo: number;
  cambioAcordes: number;
  manoIzquierda: number;
  inversiones: number;
  oidoMusical: number;
  transporte: number;
  acompanamientoCongregacional: number;
  trabajoBanda: number;
  responsabilidadMinisterial: number;
}

export interface Alumno {
  id: string;
  nombre: string;
  rango: string;
  rachaDias: number;
  xpAcumulada: number;
  progresoGeneral: number;
  estado: EstadoAlumno;
  retoActivo: string;
  bloqueoTecnico: string;
  proximaClaseRecomendada: string;
  evaluacion: EvaluacionCompetencias;
  evidenciaUrl?: string;
}

export interface Leccion {
  id: string;
  moduloId: string;
  titulo: string;
  objetivo: string;
  explicacionSimple: string;
  ejercicioPractico: string;
  aplicacionCancion: string;
  errorComun: string;
  comoCorregirlo: string;
  tareaCasa: string;
  criterioAvanzar: string;
}