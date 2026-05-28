import { useState, useEffect, useRef } from 'react'

const fotosMock = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/seed/${i + 10}/800/600`,
  nombre: `Foto ${i + 1}.jpg`,
}))

const CameraIcon = ({ size = 28, color = '#c9a96e' }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none">
    <rect x="5" y="20" width="90" height="55" rx="8" stroke={color} strokeWidth="4" fill="none"/>
    <rect x="30" y="8" width="30" height="14" rx="4" stroke={color} strokeWidth="3" fill="none"/>
    <circle cx="50" cy="47" r="16" stroke={color} strokeWidth="4" fill="none"/>
    <circle cx="50" cy="47" r="7" stroke={color} strokeWidth="3" fill="none"/>
    <rect x="12" y="28" width="10" height="7" rx="2" fill={color} opacity="0.5"/>
  </svg>
)

export default function GaleriaCliente() {
  const [fotos] = useState(fotosMock)
  const [favoritas, setFavoritas] = useState([])
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [tabFavoritas, setTabFavoritas] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [password, setPassword] = useState('')
  const [acceso, setAcceso] = useState(false) // false = pedir password
  const [passwordError, setPasswordError] = useState(false)
  const audioRef = useRef(null)

  const galeria = {
    nombre: 'Jhosmar & Eithan',
    fecha: '15 Mayo 2025',
    fotografo: 'Maxwell Guzmán',
    iniciales: 'MG',
    musica: 'Perfect — Ed Sheeran',
    passwordRequerida: true,
    passwordCorrecta: '1234',
    descargas: true,
    favoritos: true,
  }

  const toggleFavorita = (id) => {
    setFavoritas(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleMusica = () => {
    setIsPlaying(!isPlaying)
  }

  const abrirLightbox = (foto) => {
    const index = fotos.findIndex(f => f.id === foto.id)
    setLightboxIndex(index)
    setLightbox(foto)
  }

  const navLightbox = (dir) => {
    const nuevo = lightboxIndex + dir
    if (nuevo >= 0 && nuevo < fotos.length) {
      setLightboxIndex(nuevo)
      setLightbox(fotos[nuevo])
    }
  }

  const verificarPassword = () => {
    if (password === galeria.passwordCorrecta) {
      setAcceso(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const fotosVisibles = tabFavoritas ? fotos.filter(f => favoritas.includes(f.id)) : fotos

  // Pantalla de contraseña
  if (galeria.passwordRequerida && !acceso) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#f5ede0' }}>
        {/* Fondo cámaras */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: '10%', left: '5%', size: 80, rotate: -15, opacity: 0.06 },
            { top: '70%', right: '5%', size: 70, rotate: 20, opacity: 0.06 },
            { top: '40%', left: '2%', size: 50, rotate: -5, opacity: 0.05 },
            { top: '20%', right: '8%', size: 60, rotate: 10, opacity: 0.05 },
          ].map((cam, i) => (
            <svg key={i} width={cam.size} height={cam.size * 0.8} viewBox="0 0 100 80" fill="none"
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

        <div className="relative z-10 w-full max-w-sm p-8 border" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-4" style={{ borderColor: '#c9a96e', background: '#2a1f14' }}>
              <span className="font-serif italic text-xl" style={{ color: '#c9a96e' }}>{galeria.iniciales}</span>
            </div>
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#8a6e52' }}>{galeria.fotografo}</p>
            <h1 className="font-serif text-3xl italic" style={{ color: '#2a1f14' }}>{galeria.nombre}</h1>
            <p className="text-xs mt-2" style={{ color: '#8a6e52' }}>{galeria.fecha}</p>
          </div>

          <div className="mb-2">
            <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#8a6e52' }}>
              🔐 Contraseña de acceso
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setPasswordError(false) }}
              onKeyDown={e => e.key === 'Enter' && verificarPassword()}
              className="w-full py-3 border-b outline-none bg-transparent text-base"
              style={{ borderColor: passwordError ? '#c9a96e' : '#c9a96e', color: '#2a1f14' }}
              placeholder="••••••••"
            />
            {passwordError && (
              <p className="text-xs mt-2" style={{ color: '#c9765a' }}>Contraseña incorrecta. Intenta de nuevo.</p>
            )}
          </div>

          <button onClick={verificarPassword}
            className="w-full py-3 mt-5 text-xs tracking-widest uppercase hover:opacity-80 transition-all"
            style={{ background: '#2a1f14', color: '#c9a96e' }}>
            Ver mis fotos →
          </button>

          <p className="text-center text-xs mt-6 tracking-widest" style={{ color: '#c9a96e', opacity: 0.5 }}>
            ✦ FOTOGRAFÍA · ARTE · EMOCIÓN ✦
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: '#f5ede0' }}>

      {/* Header */}
      <header className="text-center py-12 px-6 border-b relative" style={{ borderColor: '#e8d5bc', background: '#fdfaf6' }}>
        {/* Fondo sutil */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid2" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-4" style={{ borderColor: '#c9a96e', background: '#2a1f14' }}>
            <span className="font-serif italic text-xl" style={{ color: '#c9a96e' }}>{galeria.iniciales}</span>
          </div>
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#8a6e52' }}>{galeria.fotografo}</p>

          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12" style={{ background: '#c9a96e' }}></div>
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c9a96e' }}></div>
            <div className="h-px w-12" style={{ background: '#c9a96e' }}></div>
          </div>

          <h1 className="font-serif italic text-5xl mb-2" style={{ color: '#2a1f14' }}>{galeria.nombre}</h1>
          <p className="text-xs tracking-widest uppercase" style={{ color: '#8a6e52' }}>{galeria.fecha}</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center gap-8 py-4 border-b sticky top-0 z-40" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
        <button onClick={() => setTabFavoritas(false)}
          className="text-xs tracking-widest uppercase pb-1 border-b-2 transition-all"
          style={{ borderColor: !tabFavoritas ? '#c9a96e' : 'transparent', color: !tabFavoritas ? '#2a1f14' : '#8a6e52' }}>
          Todas las fotos ({fotos.length})
        </button>
        {galeria.favoritos && (
          <button onClick={() => setTabFavoritas(true)}
            className="text-xs tracking-widest uppercase pb-1 border-b-2 transition-all flex items-center gap-2"
            style={{ borderColor: tabFavoritas ? '#c9a96e' : 'transparent', color: tabFavoritas ? '#2a1f14' : '#8a6e52' }}>
            ❤ Favoritas ({favoritas.length})
          </button>
        )}
        {galeria.descargas && (
          <button className="text-xs tracking-widest uppercase pb-1 transition-all" style={{ color: '#8a6e52' }}>
            ↓ Descargar todo
          </button>
        )}
      </div>

      {/* Grid fotos */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {fotosVisibles.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl italic" style={{ color: '#8a6e52' }}>
              {tabFavoritas ? 'Aún no tienes favoritas' : 'No hay fotos'}
            </p>
            <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#c9a96e' }}>
              {tabFavoritas ? 'Haz clic en ❤ para guardar tus fotos favoritas' : ''}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {fotosVisibles.map(foto => (
              <div key={foto.id} className="relative aspect-square overflow-hidden group cursor-pointer" style={{ background: '#e8d5bc' }}>
                <img src={foto.url} alt={foto.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onClick={() => abrirLightbox(foto)}/>

                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: 'linear-gradient(to top, rgba(42,31,20,0.6), transparent)' }}>
                </div>

                {/* Botones */}
                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  {galeria.favoritos && (
                    <button onClick={() => toggleFavorita(foto.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border transition-all"
                      style={{
                        borderColor: favoritas.includes(foto.id) ? '#c9a96e' : 'rgba(255,255,255,0.5)',
                        background: favoritas.includes(foto.id) ? '#c9a96e' : 'rgba(42,31,20,0.5)',
                        color: favoritas.includes(foto.id) ? '#2a1f14' : 'white'
                      }}>
                      ❤
                    </button>
                  )}
                  {galeria.descargas && (
                    <a href={foto.url} download={foto.nombre}
                      className="w-8 h-8 flex items-center justify-center rounded-full border transition-all"
                      style={{ borderColor: 'rgba(255,255,255,0.5)', background: 'rgba(42,31,20,0.5)', color: 'white' }}>
                      ↓
                    </a>
                  )}
                </div>

                {/* Favorita badge */}
                {favoritas.includes(foto.id) && (
                  <div className="absolute top-2 left-2">
                    <span className="text-sm" style={{ color: '#c9a96e' }}>❤</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Barra de música */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center gap-4 px-6 py-3 border-t z-50"
        style={{ background: '#2a1f14', borderColor: 'rgba(201,169,110,0.3)' }}>
        <button onClick={toggleMusica}
          className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all hover:bg-yellow-800 flex-shrink-0"
          style={{ borderColor: '#c9a96e', color: '#c9a96e' }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div className="flex-1 overflow-hidden">
          <p className="font-serif italic text-sm truncate" style={{ color: '#c9a96e' }}>{galeria.musica}</p>
          <p className="text-xs tracking-widest uppercase" style={{ color: '#6b4c2a' }}>Música de tu sesión</p>
        </div>
        {/* Ondas animadas */}
        <div className="flex items-center gap-0.5 h-5">
          {[8, 14, 20, 12, 7].map((h, i) => (
            <div key={i} className="w-0.5 rounded-full transition-all"
              style={{
                height: isPlaying ? `${h}px` : '4px',
                background: '#c9a96e',
                opacity: isPlaying ? 1 : 0.4,
                animation: isPlaying ? `wave${i} 0.8s ease-in-out infinite` : 'none',
                animationDelay: `${i * 0.15}s`
              }}/>
          ))}
        </div>
        <p className="text-xs tracking-widest hidden md:block" style={{ color: '#6b4c2a' }}>
          {fotos.length} fotos · {favoritas.length} favoritas
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(20,14,8,0.97)' }}>
          <button className="absolute top-5 right-5 w-10 h-10 border flex items-center justify-center z-10"
            style={{ borderColor: 'rgba(201,169,110,0.4)', color: '#c9a96e' }}
            onClick={() => setLightbox(null)}>✕</button>

          {/* Navegación */}
          <button className="absolute left-4 w-10 h-10 border flex items-center justify-center"
            style={{ borderColor: 'rgba(201,169,110,0.4)', color: '#c9a96e' }}
            onClick={() => navLightbox(-1)}>‹</button>

          <img src={lightbox.url} alt={lightbox.nombre}
            className="max-w-5xl max-h-screen object-contain px-16"
            style={{ border: '1px solid rgba(201,169,110,0.15)' }}/>

          <button className="absolute right-4 w-10 h-10 border flex items-center justify-center"
            style={{ borderColor: 'rgba(201,169,110,0.4)', color: '#c9a96e' }}
            onClick={() => navLightbox(1)}>›</button>

          {/* Info abajo */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6">
            <span className="text-xs tracking-widest" style={{ color: '#6b4c2a' }}>
              {lightboxIndex + 1} / {fotos.length}
            </span>
            {galeria.favoritos && (
              <button onClick={() => toggleFavorita(lightbox.id)}
                className="text-xs tracking-widest uppercase flex items-center gap-2 px-4 py-2 border transition-all"
                style={{
                  borderColor: '#c9a96e',
                  color: favoritas.includes(lightbox.id) ? '#2a1f14' : '#c9a96e',
                  background: favoritas.includes(lightbox.id) ? '#c9a96e' : 'transparent'
                }}>
                ❤ {favoritas.includes(lightbox.id) ? 'Guardada' : 'Favorita'}
              </button>
            )}
            {galeria.descargas && (
              <a href={lightbox.url} download={lightbox.nombre}
                className="text-xs tracking-widest uppercase px-4 py-2 border transition-all"
                style={{ borderColor: '#c9a96e', color: '#c9a96e' }}>
                ↓ Descargar
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}