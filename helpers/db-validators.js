const Role = require("../models/role")
const Usuario = require( "../models/usuario" )

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if ( !existeRol ){
        throw new Error(`El rol ${rol} no es valido.`)
    }
}

const emailExiste = async ( correo = '') => {
    const existeMail = await Usuario.findOne({correo})
    if ( existeMail ){
        throw new Error(`El correo ${correo} ya existe.`)
    }

}

const existeUsuarioID = async ( id ) => {
    const existeUsuario = await Usuario.findById(id)
    
    if ( !existeUsuario ){
        throw new Error(`El ID ${id} no existe.`)
    }

} 

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioID
}