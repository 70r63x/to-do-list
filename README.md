# To Do List PWA

Esta es una aplicación de lista de tareas desarrollada como una Progressive Web App (PWA) utilizando Angular 13. El proyecto sigue el principio **Offline-First**, permitiendo al usuario gestionar tareas (crear, actualizar, eliminar) sin conexión y sincronizar los cambios con una API externa cuando se recupere la conectividad.

## Propósito del Desarrollo

El objetivo de este proyecto es demostrar la capacidad de:
- Implementar una PWA usando Angular y su Service Worker nativo.
- Gestionar datos sin conexión mediante IndexedDB con la biblioteca _idb_.
- Sincronizar datos con una API externa (simulada con JSONPlaceholder) al detectar la reconexión.
- Ofrecer una experiencia de instalación personalizada mediante el manejo del evento `beforeinstallprompt`.
- Aplicar buenas prácticas en arquitectura, rendimiento y experiencia de usuario.

## Arquitectura y Diseño

La solución se compone de los siguientes componentes y servicios:

- **Angular App (PWA):**
  - Contiene los componentes principales, como el formulario de tareas (`TaskFormComponent`), la lista de tareas y el componente de instalación (`app-install`).

- **Service Worker (Angular):**
  - Se configura mediante `ngsw-config.json` para precargar y cachear el app shell y los activos críticos.
  - *Nota:* El Service Worker se activa únicamente en producción.

- **IndexedDB (idb):**
  - Se utiliza para almacenar localmente las tareas a través del servicio `ApiClientService`.

- **SyncService:**
  - Detecta el evento `online` y sincroniza automáticamente las tareas no sincronizadas con la API externa.

- **API Externa (JSONPlaceholder):**
  - Se utiliza para simular operaciones CRUD en la sincronización, demostrando la lógica de sincronización.

## Abordaje de Requerimientos

### 1. Configuración como PWA
- **Manifest.json:**
  - Se configuró el archivo `manifest.webmanifest` con nombre, iconos y propiedades para la instalación.
- **Service Worker:**
  - Se utiliza el Service Worker nativo de Angular, configurado en `ngsw-config.json`.
  - Se define la estrategia de precarga y cacheo de recursos críticos.
- **Decisión de Diseño:**
  - Se optó por el SW nativo de Angular, eliminando la necesidad de integrar herramientas externas como Workbox.

### 2. Manejo de Datos sin Conexión
- **Almacenamiento en IndexedDB:**
  - Implementado a través del servicio `ApiClientService` utilizando la biblioteca _idb_.
- **Detección de Conectividad:**
  - Se implementó en el `AppComponent` utilizando el evento `online` para disparar la sincronización.
- **Sincronización con API Externa:**
  - El servicio `SyncService` recorre las tareas no sincronizadas y las sincroniza con JSONPlaceholder.
- **Decisión de Diseño:**
  - Se diferenciaron las operaciones para tareas nuevas (sin ID) y existentes (con ID) para actualizar la persistencia.

### 3. Habilitar la Instalación de la PWA
- **Botón de Instalación y Evento beforeinstallprompt:**
  - Se creó el componente `app-install-app` que maneja el evento `beforeinstallprompt` y muestra un botón para la instalación.
- **Decisión de Diseño:**
  - Se personalizó la experiencia de instalación, permitiendo al usuario instalar la app según su conveniencia.

### 4. Funcionalidades Extra (Opcional)
- **Notificaciones Push:**
  - Pendiente de implementación. Se contempla agregar notificaciones usando Firebase Cloud Messaging o la Web Push API en una siguiente iteración.

## Instalación y Uso

### Requisitos
- Node.js y npm instalados.
- Angular CLI instalado globalmente.

### Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/70r63x/to-do-list.git
   cd to-do-list

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
