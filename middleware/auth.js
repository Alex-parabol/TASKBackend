const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //leemos el token del header
    const token = req.header('x-auth-token');
    console.log(token)
    console.log(req)
    // revisamos si no hay token
    if(!token){
        res.status(401).json({msg: 'No hay token, permiso no válido'})
    }

    // validamos el token

    try {
        const cifrado = jwt.verify(token, precess.env.SECRETA);
        req.usuario = cifrado.usuario;
        next()
    } catch (error) {
        res.status(401).json({msg: 'token no válido'})
    }
}