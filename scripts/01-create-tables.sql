-- Crear la tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla de contactos de emergencia
CREATE TABLE contactos_emergencia (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL, -- Ejemplo: Policía, Bomberos, Serenazgo
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    correo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla de reportes de incidentes
CREATE TABLE incidentes (
    id SERIAL PRIMARY KEY,
    tipo_incidente VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    foto_url VARCHAR(500), -- URL de la foto almacenada
    usuario_id INTEGER REFERENCES usuarios(id),
    estado VARCHAR(50) DEFAULT 'pendiente', -- pendiente, en_proceso, resuelto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
