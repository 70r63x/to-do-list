import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiClientService } from '../../services/api-client.service';
import { Task } from '../../models/tasks';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  
  /**
   * variable stado del form
   */
  public status: string = 'success';
  
  /**
   * FormGrup de formualrio de tareas
   */
  public inputForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    dateini: new FormControl('', Validators.required),
    datefin: new FormControl('', Validators.required)
  });

  /**
   * variable array, lista de tareas compartido por componentes
   */
  @Input()
  tasks!: Task[];

  /**
   * @ignore
   */
  constructor(private db: ApiClientService, private syncService: SyncService) { }

  /**
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * OnSubmit para validar formulario y envio de datos
   * @param {Task} input datos del formulario ingresados
   */
  handleSubmit(input: Task): void {
    if (this.inputForm.invalid) {
      this.status = 'warning';
      return;
    }

    // Agregar la tarea en IndexedDB (marca synced = false automáticamente)
    this.db.addTask(input)
      .then((id: string) => {
        this.status = 'success';
        input._id = id;
        this.tasks.push(input);
        this.inputForm.reset();

        // Si está en línea, intenta sincronizar inmediatamente la tarea
        if (navigator.onLine) {
          console.log('En línea: sincronizando tarea de inmediato...');
          this.syncService.syncTasks();
        } else {
          console.log('Sin conexión: la tarea se sincronizará cuando se recupere la conexión.');
        }
      })
      .catch(err => {
        console.error('Error al agregar la tarea en IndexedDB:', err);
        this.status = 'error';
      });
  }
}
