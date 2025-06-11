# Expense Tracker Application

Esta aplicación es un sistema de seguimiento de gastos que consta de una API backend y una aplicación frontend. A continuación, se detalla la configuración y los pasos necesarios para ejecutar el proyecto.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

```
/api    - Backend (Node.js/Express)
/app    - Frontend (React)
```

## Backend (API)

### Tecnologías Principales
- Node.js
- Express
- MongoDB
- JWT para autenticación

### Variables de Entorno (.env)
El backend requiere las siguientes variables de entorno:

```env
DB_USERNAME=tu_usuario_mongodb
DB_PASSWORD=tu_password_mongodb
APP_NAME=nombre_app_mongodb
PORT=3000 (opcional, por defecto 3000)
CORS_ORIGIN=url_del_frontend
DB_USERNAME_TEST=usuario_test
DB_PASSWORD_TEST=password_test
JWT_KEY=tu_jwt_secret
```

### URLs de Conexión MongoDB
El sistema está configurado para trabajar con tres entornos diferentes:

1. Local: `mongodb://localhost:27017/expense-tracker`
2. Desarrollo: MongoDB Atlas (usando credenciales de test)
3. Producción: MongoDB Atlas (usando credenciales de producción)

### Endpoints Principales

#### Usuarios
- POST /register - Registro de usuarios
- POST /login - Inicio de sesión
- PUT /profile - Actualización de perfil
- PUT /password - Cambio de contraseña

#### Categorías
- GET /categories - Listar categorías
- POST /categories - Crear categoría
- PUT /categories/:id - Actualizar categoría
- DELETE /categories/:id - Eliminar categoría

#### Transacciones
- GET /transactions - Listar transacciones
- POST /transactions - Crear transacción
- PUT /transactions/:id - Actualizar transacción
- DELETE /transactions/:id - Eliminar transacción

## Frontend (App)

### Tecnologías Principales
- React
- Redux para gestión de estado
- Tailwind CSS para estilos
- Vite como bundler

### Variables de Entorno (.env)
El frontend requiere las siguientes variables de entorno:

```env
VITE_API_URL=url_de_la_api
```

### URLs de Conexión
- Desarrollo: `http://localhost:3000/api/v1`
- Producción: `https://app-gastos-sigma.vercel.app/api/v1`

## Comandos de Inicio

### Backend (en el directorio /api)
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start
```

### Frontend (en el directorio /app)
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar la build
npm run preview
```

## Características Principales

1. Autenticación de usuarios
2. Gestión de categorías de gastos/ingresos
3. Registro y seguimiento de transacciones
4. Reportes de gastos
5. Interfaz responsive

## Configuración de Desarrollo

1. Clonar el repositorio
2. Configurar las variables de entorno en ambos proyectos
3. Instalar las dependencias en ambos directorios
4. Iniciar MongoDB localmente o configurar conexión a MongoDB Atlas
5. Iniciar el backend y frontend en terminales separadas

## Despliegue

### Backend
- El backend está configurado para desplegarse en Vercel
- Asegurarse de configurar las variables de entorno en el panel de Vercel

### Frontend
- El frontend está configurado para desplegarse en Vercel
- La build se genera usando Vite
- Configurar las variables de entorno en el panel de Vercel

## Notas Importantes

- Asegurarse de que CORS_ORIGIN en el backend coincida con la URL del frontend
- Las credenciales de MongoDB Atlas deben estar correctamente configuradas
- El sistema usa JWT para la autenticación, asegurarse de configurar una clave segura
- Para desarrollo local, MongoDB debe estar instalado y ejecutándose