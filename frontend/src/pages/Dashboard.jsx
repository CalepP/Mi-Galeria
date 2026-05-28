import { useState } from 'react'

const galeriasMock = [
  { id: 1, cliente: 'Jhosmar & Eithan', fecha: '15 Mayo 2025', fotos: 24, musica: 'Perfect — Ed Sheeran', estado: 'activa', vistas: 12, descargas: 8, cover: null },
  { id: 2, cliente: 'María & Carlos', fecha: '2 Junio 2025', fotos: 18, musica: 'Thinking Out Loud', estado: 'activa', vistas: 5, descargas: 3, cover: null },
  { id: 3, cliente: 'Ana Rodríguez', fecha: '20 Abril 2025', fotos: 31, musica: 'Sin música', estado: 'borrador', vistas: 0, descargas: 0, cover: null },
]

const CameraIcon = ({ size = 28, color = '#c9a96e' }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none">
    <rect x="5" y="20" width="90" height="55" rx="8" stroke={color} strokeWidth="4" fill="none"/>
    <rect x="30" y="8" width="30" height="14" rx="4" stroke={color} strokeWidth="3" fill="none"/>
    <circle cx="50" cy="47" r="16" stroke={color} strokeWidth="4" fill="none"/>
    <circle cx="50" cy="47" r="7" stroke={color} strokeWidth="3" fill="none"/>
    <rect x="12" y="28" width="10" height="7" rx="2" fill={color} opacity="0.5"/>
  </svg>
)

