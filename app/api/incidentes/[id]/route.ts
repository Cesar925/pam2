import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET - Obtener incidente por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const incidente = await sql`
      SELECT i.*, u.nombre, u.apellido, u.correo as usuario_correo, u.telefono as usuario_telefono
      FROM incidentes i
      LEFT JOIN usuarios u ON i.usuario_id = u.id
      WHERE i.id = ${id}
    `

    if (incidente.length === 0) {
      return NextResponse.json({ success: false, error: "Incidente no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: incidente[0],
    })
  } catch (error) {
    console.error("Error al obtener incidente:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// PUT - Actualizar incidente
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { tipo_incidente, ubicacion, descripcion, foto_url, estado } = body

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    // Verificar si el incidente existe
    const existing = await sql`
      SELECT id FROM incidentes WHERE id = ${id}
    `

    if (existing.length === 0) {
      return NextResponse.json({ success: false, error: "Incidente no encontrado" }, { status: 404 })
    }

    const result = await sql`
      UPDATE incidentes 
      SET 
        tipo_incidente = COALESCE(${tipo_incidente}, tipo_incidente),
        ubicacion = COALESCE(${ubicacion}, ubicacion),
        descripcion = COALESCE(${descripcion}, descripcion),
        foto_url = COALESCE(${foto_url}, foto_url),
        estado = COALESCE(${estado}, estado),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      data: result[0],
      message: "Incidente actualizado exitosamente",
    })
  } catch (error) {
    console.error("Error al actualizar incidente:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// DELETE - Eliminar incidente
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM incidentes WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ success: false, error: "Incidente no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Incidente eliminado exitosamente",
    })
  } catch (error) {
    console.error("Error al eliminar incidente:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
