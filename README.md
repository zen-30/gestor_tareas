# Gestor de Tareas Simple

El proyecto consiste en una aplicación que permita gestionar tareas de proyectos. Utiliza Express.js para el backend y Nuxt.js para el frontend.

## Clonar repositorio

1. Clona este repositorio:
   ```bash
   git clone https://github.com/zen-30/gestor_tareas.git
   cd gestor_tareas
   ```

##  Entorno de desarrollo
Este proyecto fue desarrollado utilizando:

**Node**: 22.14.0

**npm**: 10.9.2

## Ejecución en entorno de desarrollo

1. En la raíz del proyecto, ejecutar el script de inicio. Cada vez que se ejecuta el script se instalan las dependencias, para evitar esto comentar las lineas que se indican en el script:
   ```bash
   ./start.sh
   ```

Esto iniciará tanto el backend como el frontend. El frontend estará disponible en `http://localhost:3001` y el backend en `http://localhost:3000`.

## Notas adicionales

- Tener Node.js y npm instalados en el sistema.
- Para detener la ejecucion del proyecto, usar `Ctrl+C` en la terminal.


## Ejecución mediante Docker

1. Crear la imagen. En la raíz del proyecto ejecutar:
```
docker build -t gestor_tareas .
```
2. Ejecutar el contenedor:
```
docker run -p 3000:3000 -p 3001:3001 gestor_tareas

```