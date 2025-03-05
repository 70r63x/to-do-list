import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

import { Task } from '../../models/tasks';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  /**
   * datos de tarea
   */
  @Input() taskItem?: Task;
  /**
   * Datos de tarea eliminada
   */
  @Output() delete: EventEmitter<Task> = new EventEmitter();

  /**
   * decorador de texto tarea
   */
  public decoration: string = 'none';
  
  /**
   * @ignore
   */
  constructor(private db: ApiClientService) { }

  /**
   * Eliminar tarea
   */
  deleteMe() {
    if (this.taskItem) {
      this.db.deleteTask(this.taskItem).then((oldTask) => {
        this.delete.emit(oldTask);
      }
      );
    }
  }
  
  /**
   * Verificar tarea completa
   * @param {boolean} isDone verdadero o falso para validar tarea completada
   */
  strike(isDone: boolean) {
    if (isDone) {
      this.decoration = "line-through";
    } else {
      this.decoration = "none";
    }

  }
  
  /**
   * Completar tarea
   */
  isChecked() {
    if (this.taskItem) {
      const newTask = Object.assign({}, this.taskItem);
      newTask.isDone = !this.taskItem.isDone;
      this.db.toggleTask(newTask).then((task) => {
        this.taskItem = task;
        this.strike(task.isDone);

      });
    }
  }
  
  /**
   * Inicializador para verificar tarea completada
   */
  ngOnInit(): void {
    if (this.taskItem) this.strike(this.taskItem.isDone);
  };

}
