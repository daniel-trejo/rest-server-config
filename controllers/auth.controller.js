const { request, response } = require("express");
const Usuario = require('../models/usuario')
const bcriptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
    const { password, correo } = req.body

    // Verificar si el email exite
    

    // Verificar si usuaro esta activo

    try {
        const usuario = await Usuario.findOne({correo})

        if (!usuario){
            return res.status(400).json({
                msg: "Correo / Password no son correctos."
            })
        }

        if (!usuario.estado){
            return res.status(400).json({
                msg: "Correo / Password no son correctos. O el estado es inactivo."
            })
        }

        const validPasword =  bcriptjs.compareSync(password, usuario.password)
        if (!validPasword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta."
            })
        }

        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Algo salio mal"
        })
    }


}

module.exports = {
    login
}