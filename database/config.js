const mongoose = require('mongoose')

const dbConn = async () => {
    // Just for ...
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreteIndex: true,
            //usefindandmodify: false
        })

        console.log('Base de datos online.')
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos.')
    }

}


module.exports = {
    dbConn
}