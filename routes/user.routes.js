const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios.controller')

const { esRoleValido,
    emailExiste,
    existeUsuarioID } = require('../helpers/db-validators')

const { validarCampos,
    validarJWT,
    tieneRol,
    esAdminRole } = require('../middlewares')

const router = Router()


router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    check('password', 'El password es obligatorio y debe contener mas de 6 letras.').isLength({ min: 6 }),
    //check('correo','El correo ingresado no es un correo.').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol','No es un rol valido.').isIn(['ADMIN_ROLE','USER_ROL']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router