# Guía de Ejecución - Frontend (Fly Away ✈️)
Este proyecto corresponde al desarrollo de la interfaz frontend para el laboratorio de reserva de vuelos. Está construido utilizando React, TypeScript, Vite y React Router Dom, aplicando un diseño estético moderno y optimizado.

📋 Prerrequisitos
Antes de iniciar la aplicación, asegúrate de tener instalado en tu sistema:

Node.js (Versión 18 o superior recomendada)

Un gestor de paquetes como npm (incluido por defecto con la instalación de Node.js)

### 🚀 Pasos para Ejecutar la Aplicación
Sigue estos pasos detallados desde tu terminal para instalar las dependencias y poner en marcha el servidor de desarrollo local:

## 1. Ubicación del proyecto
Asegúrate de estar posicionado en la carpeta raíz del proyecto frontend desde tu consola de comandos o terminal integrada de **VS** Code.

## 2. Instalar las dependencias
Ejecuta el siguiente comando para descargar e instalar todas las librerías necesarias especificadas en el archivo package.json (React, React Router, Axios, etc.):
```
npm install
```

## 3. Verificar la configuración del Backend (Proxy)
La aplicación utiliza un proxy configurado en Vite para redirigir las peticiones de la **API** de forma transparente y segura, evitando bloqueos de **CORS**.

El backend proporcionado debe estar corriendo localmente en el puerto 8080 ([http://localhost:8080).](http://localhost:8080).)

Esta regla está automatizada dentro del archivo vite.config.ts, por lo que no requiere configuraciones adicionales de variables de entorno.

## 4. Iniciar el servidor de desarrollo de React
Una vez completada la instalación de paquetes, levanta el entorno de ejecución local con el comando:
```
npm run dev
```

## 5. Acceder a la aplicación
Abre tu navegador web de preferencia e ingresa a la dirección asignada por Vite (usualmente es el puerto por defecto):
👉 [http://localhost:5173](http://localhost:5173)

### 🛠️ Flujo de Pruebas Recomendado para Evaluación
Dado que la base de datos del backend se ejecuta en la memoria **RAM** del servidor (H2 en memoria) y se reinicia completamente cada vez que el backend se apaga, te sugerimos seguir este flujo para validar el 100% de la funcionalidad frente al docente:

Pantalla de Registro (/register): Crea una cuenta completamente nueva ingresando un correo y contraseña.

Pantalla de Login (/login): Inicia sesión con tus credenciales recién creadas. El sistema guardará el token **JWT** en el almacenamiento del navegador de forma segura.

Explorar Vuelos (/home): Comprueba el listado dinámico sincronizado con el backend, los asientos disponibles y realiza una reserva presionando el botón verde.

Panel **Mis Reservas** (/bookings): Dirígete a esta sección desde la barra azul, ingresa el identificador numérico de tu ticket (la primera reserva que hagas tras iniciar el servidor será el **ID** 1) y presiona **Buscar** para desplegar el Pase de Abordar interactivo.

📂 Estructura de Archivos Desarrollados
Para facilitar la revisión del código fuente por parte del profesor, la lógica se distribuye de la siguiente manera:

src/index.css: Hoja de estilos centralizada con la paleta de colores y comportamiento del tema **Modern Travel**.

src/App.tsx: Enrutador principal de la app que gestiona la accesibilidad y el guardia de rutas privadas.

src/components/Navbar.tsx: Barra superior de navegación fluida con limpieza de nombre de usuario y botón de logout.

src/pages/Login.tsx y Register.tsx: Formularios interactivos encargados del manejo del estado de sesión y almacenamiento de tokens.

src/pages/Flights.tsx: Módulo encargado del consumo del catálogo de vuelos comerciales y control de capacidad (asientos).
