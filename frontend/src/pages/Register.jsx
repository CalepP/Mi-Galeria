import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const { registro } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmar)
      return setError('Las contraseñas no coinciden')
    if (form.password.length < 6)
      return setError('La contraseña debe tener al menos 6 caracteres')
    setCargando(true)
    try {
      await registro(form.nombre, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear la cuenta')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#f5ede0' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '8%', left: '3%', size: 90, rotate: -15, opacity: 0.07 },
          { top: '70%', left: '1%', size: 60, rotate: 20, opacity: 0.05 },
          { top: '15%', right: '5%', size: 75, rotate: 10, opacity: 0.07 },
          { top: '55%', right: '3%', size: 55, rotate: -20, opacity: 0.05 },
        ].map((cam, i) => (
          <svg key={i} width={cam.size} height={cam.size} viewBox="0 0 100 80" fill="none"
            style={{ position: 'absolute', top: cam.top, left: cam.left, right: cam.right, transform: `rotate(${cam.rotate}deg)`, opacity: cam.opacity }}>
            <rect x="5" y="20" width="90" height="55" rx="8" stroke="#2a1f14" strokeWidth="3" fill="none"/>
            <rect x="30" y="8" width="30" height="14" rx="4" stroke="#2a1f14" strokeWidth="2.5" fill="none"/>
            <circle cx="50" cy="47" r="18" stroke="#2a1f14" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="47" r="10" stroke="#2a1f14" strokeWidth="2" fill="none"/>
            <rect x="12" y="28" width="12" height="8" rx="2" stroke="#2a1f14" strokeWidth="2" fill="none"/>
          </svg>
        ))}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Lado izquierdo */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col items-center justify-center p-12" style={{ background: '#2a1f14' }}>
        {[
          { top: '10%', left: '5%', size: 70, rotate: -20, opacity: 0.12 },
          { bottom: '10%', right: '5%', size: 80, rotate: 15, opacity: 0.1 },
        ].map((cam, i) => (
          <svg key={i} width={cam.size} height={cam.size} viewBox="0 0 100 80" fill="none"
            style={{ position: 'absolute', top: cam.top, bottom: cam.bottom, left: cam.left, right: cam.right, transform: `rotate(${cam.rotate}deg)`, opacity: cam.opacity }}>
            <rect x="5" y="20" width="90" height="55" rx="8" stroke="#c9a96e" strokeWidth="3" fill="none"/>
            <rect x="30" y="8" width="30" height="14" rx="4" stroke="#c9a96e" strokeWidth="2.5" fill="none"/>
            <circle cx="50" cy="47" r="18" stroke="#c9a96e" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="47" r="10" stroke="#c9a96e" strokeWidth="2" fill="none"/>
            <rect x="12" y="28" width="12" height="8" rx="2" stroke="#c9a96e" strokeWidth="2" fill="none"/>
          </svg>
        ))}
        <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center mb-8 relative z-10" style={{ borderColor: '#c9a96e' }}>
          <span className="font-serif italic text-3xl" style={{ color: '#c9a96e' }}>MG</span>
        </div>
        <h1 className="font-serif italic text-5xl text-center leading-tight mb-6 relative z-10" style={{ color: '#f5ede0' }}>
          Empieza a<br />contar tus<br />historias.
        </h1>
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="h-px w-16" style={{ background: '#c9a96e' }}></div>
          <div className="w-2 h-2 rotate-45" style={{ background: '#c9a96e' }}></div>
          <div className="h-px w-16" style={{ background: '#c9a96e' }}></div>
        </div>
        <p className="text-center text-sm leading-relaxed relative z-10 max-w-xs" style={{ color: '#8a6e52' }}>
          Crea tu cuenta y entrega a tus clientes una experiencia que nunca olvidarán.
        </p>
        <div className="absolute bottom-12 left-8 flex flex-col gap-3 z-10">
          {['✦ Galerías ilimitadas', '✦ Música personalizada', '✦ Links privados por cliente'].map((tag, i) => (
            <span key={i} className="text-xs tracking-widest" style={{ color: '#c9a96e', opacity: 0.7 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Lado derecho */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#c9a96e' }}>Únete ahora</p>
            <h2 className="font-serif text-5xl font-light" style={{ color: '#2a1f14' }}>Crear<br/>cuenta</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Nombre completo', name: 'nombre', type: 'text', placeholder: 'Tu nombre' },
              { label: 'Correo electrónico', name: 'email', type: 'email', placeholder: 'tu@correo.com' },
              { label: 'Contraseña', name: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirmar contraseña', name: 'confirmar', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#8a6e52' }}>
                  {field.label}
                </label>
                <input type={field.type} name={field.name} value={form[field.name]}
                  onChange={handleChange} placeholder={field.placeholder} required
                  className="w-full px-0 py-3 outline-none border-b-2 bg-transparent text-base"
                  style={{ borderColor: '#c9a96e', color: '#2a1f14' }}/>
              </div>
            ))}

            {error && (
              <p className="text-xs py-2 px-3" style={{ background: '#f5e6e0', color: '#c9765a' }}>{error}</p>
            )}

            <button type="submit" disabled={cargando}
              className="w-full py-4 mt-2 text-xs tracking-widest uppercase font-medium transition-all hover:opacity-80"
              style={{ background: '#2a1f14', color: '#c9a96e', opacity: cargando ? 0.7 : 1 }}>
              {cargando ? 'Creando cuenta...' : 'Crear cuenta →'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: '#e8d5bc' }}></div>
            <span className="text-xs" style={{ color: '#8a6e52' }}>o</span>
            <div className="flex-1 h-px" style={{ background: '#e8d5bc' }}></div>
          </div>

          <p className="text-center text-sm" style={{ color: '#8a6e52' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/" className="font-medium underline underline-offset-4" style={{ color: '#2a1f14' }}>
              Inicia sesión
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