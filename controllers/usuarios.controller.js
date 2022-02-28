const { response, request } = require('express')


const usuariosGet = (req = request, res = response) => {
    const query = req.query

    res.json({
        msg: 'get API - Controlador',
        query
    })
}

const usuariosPost = (req = request, res=response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req = request, res=response) => {

    const {id} = req.params

    res.json({
        msg: 'put API - Controlador',
        id
    })
}


const usuariosDelete = (req, res=response) => {
    res.json({msg: 'delete API - Controlador'})
}


const usuariosPatch = (req, res=response) => {
    res.json({msg: 'patch API - Controlador'})
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}