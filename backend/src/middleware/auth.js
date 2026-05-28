const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
  const auth = req.headers.authorization

  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token requerido' })

  const token = auth.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.fotografo = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}

module.exports = verificarToken