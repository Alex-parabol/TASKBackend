//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const authController = require('../controllers/authController')

// crea un usuario
// api/auth

router.post('/',
[
    check('email','Agrega un email válido').isEmail(),
    check('password','El passowrd debe de tener al menos 6 caracteres').isLength({ min: 6})
],
authController.autenticarUsuario
);

module.exports = router;