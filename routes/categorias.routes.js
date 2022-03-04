const {Router} = require('express')
const {check} = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth.controller')
const { crearCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias.controller')

const { existeCategoria } = require('../helpers/db-validators')

const { validarJWT, validarCampos } = require('../middlewares')


const router = Router()

// Obtener todas las categorias - público
router.get('/', [
    validarJWT,
    validarCampos
],obtenerCategorias)

// Obtener categoría por ID
router.get('/:id',[
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria)

// Crear una nueva categoría - Privado cualqueir persona con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// Actualizar categoria por ID - Privado 
router.put('/:id', (req, res)=>{
    res.json('put - id')
})

// Borrar: Solo un usuario Admin, marcar estado a inactvo
router.delete('/:id', (req, res)=>{
    res.json('delete - id')
})












module.exports = router