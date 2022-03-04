const express = require('express')
const cors = require('cors')
const { dbConn } = require('../database/config')

class Server {
    
    constructor (){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
        }



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

        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.usuarios, require('../routes/user.routes'))
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'))
        

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escucando en http://localhost:${this.port}`)
        })
    }

}

module.exports  = Server