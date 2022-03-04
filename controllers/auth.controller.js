const { request, response } = require("express");
const Usuario = require('../models/usuario')
const bcriptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");

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


const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body

    try {
        const {correo, nombre, email} = await googleVerify(id_token)
        
        let usuario = await Usuario.findOne({correo})

        if (!usuario){
            const data = {
                nombre, 
                correo,
                password: '**',
                rol: 'USER_ROL',
                //img,
                google: true
            }

            usuario = new Usuario( data )
            await usuario.save()
        }

        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado.'
            })
        }
        // Si el usuario de Google ==  False 
        const token = await generarJWT( usuario.id )


        res.json({
            usuario, 
            token
        })
    } catch (error) {
        console.log(error)
        res. json({
            msg: 'El token no se pudo validar.'
        })
    }
    

}

module.exports = {
    login,
    googleSignIn
}