import { Alumno } from '@/types/ministerial';

export const mockAlumnos: Alumno[] = [
  {
    id: '1',
    nombre: 'Carlos Mendoza',
    rango: 'Aspirante de Altar',
    rachaDias: 12,
    xpAcumulada: 340,
    progresoGeneral: 65,
    estado: 'Funcional',
    retoActivo: 'Fluidez en el Colchón de Oración (Pads de fondo)',
    bloqueoTecnico: 'Mano izquierda muy pesada en octavas bajas, choca con el bajo eléctrico.',
    proximaClaseRecomendada: 'Inversiones abiertas para conducción de voces sin saltos.',
    evidenciaUrl: 'https://youtube.com/watch?v=demo1',
    evaluacion: {
      tecnica: 7,
      ritmo: 6,
      cambioAcordes: 8,
      manoIzquierda: 4,
      inversiones: 7,
      oidoMusical: 6,
      transporte: 5,
      acompanamientoCongregacional: 7,
      trabajoBanda: 5,
      responsabilidadMinisterial: 9
    }
  },
  {
    id: '2',
    nombre: 'Shoshanna Girón',
    rango: 'Pianista Principal',
    rachaDias: 28,
    xpAcumulada: 850,
    progresoGeneral: 92,
    estado: 'Listo para Culto',
    retoActivo: 'Modulación inmediata por transporte imprevisto del salmista',
    bloqueoTecnico: 'Ninguno detectado. Fluidez óptima.',
    proximaClaseRecomendada: 'Dinámicas avanzadas de dirección y señas visuales en vivo.',
    evidenciaUrl: 'https://drive.google.com/drive/demo2',
    evaluacion: {
      tecnica: 9,
      ritmo: 9,
      cambioAcordes: 9,
      manoIzquierda: 9,
      inversiones: 9,
      oidoMusical: 8,
      transporte: 8,
      acompanamientoCongregacional: 10,
      trabajoBanda: 9,
      responsabilidadMinisterial: 10
    }
  },
  {
    id: '3',
    nombre: 'Josué Tecún',
    rango: 'Principiante Ministerial',
    rachaDias: 3,
    xpAcumulada: 80,
    progresoGeneral: 20,
    estado: 'En Proceso',
    retoActivo: 'Sincronización de metrónomo a 4/4 en negras continuas',
    bloqueoTecnico: 'Pierde el pulso al cambiar del acorde I al IV de manera abrupta.',
    proximaClaseRecomendada: 'Disciplina de ensayo con metrónomo a 60 BPM.',
    evaluacion: {
      tecnica: 4,
      ritmo: 3,
      cambioAcordes: 4,
      manoIzquierda: 3,
      inversiones: 2,
      oidoMusical: 4,
      transporte: 1,
      acompanamientoCongregacional: 2,
      trabajoBanda: 3,
      responsabilidadMinisterial: 7
    }
  }
];