const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token){
        return res.status(401).json({
            msg: "No hay token en la petición."
        })
    }
    
    try {

        const {uid} = jwt.verify(token, process.env.SECRET)

        const usuario = await Usuario.findById(uid)

        if (!usuario){
            return res.status(401).json({
                msg: 'ERR(0002) Usuario no existe'
            })
        }

        if (!usuario.estado){
            return res.status(401).json({
                msg: 'ERR(0001) Token no valido'
            })
        }

        req.usuario = usuario

        next()  
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })    
    }

    
}


module.exports = {
    validarJWT
}