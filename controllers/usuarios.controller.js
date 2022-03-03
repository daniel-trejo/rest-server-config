const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    })

    // Verificar si el usuario existe

    /* Esta verificacion se cambia a las validaciones de Base datos
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado.'
        })
    }*/

    // Encriptar la sontraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)



    await usuario.save()

    res.json(usuario)
}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    // Validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}


const usuariosDelete = async (req = require , res = response) => {
    const { id } = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    const usuarioAutenticado = req.usuario




    res.json({
        usuario
    })
}


const usuariosPatch = (req, res = response) => {
    res.json({ msg: 'patch API - Controlador' })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}