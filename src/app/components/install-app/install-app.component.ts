import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app.component.html',
  styleUrls: ['./install-app.component.css']
})
export class InstallAppComponent implements OnInit {
  
  /**
   * variable para prompt de instalar app
   */
  deferredPrompt: any;

  /**
   * @ignore
   */
  constructor() { }
  
  /**
   * @ignore
   */
  ngOnInit(): void {
  }
  
  /**
   * Hotlistener para verificar instlacion de app pwa
   */
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    // Prevenir el prompt automático y guardar el evento para usarlo más tarde
    event.preventDefault();
    this.deferredPrompt = event;
    console.log('Evento beforeinstallprompt capturado');
  }
  
  /**
   * Se instala la app pwa por medio del prompt
   */
  installPWA() {
    if (this.deferredPrompt) {
      // Mostrar el prompt al usuario
      this.deferredPrompt.prompt();
      // Esperar la respuesta del usuario
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó la instalación');
        } else {
          console.log('El usuario rechazó la instalación');
        }
        // Limpiar la referencia del prompt
        this.deferredPrompt = null;
      });
    }
  }

}
