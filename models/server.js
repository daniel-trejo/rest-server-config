const express = require('express')
const cors = require('cors')
const { dbConn } = require('../database/config')

class Server {
    
    constructor (){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosApi = '/api/usuarios'
        this.authPath = '/api/auth'


        // Conectar a la base de datos
        this.conectarDb()

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()


        this.listen()


    }

    async conectarDb(){
        await dbConn()
    }

    middlewares(){
        // Cors
        this.app.use(cors())

        // Directorio Público
        this.app.use( express.static('public') )

        // Lectura y Parseo
        this.app.use( express.json() )
    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usuariosApi, require('../routes/user.routes'))

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escucando en http://localhost:${this.port}`)
        })
    }

}

module.exports  = Server