import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET - Obtener contacto por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const contacto = await sql`
      SELECT * FROM contactos_emergencia WHERE id = ${id}
    `

    if (contacto.length === 0) {
      return NextResponse.json({ success: false, error: "Contacto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: contacto[0],
    })
  } catch (error) {
    console.error("Error al obtener contacto:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// PUT - Actualizar contacto
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { tipo, nombre, telefono, correo } = body

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const result = await sql`
      UPDATE contactos_emergencia 
      SET 
        tipo = COALESCE(${tipo}, tipo),
        nombre = COALESCE(${nombre}, nombre),
        telefono = COALESCE(${telefono}, telefono),
        correo = COALESCE(${correo}, correo)
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ success: false, error: "Contacto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: result[0],
      message: "Contacto actualizado exitosamente",
    })
  } catch (error) {
    console.error("Error al actualizar contacto:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// DELETE - Eliminar contacto
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM contactos_emergencia WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ success: false, error: "Contacto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Contacto eliminado exitosamente",
    })
  } catch (error) {
    console.error("Error al eliminar contacto:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
