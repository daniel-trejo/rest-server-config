const { request, response } = require("express")


const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const {rol, nombre} = req.usuario

    if ( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } no es administrador.`
        })
    }

    next()

}

const tieneRol = ( ...roles ) => {
    return (req = request, res = response, next) => {

        if (!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        const { rol } = req.usuario

        if ( !roles.includes(rol) ){
            return res.status(401).json({
                msg: `Se requiere que el usuario tenga uno de estos roles ${roles}`
            })
        }
        
        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}


