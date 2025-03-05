import { Component } from '@angular/core';
import { Task } from './models/tasks';
import { ApiClientService } from './services/api-client.service';
import { SyncService } from './services/sync.service';

/**
 * Main del proyecto componente
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * variable array, lista de tareas
   */
  public tasks: Task[] = [];

  /**
   * @ignore
   */
  constructor(private db: ApiClientService, private syncService: SyncService) {
  }
  
  /**
   * Eliminar tarea 
   * @param {Task} task lista de tareas
   */
  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(x => x._id !== task._id);
  }
  
  /**
   * Inicilizador 
   * Se obtienen todas la tareas disponibles y se habilita el evento online
   */
  ngOnInit(): void {
    this.db.getAll().then((tasks) => {
      this.tasks = tasks;
    });

    window.addEventListener('online', () => {
      console.log('Conexión recuperada, iniciando sincronización...');
      this.syncService.syncTasks();
    });
  }

}
