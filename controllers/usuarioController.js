const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


exports.crearUsuario = async (req, res) => {
    //revisamos si hay errores en la validación

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json( { errores: errores.array()})
    }

    //extraemos email y password con destructuring
    const { email, password } = req.body
    try {
        //validamos que el usuario sea único
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya está registrado'})
        }
        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        // hasheamos el password con salt (generador de hash únicos, para passwords iguales) 
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt)
        console.log(usuario)

        //guardamos usuario

        await usuario.save()

        //creamos con el payload y firmamos el JsonWebToken

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn:7200
        }, (error, token)=> {
            if(error) throw error;
            //mensaje de confirmación de guardado
            res.json({token : token})
        })

        
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error')
    }
}