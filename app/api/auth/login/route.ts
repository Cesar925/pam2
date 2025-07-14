import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { correo, contraseña } = body

    if (!correo || !contraseña) {
      return NextResponse.json({ success: false, error: "Correo y contraseña son requeridos" }, { status: 400 })
    }

    // Buscar usuario por correo
    const users = await sql`
      SELECT id, nombre, apellido, correo, contraseña 
      FROM usuarios 
      WHERE correo = ${correo}
    `

    if (users.length === 0) {
      return NextResponse.json({ success: false, error: "Credenciales inválidas" }, { status: 401 })
    }

    const user = users[0]

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(contraseña, user.contraseña)

    if (!isValidPassword) {
      return NextResponse.json({ success: false, error: "Credenciales inválidas" }, { status: 401 })
    }

    // Generar JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        correo: user.correo,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" },
    )

    // Remover contraseña de la respuesta
    const { contraseña: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: "Login exitoso",
    })
  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
