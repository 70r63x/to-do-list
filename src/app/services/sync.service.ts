import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClientService } from './api-client.service';
import { Task } from '../models/tasks';
import { environment } from '../../environments/environment';

/**
   * Servicio para gestionar conexion API externa
   */
@Injectable({
  providedIn: 'root'
})
export class SyncService {
  /**
   * Variable de api servidor
   */
  private apiUrl = environment.api+"/todos";
  
  /**
   * @ignore
   */
  constructor(private http: HttpClient, private apiClient: ApiClientService) {}
  
  /**
   * Servicio de validacion y verificacion para sincronizar tareas online
   */
  syncTasks(): void {
    this.apiClient.getUnsyncedTasks().then((tasks: Task[]) => {
      tasks.forEach(task => {
        if (task.id) {
          // Si la tarea ya tiene ID, se trata de una actualización
          this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).subscribe({
            next: response => {
              task.synced = true;
              this.apiClient.updateTask(task);
              console.log(`Tarea actualizada en el servidor: ${task.id}`);
            },
            error: err => console.error('Error al actualizar tarea:', err)
          });
        } else {
          // Si no tiene ID, se crea en el servidor
          this.http.post<Task>(this.apiUrl, task).subscribe({
            next: response => {
              // Asigna el ID del servidor y marca la tarea como sincronizada
              task.id = response.id;
              task.synced = true;
              this.apiClient.updateTask(task);
              console.log(`Tarea creada en el servidor con id: ${response.id}`);
            },
            error: err => console.error('Error al crear tarea:', err)
          });
        }
      });
    }).catch(err => console.error('Error al obtener tareas sin sincronizar:', err));
  }
}
