const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')

exports.autenticarUsuario = async (req,res) => {
    //revisamos si hay errores en la validación

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json( { errores: errores.array()})
    }

    //extraemos email y password de req

    const { email, password } = req.body;

    try {
        //revisamos que el usuario esté registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json( {msg: 'El usuario no existe'})
        }
        //revisamos el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'})
        }

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //si todo es correcto creamos y firmamos el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn:7200
        }, (error, token)=> {
            if(error) throw error;
            //mensaje de confirmación de guardado
            res.json({token : token})
        })

    } catch (error) {
        console.log(error)
    }
}