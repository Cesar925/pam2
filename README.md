# API de Reportes de Incidentes

Sistema completo para gestionar reportes de incidentes, usuarios y contactos de emergencia.

## 🚀 Características

- **CRUD completo** para usuarios, incidentes y contactos de emergencia
- **Autenticación JWT** con bcrypt para seguridad
- **Filtros y paginación** en consultas
- **Estadísticas** del sistema
- **Base de datos PostgreSQL** con Neon
- **Deployment** listo para Netlify

## 📋 Endpoints Principales

### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios/[id]` - Obtener usuario
- `PUT /api/usuarios/[id]` - Actualizar usuario
- `DELETE /api/usuarios/[id]` - Eliminar usuario

### Incidentes
- `GET /api/incidentes` - Listar incidentes (con filtros)
- `POST /api/incidentes` - Crear incidente
- `GET /api/incidentes/[id]` - Obtener incidente
- `PUT /api/incidentes/[id]` - Actualizar incidente
- `DELETE /api/incidentes/[id]` - Eliminar incidente

### Contactos de Emergencia
- `GET /api/contactos-emergencia` - Listar contactos
- `POST /api/contactos-emergencia` - Crear contacto
- `GET /api/contactos-emergencia/[id]` - Obtener contacto
- `PUT /api/contactos-emergencia/[id]` - Actualizar contacto
- `DELETE /api/contactos-emergencia/[id]` - Eliminar contacto

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Estadísticas
- `GET /api/stats` - Obtener estadísticas del sistema

## 🛠️ Configuración

### Variables de Entorno
\`\`\`env
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu-jwt-secret-muy-seguro
\`\`\`

### Instalación Local
\`\`\`bash
npm install
npm run dev
\`\`\`

### Deployment en Netlify

1. **Preparar la base de datos:**
   - Crea una cuenta en [Neon](https://neon.tech)
   - Ejecuta los scripts SQL en `/scripts/`
   - Copia la URL de conexión

2. **Subir a GitHub:**
   - Descarga el código
   - Crea un repositorio en GitHub
   - Sube el código

3. **Configurar Netlify:**
   - Conecta tu repositorio
   - Configura las variables de entorno
   - Deploy automático

## 📊 Ejemplos de Uso

### Crear un usuario
\`\`\`bash
curl -X POST https://tu-api.netlify.app/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan@email.com",
    "contraseña": "password123",
    "telefono": "987654321"
  }'
\`\`\`

### Reportar un incidente
\`\`\`bash
curl -X POST https://tu-api.netlify.app/api/incidentes \
  -H "Content-Type: application/json" \
  -d '{
    "tipo_incidente": "Robo",
    "ubicacion": "Av. Principal 123",
    "descripcion": "Robo a mano armada",
    "usuario_id": 1
  }'
\`\`\`

### Filtrar incidentes
\`\`\`bash
curl "https://tu-api.netlify.app/api/incidentes?estado=pendiente&tipo=robo&limit=10"
\`\`\`

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación JWT
- Validación de datos de entrada
- Manejo de errores seguro

## 📱 Integración con Apps Móviles

Esta API está diseñada para ser consumida por aplicaciones móviles (Flutter, React Native, etc.) y web.

## 🆘 Soporte

Para reportar problemas o solicitar características, crea un issue en el repositorio de GitHub.
