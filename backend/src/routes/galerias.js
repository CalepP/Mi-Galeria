const express = require('express')
const router = express.Router()
const verificarToken = require('../middleware/auth')
const {
  crearGaleria,
  obtenerGalerias,
  obtenerGaleria,
  obtenerGaleriaPorSlug,
  verificarPassword,
  actualizarGaleria,
  eliminarGaleria
} = require('../controllers/galeriasController')

router.get('/slug/:slug', obtenerGaleriaPorSlug)
router.post('/slug/:slug/verificar', verificarPassword)

router.use(verificarToken)
router.get('/', obtenerGalerias)
router.post('/', crearGaleria)
router.get('/:id', obtenerGaleria)
router.put('/:id', actualizarGaleria)
router.delete('/:id', eliminarGaleria)

module.exports = router