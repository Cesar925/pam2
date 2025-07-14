export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API de Reportes de Incidentes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema completo para gestionar reportes de incidentes, usuarios y contactos de emergencia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Endpoints principales */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">👥 Usuarios</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-mono bg-green-100 px-2 py-1 rounded">GET</span> <code>/api/usuarios</code>
              </div>
              <div>
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">POST</span> <code>/api/usuarios</code>
              </div>
              <div>
                <span className="font-mono bg-yellow-100 px-2 py-1 rounded">PUT</span> <code>/api/usuarios/[id]</code>
              </div>
              <div>
                <span className="font-mono bg-red-100 px-2 py-1 rounded">DEL</span> <code>/api/usuarios/[id]</code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🚨 Incidentes</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-mono bg-green-100 px-2 py-1 rounded">GET</span> <code>/api/incidentes</code>
              </div>
              <div>
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">POST</span> <code>/api/incidentes</code>
              </div>
              <div>
                <span className="font-mono bg-yellow-100 px-2 py-1 rounded">PUT</span> <code>/api/incidentes/[id]</code>
              </div>
              <div>
                <span className="font-mono bg-red-100 px-2 py-1 rounded">DEL</span> <code>/api/incidentes/[id]</code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📞 Emergencias</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-mono bg-green-100 px-2 py-1 rounded">GET</span>{" "}
                <code>/api/contactos-emergencia</code>
              </div>
              <div>
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">POST</span>{" "}
                <code>/api/contactos-emergencia</code>
              </div>
              <div>
                <span className="font-mono bg-yellow-100 px-2 py-1 rounded">PUT</span>{" "}
                <code>/api/contactos-emergencia/[id]</code>
              </div>
              <div>
                <span className="font-mono bg-red-100 px-2 py-1 rounded">DEL</span>{" "}
                <code>/api/contactos-emergencia/[id]</code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔐 Autenticación</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">POST</span> <code>/api/auth/login</code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📊 Estadísticas</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-mono bg-green-100 px-2 py-1 rounded">GET</span> <code>/api/stats</code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🚀 Configuración para Deployment</h2>
            <div className="text-left space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Variables de Entorno Requeridas:</h3>
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  <div>DATABASE_URL=postgresql://...</div>
                  <div>JWT_SECRET=tu-jwt-secret-aqui</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">2. Para GitHub:</h3>
                <div className="bg-gray-100 p-4 rounded text-sm">
                  <div>• Descarga el código usando el botón "Download Code"</div>
                  <div>• Crea un repositorio en GitHub</div>
                  <div>
                    • Sube el código: <code>git push origin main</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">3. Para Netlify:</h3>
                <div className="bg-gray-100 p-4 rounded text-sm">
                  <div>• Conecta tu repositorio de GitHub a Netlify</div>
                  <div>• Configura las variables de entorno en Netlify</div>
                  <div>
                    • Build command: <code>npm run build</code>
                  </div>
                  <div>
                    • Publish directory: <code>.next</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
