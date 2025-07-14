import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Estadísticas generales
    const [totalIncidentes, incidentesPendientes, incidentesResueltos, totalUsuarios, incidentesPorTipo] =
      await Promise.all([
        sql`SELECT COUNT(*) as total FROM incidentes`,
        sql`SELECT COUNT(*) as total FROM incidentes WHERE estado = 'pendiente'`,
        sql`SELECT COUNT(*) as total FROM incidentes WHERE estado = 'resuelto'`,
        sql`SELECT COUNT(*) as total FROM usuarios`,
        sql`
        SELECT tipo_incidente, COUNT(*) as cantidad 
        FROM incidentes 
        GROUP BY tipo_incidente 
        ORDER BY cantidad DESC
      `,
      ])

    // Incidentes por mes (últimos 6 meses)
    const incidentesPorMes = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as mes,
        COUNT(*) as cantidad
      FROM incidentes 
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY mes DESC
    `

    return NextResponse.json({
      success: true,
      data: {
        resumen: {
          total_incidentes: Number.parseInt(totalIncidentes[0].total),
          incidentes_pendientes: Number.parseInt(incidentesPendientes[0].total),
          incidentes_resueltos: Number.parseInt(incidentesResueltos[0].total),
          total_usuarios: Number.parseInt(totalUsuarios[0].total),
        },
        incidentes_por_tipo: incidentesPorTipo,
        incidentes_por_mes: incidentesPorMes,
      },
    })
  } catch (error) {
    console.error("Error al obtener estadísticas:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
