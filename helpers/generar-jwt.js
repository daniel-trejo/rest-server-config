const jwt = require('jsonwebtoken')

const generarJWT = async ( uid = '') => {

    return new Promise( (resolve, reject)=>{
        const paylod = { uid }

        jwt.sign(paylod, process.env.SECRET,{
            expiresIn: '4h'
        }, (err, token)=>{
            if (err){
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve( token )
        })
    })

}


module.exports = {
    generarJWT
}