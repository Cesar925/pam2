import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET - Obtener todos los incidentes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const estado = searchParams.get("estado")
    const tipo = searchParams.get("tipo")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = `
      SELECT i.*, u.nombre, u.apellido, u.correo as usuario_correo
      FROM incidentes i
      LEFT JOIN usuarios u ON i.usuario_id = u.id
    `

    const conditions = []
    const params: any = {}

    if (estado) {
      conditions.push("i.estado = $estado")
      params.estado = estado
    }

    if (tipo) {
      conditions.push("i.tipo_incidente ILIKE $tipo")
      params.tipo = `%${tipo}%`
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ")
    }

    query += " ORDER BY i.created_at DESC LIMIT $limit OFFSET $offset"
    params.limit = limit
    params.offset = offset

    const incidentes = await sql.unsafe(query, params)

    return NextResponse.json({
      success: true,
      data: incidentes,
      pagination: {
        limit,
        offset,
        total: incidentes.length,
      },
    })
  } catch (error) {
    console.error("Error al obtener incidentes:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// POST - Crear nuevo incidente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tipo_incidente, ubicacion, descripcion, foto_url, usuario_id } = body

    // Validaciones básicas
    if (!tipo_incidente || !ubicacion) {
      return NextResponse.json(
        { success: false, error: "Tipo de incidente y ubicación son requeridos" },
        { status: 400 },
      )
    }

    // Verificar que el usuario existe si se proporciona usuario_id
    if (usuario_id) {
      const user = await sql`
        SELECT id FROM usuarios WHERE id = ${usuario_id}
      `

      if (user.length === 0) {
        return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
      }
    }

    const result = await sql`
      INSERT INTO incidentes (tipo_incidente, ubicacion, descripcion, foto_url, usuario_id)
      VALUES (${tipo_incidente}, ${ubicacion}, ${descripcion || null}, ${foto_url || null}, ${usuario_id || null})
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: "Incidente reportado exitosamente",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al crear incidente:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
