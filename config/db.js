const mongoose = require('mongoose');

//requerimos dotenv y le pasamos el path del archivo de variables.
require('dotenv').config({ path: 'variables.env'})

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB conectada')
    } catch (error) {
        console.log(error);
        process.exit(1);// si hay un error, detiene la app.
    }
}


module.exports = conectarDB