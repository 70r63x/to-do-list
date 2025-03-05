import { Component } from '@angular/core';
import { Task } from './models/tasks';
import { ApiClientService } from './services/api-client.service';
import { SyncService } from './services/sync.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To Do List';
  public tasks: Task[] = [];

  constructor(private db: ApiClientService, private syncService: SyncService) {

  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(x => x._id !== task._id);
  }

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
