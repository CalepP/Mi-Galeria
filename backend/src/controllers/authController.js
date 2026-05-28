const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const supabase = require('../config/supabase')

const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password)
      return res.status(400).json({ error: 'Todos los campos son requeridos' })

    // Verificar si ya existe
    const { data: existe } = await supabase
      .from('fotografos')
      .select('id')
      .eq('email', email)
      .single()

    if (existe)
      return res.status(400).json({ error: 'El email ya está registrado' })

    // Encriptar password
    const hash = await bcrypt.hash(password, 10)

    // Crear fotógrafo
    const { data, error } = await supabase
      .from('fotografos')
      .insert([{ nombre, email, password: hash }])
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })

    // Generar token
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      fotografo: { id: data.id, nombre: data.nombre, email: data.email }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Email y contraseña requeridos' })

    // Buscar fotógrafo
    const { data, error } = await supabase
      .from('fotografos')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data)
      return res.status(401).json({ error: 'Credenciales incorrectas' })

    // Verificar password
    const valido = await bcrypt.compare(password, data.password)
    if (!valido)
      return res.status(401).json({ error: 'Credenciales incorrectas' })

    // Generar token
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      fotografo: { id: data.id, nombre: data.nombre, email: data.email }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const perfil = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('fotografos')
      .select('id, nombre, email, created_at')
      .eq('id', req.fotografo.id)
      .single()

    if (error) return res.status(404).json({ error: 'No encontrado' })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { registro, login, perfil }