export default function Dashboard() {
  const [vista, setVista] = useState('grid') // grid | lista
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todas')
  const [modalNueva, setModalNueva] = useState(false)
  const [menuPerfil, setMenuPerfil] = useState(false)

  const galeriasFiltradas = galeriasMock.filter(g => {
    const coincideBusqueda = g.cliente.toLowerCase().includes(busqueda.toLowerCase())
    const coincideFiltro = filtro === 'todas' || g.estado === filtro
    return coincideBusqueda && coincideFiltro
  })

  return (
    <div className="min-h-screen" style={{ background: '#f5ede0' }}>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 flex flex-col items-center py-6 gap-6 z-50 border-r" style={{ background: '#2a1f14', borderColor: '#3d2b1a' }}>
        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4" style={{ borderColor: '#c9a96e' }}>
          <span className="font-serif italic text-sm" style={{ color: '#c9a96e' }}>MG</span>
        </div>
        {[
          { icon: '⊞', label: 'Galerías', active: true },
          { icon: '♪', label: 'Música' },
          { icon: '↓', label: 'Descargas' },
          { icon: '❤', label: 'Favoritos' },
          { icon: '⚙', label: 'Config' },
        ].map((item, i) => (
          <button key={i} title={item.label}
            className="w-10 h-10 flex items-center justify-center rounded transition-all text-lg"
            style={{ background: item.active ? '#c9a96e22' : 'transparent', color: item.active ? '#c9a96e' : '#6b4c2a' }}>
            {item.icon}
          </button>
        ))}
        <div className="flex-1"/>
        <button className="w-10 h-10 flex items-center justify-center text-lg" style={{ color: '#6b4c2a' }} title="Salir">↩</button>
      </div>

      {/* Contenido principal */}
      <div className="ml-16">

        {/* Topbar */}
        <div className="flex items-center justify-between px-8 py-4 border-b sticky top-0 z-40" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
          <div>
            <p className="text-xs tracking-widest uppercase" style={{ color: '#c9a96e' }}>Panel principal</p>
            <h1 className="font-serif text-2xl" style={{ color: '#2a1f14' }}>Mis Galerías</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Buscador */}
            <div className="flex items-center gap-2 px-4 py-2 border" style={{ borderColor: '#e8d5bc', background: '#f5ede0' }}>
              <span style={{ color: '#8a6e52' }}>⌕</span>
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="outline-none bg-transparent text-sm w-40"
                style={{ color: '#2a1f14' }}
              />
            </div>

            {/* Nueva galería */}
            <button
              onClick={() => setModalNueva(true)}
              className="flex items-center gap-2 px-5 py-2 text-xs tracking-widest uppercase transition-all hover:opacity-80"
              style={{ background: '#2a1f14', color: '#c9a96e' }}
            >
              + Nueva galería
            </button>

            {/* Perfil */}
            <div className="relative">
              <button onClick={() => setMenuPerfil(!menuPerfil)}
                className="w-9 h-9 rounded-full border-2 flex items-center justify-center font-serif italic"
                style={{ borderColor: '#c9a96e', background: '#2a1f14', color: '#c9a96e' }}>
                M
              </button>
              {menuPerfil && (
                <div className="absolute right-0 top-12 w-48 border shadow-lg z-50" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                  {['Mi perfil', 'Configuración', 'Cerrar sesión'].map((op, i) => (
                    <button key={i} className="w-full text-left px-4 py-3 text-sm hover:opacity-70 border-b last:border-0" style={{ color: '#2a1f14', borderColor: '#e8d5bc' }}>
                      {op}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-8 py-8">

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Galerías activas', valor: '3', icon: '⊞' },
              { label: 'Total de fotos', valor: '73', icon: '◎' },
              { label: 'Descargas', valor: '41', icon: '↓' },
              { label: 'Favoritos', valor: '19', icon: '❤' },
            ].map((stat, i) => (
              <div key={i} className="p-5 border flex items-center gap-4 hover:shadow-sm transition-all" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                <span className="text-2xl" style={{ color: '#c9a96e' }}>{stat.icon}</span>
                <div>
                  <p className="font-serif text-3xl leading-none" style={{ color: '#2a1f14' }}>{stat.valor}</p>
                  <p className="text-xs tracking-wider uppercase mt-1" style={{ color: '#8a6e52' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filtros y vista */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              {['todas', 'activa', 'borrador'].map(f => (
                <button key={f} onClick={() => setFiltro(f)}
                  className="px-4 py-1.5 text-xs tracking-widest uppercase border transition-all"
                  style={{
                    background: filtro === f ? '#2a1f14' : 'transparent',
                    color: filtro === f ? '#c9a96e' : '#8a6e52',
                    borderColor: filtro === f ? '#2a1f14' : '#e8d5bc'
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setVista('grid')}
                className="w-8 h-8 flex items-center justify-center border transition-all"
                style={{ background: vista === 'grid' ? '#2a1f14' : 'transparent', color: vista === 'grid' ? '#c9a96e' : '#8a6e52', borderColor: '#e8d5bc' }}>
                ⊞
              </button>
              <button onClick={() => setVista('lista')}
                className="w-8 h-8 flex items-center justify-center border transition-all"
                style={{ background: vista === 'lista' ? '#2a1f14' : 'transparent', color: vista === 'lista' ? '#c9a96e' : '#8a6e52', borderColor: '#e8d5bc' }}>
                ≡
              </button>
            </div>
          </div>

          {/* Grid de galerías */}
          {vista === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {galeriasFiltradas.map(g => (
                <div key={g.id} className="border overflow-hidden hover:shadow-md transition-all group" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                  {/* Cover */}
                  <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ background: '#2a1f14' }}>
                    <CameraIcon size={50} color="#c9a96e44"/>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: 'rgba(42,31,20,0.7)' }}>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs tracking-widest uppercase" style={{ background: '#c9a96e', color: '#2a1f14' }}>Ver</button>
                        <button className="px-3 py-1.5 text-xs tracking-widest uppercase border" style={{ borderColor: '#c9a96e', color: '#c9a96e' }}>Editar</button>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-2 py-1 tracking-widest uppercase" style={{
                        background: g.estado === 'activa' ? '#c9a96e' : '#6b4c2a',
                        color: g.estado === 'activa' ? '#2a1f14' : '#f5ede0'
                      }}>{g.estado}</span>
                    </div>
                    {g.musica !== 'Sin música' && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1">
                        <span className="text-xs" style={{ color: '#c9a96e' }}>♪</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-serif text-lg mb-1" style={{ color: '#2a1f14' }}>{g.cliente}</h3>
                    <p className="text-xs mb-3" style={{ color: '#8a6e52' }}>{g.fecha}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <span className="text-xs" style={{ color: '#8a6e52' }}>◎ {g.fotos}</span>
                        <span className="text-xs" style={{ color: '#8a6e52' }}>↓ {g.descargas}</span>
                        <span className="text-xs" style={{ color: '#8a6e52' }}>❤ {g.vistas}</span>
                      </div>
                      <button className="text-xs" style={{ color: '#c9a96e' }}>🔗</button>
                    </div>
                    <p className="text-xs mt-2 truncate" style={{ color: '#c9a96e', opacity: 0.7 }}>♪ {g.musica}</p>
                  </div>
                </div>
              ))}

              {/* Card nueva galería */}
              <button onClick={() => setModalNueva(true)}
                className="border-2 border-dashed h-full min-h-64 flex flex-col items-center justify-center gap-3 hover:opacity-70 transition-all"
                style={{ borderColor: '#c9a96e' }}>
                <span className="text-3xl" style={{ color: '#c9a96e' }}>+</span>
                <span className="text-xs tracking-widest uppercase" style={{ color: '#8a6e52' }}>Nueva galería</span>
              </button>
            </div>
          ) : (
            /* Vista lista */
            <div className="flex flex-col gap-3">
              {galeriasFiltradas.map(g => (
                <div key={g.id} className="p-5 border flex items-center justify-between gap-4 hover:shadow-sm transition-all" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center" style={{ background: '#f5ede0' }}>
                      <CameraIcon size={24}/>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg" style={{ color: '#2a1f14' }}>{g.cliente}</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs" style={{ color: '#8a6e52' }}>{g.fecha}</span>
                        <span className="text-xs" style={{ color: '#8a6e52' }}>· {g.fotos} fotos</span>
                        <span className="text-xs" style={{ color: '#c9a96e' }}>♪ {g.musica}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-3 py-1 tracking-widest uppercase" style={{
                      background: g.estado === 'activa' ? '#2a1f14' : '#e8d5bc',
                      color: g.estado === 'activa' ? '#c9a96e' : '#8a6e52'
                    }}>{g.estado}</span>
                    <button className="text-xs px-4 py-2 border tracking-widest uppercase hover:opacity-70" style={{ borderColor: '#c9a96e', color: '#2a1f14' }}>Ver</button>
                    <button className="text-xs px-4 py-2 border tracking-widest uppercase hover:opacity-70" style={{ borderColor: '#e8d5bc', color: '#8a6e52' }}>Editar</button>
                    <button className="text-xs" style={{ color: '#c9a96e' }}>🔗</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal nueva galería */}
      {modalNueva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(42,31,20,0.8)' }}>
          <div className="w-full max-w-md border p-8" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl" style={{ color: '#2a1f14' }}>Nueva galería</h2>
              <button onClick={() => setModalNueva(false)} style={{ color: '#8a6e52' }}>✕</button>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Nombre del cliente', placeholder: 'Ej: María & Carlos', type: 'text' },
                { label: 'Fecha de sesión', placeholder: '', type: 'date' },
                { label: 'Contraseña de galería (opcional)', placeholder: 'Dejar vacío para galería pública', type: 'password' },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#8a6e52' }}>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder}
                    className="w-full px-0 py-2 border-b outline-none bg-transparent text-sm"
                    style={{ borderColor: '#c9a96e', color: '#2a1f14' }}/>
                </div>
              ))}
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#8a6e52' }}>Música de fondo</label>
                <select className="w-full py-2 border-b outline-none bg-transparent text-sm" style={{ borderColor: '#c9a96e', color: '#2a1f14' }}>
                  <option>Sin música</option>
                  <option>Perfect — Ed Sheeran</option>
                  <option>Thinking Out Loud</option>
                  <option>Subir archivo...</option>
                </select>
              </div>
              <button className="w-full py-3 text-xs tracking-widest uppercase mt-4 hover:opacity-80 transition-all" style={{ background: '#2a1f14', color: '#c9a96e' }}>
                Crear galería →
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs py-6 tracking-widest ml-16" style={{ color: '#c9a96e', opacity: 0.4 }}>
        ✦ FOTOGRAFÍA · ARTE · EMOCIÓN ✦
      </p>
    </div>
  )
}