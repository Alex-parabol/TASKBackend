const Usuario = require('../models/Usuario')


exports.crearUsuario = async (req, res) => {
    try {
        let usuario;
        //crea el nuevo usuario
        usuario = new Usuario(req.body);
        console.log(usuario)

        //guardamos usuario

        await usuario.save()

        //mensaje de confirmación de guardado
        res.send('usuario creado correctamente')
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error')
    }
}