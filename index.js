const express = require('express');
const conectarDB = require('./config/db');


//creamos el server

const app = express();

//conectamos a la base de datos

conectarDB();

// Habilitamos express.json

app.use(express.json({
    extended:true
}))

//creamos un puerto de variable de entorno, la llamamos PORT ya que heroku así lo pide.
const PORT = process.env.PORT || 4000;

//importamos rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));


// lanzamos app

app.listen(PORT, ()=> {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})