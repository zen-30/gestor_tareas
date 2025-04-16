#!/bin/sh

# Detener el script si ocurre un error
set -e

# Verificar e instalar dependencias del backend
cd be/
echo "Instalando dependencias del backend..."
npm install     # Comentar si ya se han instalado las dependencias

# Iniciar el backend
echo "Iniciando el backend..."
node app.js &
BACKEND_PID=$!

# Verificar e instalar dependencias del frontend
cd ../fe/
echo "Instalando dependencias del frontend..."
npm install     # Comentar si ya se han instalado las dependencias

# Establecer el puerto y host para el frontend
export PORT=3001
export HOST='0.0.0.0'

# Iniciar el frontend
echo "Iniciando el frontend..."
npm run build-and-start
FRONTEND_PID=$!

# Esperar a que ambos procesos terminen
wait $BACKEND_PID $FRONTEND_PID
