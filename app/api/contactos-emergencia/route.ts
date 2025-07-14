import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET - Obtener todos los contactos de emergencia
export async function GET() {
  try {
    const contactos = await sql`
      SELECT * FROM contactos_emergencia 
      ORDER BY tipo, nombre
    `

    return NextResponse.json({
      success: true,
      data: contactos,
    })
  } catch (error) {
    console.error("Error al obtener contactos de emergencia:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

// POST - Crear nuevo contacto de emergencia
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tipo, nombre, telefono, correo } = body

    // Validaciones básicas
    if (!tipo || !nombre || !telefono) {
      return NextResponse.json({ success: false, error: "Tipo, nombre y teléfono son requeridos" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO contactos_emergencia (tipo, nombre, telefono, correo)
      VALUES (${tipo}, ${nombre}, ${telefono}, ${correo || null})
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: "Contacto de emergencia creado exitosamente",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al crear contacto de emergencia:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
