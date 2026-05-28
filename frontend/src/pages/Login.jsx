import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', form)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#f5ede0' }}>

      {/* Fondo con cámaras SVG decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '8%', left: '3%', size: 90, rotate: -15, opacity: 0.07 },
          { top: '70%', left: '1%', size: 60, rotate: 20, opacity: 0.05 },
          { top: '40%', left: '8%', size: 45, rotate: -5, opacity: 0.06 },
          { top: '15%', right: '5%', size: 75, rotate: 10, opacity: 0.07 },
          { top: '55%', right: '3%', size: 55, rotate: -20, opacity: 0.05 },
          { top: '85%', right: '8%', size: 40, rotate: 15, opacity: 0.06 },
          { top: '30%', left: '45%', size: 35, rotate: -10, opacity: 0.04 },
          { top: '75%', left: '40%', size: 50, rotate: 25, opacity: 0.04 },
        ].map((cam, i) => (
          <svg
            key={i}
            width={cam.size}
            height={cam.size}
            viewBox="0 0 100 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              top: cam.top,
              left: cam.left,
              right: cam.right,
              transform: `rotate(${cam.rotate}deg)`,
              opacity: cam.opacity,
            }}
          >
            {/* Cuerpo cámara */}
            <rect x="5" y="20" width="90" height="55" rx="8" stroke="#2a1f14" strokeWidth="3" fill="none"/>
            {/* Visor superior */}
            <rect x="30" y="8" width="30" height="14" rx="4" stroke="#2a1f14" strokeWidth="2.5" fill="none"/>
            {/* Lente círculo exterior */}
            <circle cx="50" cy="47" r="18" stroke="#2a1f14" strokeWidth="3" fill="none"/>
            {/* Lente círculo interior */}
            <circle cx="50" cy="47" r="10" stroke="#2a1f14" strokeWidth="2" fill="none"/>
            {/* Lente punto */}
            <circle cx="50" cy="47" r="3" fill="#2a1f14" opacity="0.4"/>
            {/* Flash */}
            <rect x="12" y="28" width="12" height="8" rx="2" stroke="#2a1f14" strokeWidth="2" fill="none"/>
            {/* Botón disparador */}
            <rect x="68" y="14" width="10" height="6" rx="3" fill="#2a1f14" opacity="0.3"/>
          </svg>
        ))}

        {/* Líneas decorativas diagonales sutiles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Lado izquierdo — branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col items-center justify-center p-12" style={{ background: '#2a1f14' }}>

        {/* Cámaras decorativas en el panel oscuro */}
        {[
          { top: '10%', left: '5%', size: 70, rotate: -20, opacity: 0.12 },
          { bottom: '10%', right: '5%', size: 80, rotate: 15, opacity: 0.1 },
          { top: '45%', right: '10%', size: 40, rotate: -5, opacity: 0.08 },
        ].map((cam, i) => (
          <svg
            key={i}
            width={cam.size}
            height={cam.size}
            viewBox="0 0 100 80"
            fill="none"
            style={{
              position: 'absolute',
              top: cam.top,
              bottom: cam.bottom,
              left: cam.left,
              right: cam.right,
              transform: `rotate(${cam.rotate}deg)`,
              opacity: cam.opacity,
            }}
          >
            <rect x="5" y="20" width="90" height="55" rx="8" stroke="#c9a96e" strokeWidth="3" fill="none"/>
            <rect x="30" y="8" width="30" height="14" rx="4" stroke="#c9a96e" strokeWidth="2.5" fill="none"/>
            <circle cx="50" cy="47" r="18" stroke="#c9a96e" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="47" r="10" stroke="#c9a96e" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="47" r="3" fill="#c9a96e" opacity="0.5"/>
            <rect x="12" y="28" width="12" height="8" rx="2" stroke="#c9a96e" strokeWidth="2" fill="none"/>
            <rect x="68" y="14" width="10" height="6" rx="3" fill="#c9a96e" opacity="0.4"/>
          </svg>
        ))}

        {/* Logo */}
        <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center mb-8 relative z-10" style={{ borderColor: '#c9a96e' }}>
          <span className="font-serif italic text-3xl" style={{ color: '#c9a96e' }}>MG</span>
        </div>

        <h1 className="font-serif italic text-5xl text-center leading-tight mb-6 relative z-10" style={{ color: '#f5ede0' }}>
          Tu galería,<br />tu música,<br />tu historia.
        </h1>

        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="h-px w-16" style={{ background: '#c9a96e' }}></div>
          <div className="w-2 h-2 rotate-45" style={{ background: '#c9a96e' }}></div>
          <div className="h-px w-16" style={{ background: '#c9a96e' }}></div>
        </div>

        <p className="text-center text-sm leading-relaxed relative z-10 max-w-xs" style={{ color: '#8a6e52' }}>
          La plataforma donde los fotógrafos entregan experiencias, no solo imágenes.
        </p>

        {/* Etiquetas flotantes */}
        <div className="absolute bottom-12 left-8 flex flex-col gap-3 z-10">
          {['✦ Galerías privadas', '✦ Música personalizada', '✦ Descarga en HD'].map((tag, i) => (
            <span key={i} className="text-xs tracking-widest" style={{ color: '#c9a96e', opacity: 0.7 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Lado derecho — formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">

          {/* Logo móvil */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ borderColor: '#c9a96e', background: '#2a1f14' }}>
              <span className="font-serif italic text-sm" style={{ color: '#c9a96e' }}>MG</span>
            </div>
            <span className="text-xs tracking-widest uppercase" style={{ color: '#8a6e52' }}>Maxwell Guzmán · Fotografía</span>
          </div>

          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#c9a96e' }}>Bienvenido de vuelta</p>
            <h2 className="font-serif text-5xl font-light" style={{ color: '#2a1f14' }}>Iniciar<br/>sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#8a6e52' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-0 py-3 outline-none border-b-2 bg-transparent transition-all text-base"
                style={{ borderColor: '#c9a96e', color: '#2a1f14' }}
                placeholder="tu@correo.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#8a6e52' }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-0 py-3 outline-none border-b-2 bg-transparent transition-all text-base"
                style={{ borderColor: '#c9a96e', color: '#2a1f14' }}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs tracking-wider" style={{ color: '#8a6e52' }}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 text-xs tracking-widest uppercase font-medium transition-all hover:opacity-80 relative overflow-hidden group"
              style={{ background: '#2a1f14', color: '#c9a96e' }}
            >
              <span className="relative z-10">Entrar →</span>
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: '#e8d5bc' }}></div>
            <span className="text-xs" style={{ color: '#8a6e52' }}>o</span>
            <div className="flex-1 h-px" style={{ background: '#e8d5bc' }}></div>
          </div>

          <p className="text-center text-sm" style={{ color: '#8a6e52' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-medium underline underline-offset-4" style={{ color: '#2a1f14' }}>
              Créala gratis
            </Link>
          </p>

          <p className="text-center text-xs mt-12 tracking-widest" style={{ color: '#c9a96e', opacity: 0.5 }}>
            ✦ FOTOGRAFÍA · ARTE · EMOCIÓN ✦
          </p>

        </div>
      </div>
    </div>
  )
}