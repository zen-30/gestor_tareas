# Documentación del Proyecto

1. Descripción del Problema

- El problema consiste en mostrar el manejo de Node.js, Nuxt, arquitectura hexagonal, entre otros, a través de una aplicación interactiva simple.

2. Análisis de la Complejidad

- El problema presenta una complejidad moderada debido a los siguientes factores:

  2.1 Backend:

  - La implementacion de una arquitectura hexagonal conlleva en un principio el desarrollo de mas código, pero tiene la ventaja de que el núcleo de la aplicación se mantiene desacoplado de implementaciones especificas. En el proyecto, se implementó un almacenamiento en memoria, y debido a la arquitectura hexagonal es posible cambiar facilmente el almcenamiento a bases de datos tradicionales mediante un nuevo adaptador que se adecue a los puertos ProjectRespositoryPort.js y TaskRepositoryPort.js (los cuales se utilizan solo como guía).
  - Optimizar el algoritmo para encontrar tareas con tags compartidos tambien requirio de investigación para su desarrollo.
  - Implementar toda la lógica para que el backend trabaje correctamente con el frontend.

  2.2. Frontend: 

  - Implementación de un store con Pinia para manejar de manera global los estados de la aplicación.
  - Renderizado reactivo de proyectos y tareas segun el cambio en los estados globales.


3. Análisis de eficiencia técnica

  - Los componentes tanto del backend como frontend están diseñados de forma modular para ser reemplazados o modificados fácilmente.
  - El uso de Nuxt permite el renderizado por parte del servidor.
  - En el frontend las llamadas al backend y los estados resultantes de la aplicacion están centralizados en el store.
  - Se optimizó la lógica para obtener tareas con tags compartidos entre proyectos.


