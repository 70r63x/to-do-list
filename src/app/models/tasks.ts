import { DBSchema } from 'idb';

/**
   * Interface de Tarea
   */
export interface Task {
  /**
   * Id de tarea
   */
  _id?: string,
  /**
   * Tabla de tareas API externa
   */
  id?: number;
  /**
   * Descripcion de tarea
   */
  content: string,
  /**
   * Titulo de tarea
   */
  title: string,
  /**
   * Fecha inicio tarea
   */
  dateini: string,
  /**
   * Fecha final tarea
   */
  datefin: string,
  /**
   * Verificador de tarea compelta o incompleta
   */
  isDone: boolean;
  /**
   * Verificador de sincronizacion de tarea con API externa
   */
  synced?: boolean;
}

/**
   * Interface de IndexDB
   */
export interface MyDB extends DBSchema {
  /**
   * Tabla de tareas en IndexDB
   */
  'taskStore': {
    key: string;
    value: Task;
  };
}