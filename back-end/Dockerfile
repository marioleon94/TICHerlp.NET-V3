# Usar la imagen oficial de Node.js como base
FROM node:latest

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará (si es necesario)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
