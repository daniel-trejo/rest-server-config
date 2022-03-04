const { response, request } = require("express");
const {Categoria} = require('../models')

// Obtener categorias / Paginado / Mostrar: Total / populate
const obtenerCategorias = async (req = request, res = response ) =>{

    const { limite = 10,  desde = 0 } = req.query

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find({estado: true})
        .populate('usuario')
        .skip(desde)
        .limit(limite)
    ])

    res.status(200).json({
        total, 
        categorias
    })
}

// Obtener categoria /  populate
const obtenerCategoria = async (req = request, res = response ) =>{
    const {id} = req.params
    const categoria = await Categoria
                            .findById( id )
                            .populate({ 
                                path: 'usuario', 
                                select: ['nombre', 'correo', 'rol']
                            })

    res.status(200).json({
        categoria
    })

} 
 
const crearCategoria = async (req = request, res = response)=>{
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})

    if (categoriaDB){
        res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    // Generar la data
    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data)
    await categoria.save()

    res.status(201).json(
        categoria
    )
}

// Actualiza categoria / 

// Borrar Categoria / Cambio de estado


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria
}