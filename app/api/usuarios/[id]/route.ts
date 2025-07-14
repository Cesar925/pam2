import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

// GET - Obtener usuario por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const usuario = await sql`
      SELECT id, nombre, apellido, correo, direccion, telefono, created_at 
      FROM usuarios 
      WHERE id = ${id}
    `

    if (usuario.length === 0) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: usuario[0],
    })
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// PUT - Actualizar usuario
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { nombre, apellido, correo, contraseña, direccion, telefono } = body

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    // Verificar si el usuario existe
    const existingUser = await sql`
      SELECT id FROM usuarios WHERE id = ${id}
    `

    if (existingUser.length === 0) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    // Preparar datos para actualizar
    const updateData: any = {}
    if (nombre) updateData.nombre = nombre
    if (apellido) updateData.apellido = apellido
    if (correo) updateData.correo = correo
    if (direccion !== undefined) updateData.direccion = direccion
    if (telefono !== undefined) updateData.telefono = telefono

    // Si se proporciona nueva contraseña, encriptarla
    if (contraseña) {
      updateData.contraseña = await bcrypt.hash(contraseña, 10)
    }

    // Construir query dinámicamente
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = $${key}`)
      .join(", ")

    const result = await sql`
      UPDATE usuarios 
      SET ${sql.unsafe(setClause)}
      WHERE id = ${id}
      RETURNING id, nombre, apellido, correo, direccion, telefono, created_at
    `.bind(updateData)

    return NextResponse.json({
      success: true,
      data: result[0],
      message: "Usuario actualizado exitosamente",
    })
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// DELETE - Eliminar usuario
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM usuarios WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado exitosamente",
    })
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
