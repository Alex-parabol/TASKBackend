//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth');

// Iniciar sesión
// api/auth

router.post('/',
[
    check('email','Agrega un email válido').isEmail(),
    check('password','El passowrd debe de tener al menos 6 caracteres').isLength({ min: 6})
],
authController.autenticarUsuario
);

//obtine el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado

);

module.exports = router;