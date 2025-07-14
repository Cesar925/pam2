import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

export const sql = neon(process.env.DATABASE_URL)

// Tipos de datos
export interface Usuario {
  id?: number
  nombre: string
  apellido: string
  correo: string
  contraseña: string
  direccion?: string
  telefono?: string
  created_at?: string
}

export interface ContactoEmergencia {
  id?: number
  tipo: string
  nombre: string
  telefono: string
  correo?: string
  created_at?: string
}

export interface Incidente {
  id?: number
  tipo_incidente: string
  ubicacion: string
  fecha?: string
  descripcion?: string
  foto_url?: string
  usuario_id?: number
  estado?: "pendiente" | "en_proceso" | "resuelto"
  created_at?: string
  updated_at?: string
}
