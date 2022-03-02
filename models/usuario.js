/*usuario = {
    nombre: 'abcd',
    correo: 'abcd@abcd.com',
    password: '12345678',
    img: 'https://img.com',
    rol: 'abcd',
    estado : false,
    google: true
}*/

const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
       // enum: ['ADMIN_ROLE','USER_ROL'] 
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
    google: {
        type: Boolean,
        required: true,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject()

    return usuario
 }


module.exports = model('Usuario', UsuarioSchema)