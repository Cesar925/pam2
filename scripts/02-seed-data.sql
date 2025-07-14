-- Insertar contactos de emergencia por defecto
INSERT INTO contactos_emergencia (tipo, nombre, telefono, correo) VALUES
('Policía', 'Comisaría Central', '105', 'comisaria@policia.gob.pe'),
('Bomberos', 'Bomberos Voluntarios', '116', 'emergencias@bomberos.gob.pe'),
('Serenazgo', 'Serenazgo Municipal', '(01) 555-0123', 'serenazgo@municipalidad.gob.pe'),
('Ambulancia', 'SAMU', '106', 'samu@minsa.gob.pe'),
('Defensa Civil', 'INDECI', '115', 'emergencias@indeci.gob.pe');

-- Insertar usuario de prueba
INSERT INTO usuarios (nombre, apellido, correo, contraseña, direccion, telefono) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '$2a$10$example.hash', 'Av. Principal 123, Lima', '987654321');
