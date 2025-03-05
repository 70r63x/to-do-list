import { Injectable } from '@angular/core';
import { Task, MyDB } from '../models/tasks';
import { openDB } from 'idb';

/**
   * conexion a IndexDB
   */
const db = openDB<MyDB>('my-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('taskStore',
      {
        keyPath: '_id',
        autoIncrement: true
      });

  },
});

/**
   * Servicio para gestionar conexion don IndexDB
   */
@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  
  /**
   * @ignore
   */
  constructor() { }
  
  /**
   * Servicio para obtener todas las tareas
   */
  getAll = async function () {
    const value = (await db).getAll('taskStore');
    return value;
  };
  
  /**
   * Servicio para agreagr tarea
   * @param {Task} task datos de tarea
   */
  addTask = async function (task: Task) {
    task.isDone = false;
    task.synced = false;
    const id = (await db).add('taskStore', task);
    return id;
  };
  
  /**
   * Servicio para eliminar tarea
   * @param {Task} task datos de tarea
   */
  deleteTask = async function (task: Task) {
    if (task._id) {
      (await db).delete('taskStore', task._id);
    }
    return task;
  };

  /**
   * Servicio para actualziar tarea completada
   * @param {Task} task datos de tarea
   */
  toggleTask = async function (task: Task) {
    (await db).put('taskStore', task);
    return task;
  };
  
  /**
   * Servicio para obtener tareas no sincronizadas
   */
  getUnsyncedTasks = async function (): Promise<Task[]> {
    const allTasks = await (await db).getAll('taskStore');
    return allTasks.filter(task => !task.synced);
  };
  
  /**
   * Servicio para actualziar tarea sincronizada online
   * @param {Task} task datos de tarea
   */
  updateTask = async function (task: Task) {
    await (await db).put('taskStore', task);
  };
}
