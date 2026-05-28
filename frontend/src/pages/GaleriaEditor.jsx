import { useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

const CameraIcon = ({ size = 28, color = '#c9a96e' }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none">
    <rect x="5" y="20" width="90" height="55" rx="8" stroke={color} strokeWidth="4" fill="none"/>
    <rect x="30" y="8" width="30" height="14" rx="4" stroke={color} strokeWidth="3" fill="none"/>
    <circle cx="50" cy="47" r="16" stroke={color} strokeWidth="4" fill="none"/>
    <circle cx="50" cy="47" r="7" stroke={color} strokeWidth="3" fill="none"/>
    <rect x="12" y="28" width="10" height="7" rx="2" fill={color} opacity="0.5"/>
  </svg>
)

const musicaOpciones = [
  'Sin música',
  'Perfect — Ed Sheeran',
  'Thinking Out Loud — Ed Sheeran',
  'A Thousand Years — Christina Perri',
  'Can\'t Help Falling in Love — Elvis',
  'Speechless — Dan + Shay',
  'Subir archivo propio...',
]

export default function GaleriaEditor() {
  const [tab, setTab] = useState('fotos') // fotos | ajustes | actividad
  const [fotos, setFotos] = useState([])
  const [seleccionadas, setSeleccionadas] = useState([])
  const [modoSeleccion, setModoSeleccion] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [musica, setMusica] = useState('Sin música')
  const [musicaArchivo, setMusicaArchivo] = useState(null)
  const [ajustes, setAjustes] = useState({
    nombre: 'Jhosmar & Eithan',
    fecha: '2025-05-15',
    password: '',
    descargas: true,
    favoritos: true,
    watermark: false,
    visible: true,
  })

  const musicaRef = useRef()

  // Dropzone para fotos
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (archivos) => {
      const nuevas = archivos.map((f, i) => ({
        id: Date.now() + i,
        url: URL.createObjectURL(f),
        nombre: f.name,
        size: f.size,
        file: f,
      }))
      setFotos(prev => [...prev, ...nuevas])
    }
  })

  const toggleSeleccion = (id) => {
    setSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const eliminarSeleccionadas = () => {
    setFotos(prev => prev.filter(f => !seleccionadas.includes(f.id)))
    setSeleccionadas([])
    setModoSeleccion(false)
  }

  const copiarLink = () => {
    navigator.clipboard.writeText(`https://migaleria.com/g/${ajustes.nombre.toLowerCase().replace(/\s/g, '-')}`)
    alert('¡Link copiado!')
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5ede0' }}>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 flex flex-col items-center py-6 gap-6 z-50 border-r" style={{ background: '#2a1f14', borderColor: '#3d2b1a' }}>
        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4" style={{ borderColor: '#c9a96e' }}>
          <span className="font-serif italic text-sm" style={{ color: '#c9a96e' }}>MG</span>
        </div>
        {[
          { icon: '←', label: 'Volver' },
          { icon: '⊞', label: 'Galerías' },
          { icon: '⚙', label: 'Config' },
        ].map((item, i) => (
          <button key={i} title={item.label}
            className="w-10 h-10 flex items-center justify-center rounded transition-all text-lg"
            style={{ color: '#6b4c2a' }}>
            {item.icon}
          </button>
        ))}
      </div>

      <div className="ml-16">

        {/* Topbar */}
        <div className="flex items-center justify-between px-8 py-4 border-b sticky top-0 z-40" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
          <div>
            <p className="text-xs tracking-widest uppercase" style={{ color: '#c9a96e' }}>Editando galería</p>
            <h1 className="font-serif text-2xl" style={{ color: '#2a1f14' }}>{ajustes.nombre}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: '#8a6e52' }}>{fotos.length} fotos</span>
            <button onClick={copiarLink}
              className="flex items-center gap-2 px-4 py-2 border text-xs tracking-widest uppercase hover:opacity-70 transition-all"
              style={{ borderColor: '#c9a96e', color: '#2a1f14' }}>
              🔗 Copiar link
            </button>
            <button className="px-5 py-2 text-xs tracking-widest uppercase hover:opacity-80 transition-all"
              style={{ background: '#2a1f14', color: '#c9a96e' }}>
              Publicar →
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-8" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
          {[
            { id: 'fotos', label: 'Fotos' },
            { id: 'ajustes', label: 'Ajustes' },
            { id: 'actividad', label: 'Actividad' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-6 py-3 text-xs tracking-widest uppercase border-b-2 transition-all"
              style={{
                borderColor: tab === t.id ? '#c9a96e' : 'transparent',
                color: tab === t.id ? '#2a1f14' : '#8a6e52'
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="px-8 py-8">

          {/* TAB: FOTOS */}
          {tab === 'fotos' && (
            <div>
              {/* Zona de subida */}
              <div {...getRootProps()} className="border-2 border-dashed p-10 text-center mb-8 cursor-pointer transition-all"
                style={{ borderColor: isDragActive ? '#c9a96e' : '#d6b88a', background: isDragActive ? '#c9a96e11' : '#fdfaf6' }}>
                <input {...getInputProps()} />
                <CameraIcon size={40} color={isDragActive ? '#c9a96e' : '#d6b88a'}/>
                <p className="font-serif text-xl mt-4" style={{ color: isDragActive ? '#c9a96e' : '#8a6e52' }}>
                  {isDragActive ? 'Suelta las fotos aquí' : 'Arrastra tus fotos aquí'}
                </p>
                <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#8a6e52' }}>
                  o haz clic para seleccionar · JPG, PNG, WEBP
                </p>
              </div>

              {/* Barra de acciones */}
              {fotos.length > 0 && (
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => { setModoSeleccion(!modoSeleccion); setSeleccionadas([]) }}
                      className="px-4 py-1.5 text-xs tracking-widest uppercase border transition-all"
                      style={{ borderColor: '#c9a96e', color: modoSeleccion ? '#fdfaf6' : '#2a1f14', background: modoSeleccion ? '#2a1f14' : 'transparent' }}>
                      {modoSeleccion ? `${seleccionadas.length} seleccionadas` : 'Seleccionar'}
                    </button>
                    {modoSeleccion && seleccionadas.length > 0 && (
                      <button onClick={eliminarSeleccionadas}
                        className="px-4 py-1.5 text-xs tracking-widest uppercase border transition-all"
                        style={{ borderColor: '#c9a96e', color: '#c9a96e' }}>
                        Eliminar
                      </button>
                    )}
                    {modoSeleccion && (
                      <button onClick={() => setSeleccionadas(fotos.map(f => f.id))}
                        className="px-4 py-1.5 text-xs tracking-widest uppercase"
                        style={{ color: '#8a6e52' }}>
                        Seleccionar todas
                      </button>
                    )}
                  </div>
                  <p className="text-xs tracking-widest uppercase" style={{ color: '#8a6e52' }}>
                    {fotos.length} foto{fotos.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Grid de fotos */}
              {fotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {fotos.map(foto => (
                    <div key={foto.id}
                      className="relative aspect-square overflow-hidden group cursor-pointer"
                      style={{ background: '#e8d5bc' }}
                      onClick={() => !modoSeleccion && setLightbox(foto)}>
                      <img src={foto.url} alt={foto.nombre} className="w-full h-full object-cover transition-transform group-hover:scale-105"/>

                      {/* Overlay hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all flex items-end p-2"
                        style={{ background: 'linear-gradient(to top, rgba(42,31,20,0.7), transparent)' }}>
                        <p className="text-xs truncate w-full" style={{ color: '#f5ede0' }}>{foto.nombre}</p>
                      </div>

                      {/* Checkbox selección */}
                      {modoSeleccion && (
                        <div className="absolute top-2 left-2" onClick={e => { e.stopPropagation(); toggleSeleccion(foto.id) }}>
                          <div className="w-5 h-5 border-2 flex items-center justify-center"
                            style={{ borderColor: '#c9a96e', background: seleccionadas.includes(foto.id) ? '#c9a96e' : 'rgba(253,250,246,0.8)' }}>
                            {seleccionadas.includes(foto.id) && <span className="text-xs" style={{ color: '#2a1f14' }}>✓</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <CameraIcon size={60} color="#d6b88a"/>
                  <p className="font-serif text-xl mt-4" style={{ color: '#8a6e52' }}>Aún no hay fotos</p>
                  <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#c9a96e' }}>Arrastra fotos arriba para empezar</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: AJUSTES */}
          {tab === 'ajustes' && (
            <div className="max-w-2xl space-y-8">

              {/* Info básica */}
              <div className="p-6 border" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                <h3 className="font-serif text-lg mb-5" style={{ color: '#2a1f14' }}>Información de la galería</h3>
                <div className="space-y-5">
                  {[
                    { label: 'Nombre del cliente', key: 'nombre', type: 'text', placeholder: 'Ej: María & Carlos' },
                    { label: 'Fecha de sesión', key: 'fecha', type: 'date' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#8a6e52' }}>{field.label}</label>
                      <input type={field.type} value={ajustes[field.key]} placeholder={field.placeholder}
                        onChange={e => setAjustes({ ...ajustes, [field.key]: e.target.value })}
                        className="w-full py-2 border-b outline-none bg-transparent text-sm"
                        style={{ borderColor: '#c9a96e', color: '#2a1f14' }}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Música */}
              <div className="p-6 border" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                <h3 className="font-serif text-lg mb-5" style={{ color: '#2a1f14' }}>🎵 Música de fondo</h3>
                <div className="space-y-4">
                  {musicaOpciones.map(op => (
                    <label key={op} className="flex items-center gap-3 cursor-pointer">
                      <div className="w-4 h-4 border-2 rounded-full flex items-center justify-center"
                        style={{ borderColor: '#c9a96e', background: musica === op ? '#c9a96e' : 'transparent' }}>
                        {musica === op && <div className="w-2 h-2 rounded-full" style={{ background: '#2a1f14' }}/>}
                      </div>
                      <span className="text-sm" style={{ color: '#2a1f14' }}
                        onClick={() => {
                          setMusica(op)
                          if (op === 'Subir archivo propio...') musicaRef.current?.click()
                        }}>{op}</span>
                    </label>
                  ))}
                  <input ref={musicaRef} type="file" accept="audio/*" className="hidden"
                    onChange={e => { if (e.target.files[0]) setMusicaArchivo(e.target.files[0].name) }}/>
                  {musicaArchivo && (
                    <p className="text-xs" style={{ color: '#c9a96e' }}>♪ {musicaArchivo}</p>
                  )}
                </div>
              </div>

              {/* Privacidad */}
              <div className="p-6 border" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                <h3 className="font-serif text-lg mb-5" style={{ color: '#2a1f14' }}>🔐 Privacidad</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#8a6e52' }}>Contraseña de galería</label>
                    <input type="password" value={ajustes.password} placeholder="Dejar vacío para galería pública"
                      onChange={e => setAjustes({ ...ajustes, password: e.target.value })}
                      className="w-full py-2 border-b outline-none bg-transparent text-sm"
                      style={{ borderColor: '#c9a96e', color: '#2a1f14' }}/>
                  </div>
                  {[
                    { key: 'visible', label: 'Galería visible públicamente' },
                    { key: 'descargas', label: 'Permitir descargas' },
                    { key: 'favoritos', label: 'Permitir marcar favoritas' },
                    { key: 'watermark', label: 'Aplicar marca de agua' },
                  ].map(toggle => (
                    <div key={toggle.key} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#2a1f14' }}>{toggle.label}</span>
                      <button onClick={() => setAjustes({ ...ajustes, [toggle.key]: !ajustes[toggle.key] })}
                        className="w-11 h-6 rounded-full transition-all relative"
                        style={{ background: ajustes[toggle.key] ? '#c9a96e' : '#e8d5bc' }}>
                        <div className="w-5 h-5 rounded-full absolute top-0.5 transition-all"
                          style={{ background: '#fdfaf6', left: ajustes[toggle.key] ? '22px' : '2px' }}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 text-xs tracking-widest uppercase hover:opacity-80 transition-all"
                style={{ background: '#2a1f14', color: '#c9a96e' }}>
                Guardar cambios →
              </button>
            </div>
          )}

          {/* TAB: ACTIVIDAD */}
          {tab === 'actividad' && (
            <div className="max-w-2xl">
              <div className="p-6 border" style={{ background: '#fdfaf6', borderColor: '#e8d5bc' }}>
                <h3 className="font-serif text-lg mb-5" style={{ color: '#2a1f14' }}>Actividad reciente</h3>
                {[
                  { icon: '↓', texto: 'Cliente descargó 8 fotos', tiempo: 'Hace 2 horas' },
                  { icon: '❤', texto: 'Cliente marcó 5 favoritas', tiempo: 'Hace 5 horas' },
                  { icon: '👁', texto: 'Galería visitada', tiempo: 'Hace 1 día' },
                  { icon: '↓', texto: 'Cliente descargó 3 fotos', tiempo: 'Hace 2 días' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0" style={{ borderColor: '#e8d5bc' }}>
                    <span className="text-lg" style={{ color: '#c9a96e' }}>{act.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: '#2a1f14' }}>{act.texto}</p>
                      <p className="text-xs" style={{ color: '#8a6e52' }}>{act.tiempo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(20,14,8,0.95)' }}
          onClick={() => setLightbox(null)}>
          <img src={lightbox.url} alt={lightbox.nombre}
            className="max-w-full max-h-full object-contain"
            style={{ border: '1px solid rgba(201,169,110,0.2)' }}
            onClick={e => e.stopPropagation()}/>
          <button className="absolute top-6 right-6 w-10 h-10 border flex items-center justify-center"
            style={{ borderColor: 'rgba(201,169,110,0.5)', color: '#c9a96e' }}
            onClick={() => setLightbox(null)}>✕</button>
          <p className="absolute bottom-6 text-xs tracking-widest" style={{ color: '#8a6e52' }}>{lightbox.nombre}</p>
        </div>
      )}

      <p className="text-center text-xs py-6 tracking-widest ml-16" style={{ color: '#c9a96e', opacity: 0.4 }}>
        ✦ FOTOGRAFÍA · ARTE · EMOCIÓN ✦
      </p>
    </div>
  )
}