4. Justificación de la Solución

    4.1 Diseño arquitectónico:

    - El backend tiene una arquitectura hexagonal, donde el dominio contiene la logica principal sobre la gestion de tareas. El desacople de la arquitectura se basa en la inyección de dependencias (adaptadores) que se rigen por los puertos definidos en el dominio.

    - Los routers projectRouter.js y taskRouter.js son adaptadores de entrada, en los que que se inyecta la logica del dominio. Los puertos ProjectServicePort y TaskServicePort establecen como interactuar con los servicios.

    - Los adaptadores de salida InMemoryProjectRepository.js, y TaskRepositoryPort.js, se inyectan en los servicios del dominio y efectuan logica para guardar en memoria. Guiandose por los puertos de salida ProjectRespositoryPort.js y TaskRespositoryPort.js se pueden implementar distinas formas de almacenamiento.

    - La inyección de dependencias se realiza en el archivo principal app.js, donde además se configura el servidor y se le añaden los routers.
  
      Estructura principal del backend:

      ```
      be/
      ├── app.js
      ├── adapters/
      │   ├── in/
      │   │   ├── projectRouter.js
      │   │   └── taskRouter.js
      │   └── out/
      │       ├── InMemoryProjectRepository.js
      │       └── InMemoryTaskRepository.js
      └── domain/
          ├── entities/
          │   ├── Project.js
          │   └── Task.js
          ├── ports/
          │   ├── in/
          │   │   ├── ProjectServicePort.js
          │   │   └── TaskServicePort.js
          │   └── out/
          │       ├── ProjectRepositoryPort.js
          │       └── TaskRepositoryPort.js
          └── services/
              ├── ProjectService.js
              └── TaskService.js
      ```

    - En cuanto al frontend se utilizó un enfoque modular basado en componentes, utilizando la estructura regular de un proyecto realizado con Nuxt. 

      Estructura principal del frontend:

      ```
      fe/
      ├── app.vue
      ├── nuxt.config.ts
      ├── assets/
      │   └── css/
      │       └── global.css
      ├── components/
      │   ├── AddTaskForm.vue
      │   ├── ProjectList.vue
      │   └── TaskList.vue
      ├── pages/
      │   └── index.vue
      ├── server/
      │   └── tsconfig.json
      └── stores/
          └── projectStore.js
      ```


    4.2 Tecnologías y patrones utilizados

    - Se utilizo Express.js por que es un framework para backend minimalista, el que es adecuado para la complejidad del proyecto.
    - Para el frontend se utilizo Nuxt, que al renderizarse mediante el servidor puede otorgar mejor experiencia al usuario mediante una carga inicial mas rápida y puede ser indexado facilmente por los motores de busqueda.
    - Para el store del frontend se utilizo Pinia, por sencillez y su buena integración con Nuxt.
    - La arquitectura hexagonal permite mantener la lógica de dominio independiente de los detalles ajenos a ella, como bases de datos, frameworks, etc. Además facilita la implementación de pruebas unitarias para los servicios y adaptadores.

    4.3 Detalle de la lógica utilizada para identificar tareas con tags compartidos entre dos proyectos (GET /api/tasks/with-shared-tags):
    - Empezando por la solución que podría ser más directa:
      ```
      Inicio
        A = obtenerTareas(projectAId)
        B = obtenerTareas(projectBId)
        tareasCompartidas = Set()

        Para cada tareaA en A                  // O(n)
          Para cada tareaB en B                // O(m)
            Para cada tagA en tareaA.tags      // O(l), l promedio de tags para las tareas de A
              Si tagA esta en tareaB.tags      // O(k), k promedio de tags para las tareas de B
                Agregar tareaA a tareasCompartidas
                Agregar tareaB a tareasCompartidas
      Fin
      ```
      Esta implementación tendría una complejidad $ O(n⋅m⋅l⋅k) $

    - Haciendo algunos cambios para que sea más eficiente:

      ```
      Inicio

        A = obtenerTareas(projectAId)
        B = obtenerTareas(projectBId)
        tagsAtareasA = Map()
        tareasCompartidas = Set()

        // Indexar tareas de A por su tag

        Para cada tareaA en A               // O(n)
          Para cada tagA en tareaA.tags     // O(l), l promedio de tags para las tareas de A
            Si tagsAtareasA[tagA] no existe
              tagsAtareasA[tagA] = []
            tagsAtareasA[tagA] = taskA
        
        // Comparar los tags de B con tagsAtareasA

        Para cada tareaB en B                         // O(m)
          Para cada tagB en tareaB.tags               // O(k), k promedio de tags para las tareas de A
            Si tagsAtareasA[tagB]                     // O(1), debido al al Set
              Para cada tareaA en tagsAtareasA[tagB]  // O(s), s depende de las coincidencias entre tags
                Agregar tareaA a tareasCompartidas
              Agregar tareaB a tareasCompartidas
      Fin
      ```
    - Con las mejoras la complejidad cambia a $O(n ⋅ l) + O(m ⋅ k) + O(s)$. Comparando ambas versiones:
      $$O(n⋅m⋅l⋅k) = 1.000⋅1.000⋅10⋅5 = 50.000.000$$
      $$O(n ⋅ l) + O(m ⋅ k) + O(s) = (1.000⋅10)+ (1.000⋅5) + 1.000 = 16.000$$

      La reducción del numero operaciones es considerable debido a la optimización.
  

5. Conclusiones
  - El proceso de desarrollo abarco múltiples aspectos de un proyecto, aún siendo un proyecto simple, algunas de sus características requirieron de un análisis para su realización, como fue el caso de la optimización y análisis (documentación) de la función de tareas con tags compartidos entre proyectos, la integración del backend con el frontend, y la organización de la arquiectura hexagonal del backend.

- Orientando las mejoras hacia el desarrollo de una plataforma para gestionar tareas, algunas de las mejoras podrían ser:
  - Implementar capas de seguridad para comunicación segura (JWT, HTTPS, etc.)
  - Implementar un mantenedor de usuarios.
  - Implementar caché para las consultas.
  - Mejorar la validación de datos de entrada.
  - Mejorar el manejo de errores y sus respectivos codigos de respuesta en la API.
  - Implementar logging.
  - Mejorar el estado de carga del store del frontend.
  - Mejorar las vistas del frontend.
  - Implementar un sistema de base de datos.
  - Implementar el despliegue en un servidor

- Entre las principales dificultades que tuvo el proyecto se destacan la definición de la arquitectura hexagonal y el análisis de la optimización de la funcion de tareas con tags compartidos entre proyectos.