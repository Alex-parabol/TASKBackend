const Proyecto = require('../models/Proyecto')
const { validationResult} = require('express-validator')

exports.crearProyecto = async (req,res)=>{

    //revisamos si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json( { errores: errores.array()})
    }

    try {
        //creamos nuevo proyecto
        const proyecto = new Proyecto(req.body)
        // Guardamos al usuario creador via jwt
        proyecto.creador = req.usuario.id
        //guardamos el proyecto
        proyecto.save();
        res.json(proyecto)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}