const supabase = require('../config/supabase')

const crearGaleria = async (req, res) => {
  try {
    const { nombre, fecha, password, musica } = req.body
    const fotografo_id = req.fotografo.id

    const slug = nombre.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      + '-' + Date.now()

    const { data, error } = await supabase
      .from('galerias')
      .insert([{ fotografo_id, nombre, slug, fecha, password, musica }])
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const obtenerGalerias = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('galerias')
      .select('*, fotos(count)')
      .eq('fotografo_id', req.fotografo.id)
      .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const obtenerGaleria = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('galerias')
      .select('*, fotos(*)')
      .eq('id', id)
      .single()

    if (error) return res.status(404).json({ error: 'Galería no encontrada' })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const obtenerGaleriaPorSlug = async (req, res) => {
  try {
    const { slug } = req.params

    const { data, error } = await supabase
      .from('galerias')
      .select('*, fotos(*)')
      .eq('slug', slug)
      .single()

    if (error) return res.status(404).json({ error: 'Galería no encontrada' })

    // No enviar password al cliente
    const { password, ...galeria } = data
    res.json(galeria)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const verificarPassword = async (req, res) => {
  try {
    const { slug } = req.params
    const { password } = req.body

    const { data, error } = await supabase
      .from('galerias')
      .select('password')
      .eq('slug', slug)
      .single()

    if (error) return res.status(404).json({ error: 'Galería no encontrada' })

    if (data.password && data.password !== password)
      return res.status(401).json({ error: 'Contraseña incorrecta' })

    res.json({ acceso: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const actualizarGaleria = async (req, res) => {
  try {
    const { id } = req.params
    const campos = req.body

    const { data, error } = await supabase
      .from('galerias')
      .update(campos)
      .eq('id', id)
      .eq('fotografo_id', req.fotografo.id)
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const eliminarGaleria = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('galerias')
      .delete()
      .eq('id', id)
      .eq('fotografo_id', req.fotografo.id)

    if (error) return res.status(500).json({ error: error.message })
    res.json({ mensaje: 'Galería eliminada' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  crearGaleria,
  obtenerGalerias,
  obtenerGaleria,
  obtenerGaleriaPorSlug,
  verificarPassword,
  actualizarGaleria,
  eliminarGaleria
}