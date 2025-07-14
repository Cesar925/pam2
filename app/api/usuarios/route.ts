import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

// GET - Obtener todos los usuarios
export async function GET() {
  try {
    const usuarios = await sql`
      SELECT id, nombre, apellido, correo, direccion, telefono, created_at 
      FROM usuarios 
      ORDER BY created_at DESC
    `

    return NextResponse.json({
      success: true,
      data: usuarios,
    })
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// POST - Crear nuevo usuario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, apellido, correo, contraseña, direccion, telefono } = body

    // Validaciones básicas
    if (!nombre || !apellido || !correo || !contraseña) {
      return NextResponse.json(
        { success: false, error: "Nombre, apellido, correo y contraseña son requeridos" },
        { status: 400 },
      )
    }

    // Verificar si el correo ya existe
    const existingUser = await sql`
      SELECT id FROM usuarios WHERE correo = ${correo}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ success: false, error: "El correo ya está registrado" }, { status: 409 })
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10)

    // Insertar usuario
    const result = await sql`
      INSERT INTO usuarios (nombre, apellido, correo, contraseña, direccion, telefono)
      VALUES (${nombre}, ${apellido}, ${correo}, ${hashedPassword}, ${direccion || null}, ${telefono || null})
      RETURNING id, nombre, apellido, correo, direccion, telefono, created_at
    `

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: "Usuario creado exitosamente",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
