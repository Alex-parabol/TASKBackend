const express = require('express');
const router = express.Router();
const proyectoControllers = require('../controllers/proyectoControllers')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

// crea proyectos 
//api/proyectos
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
],
    auth,
    proyectoControllers.crearProyecto
)

router.get('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un email válido').isEmail(),
    check('password','El passowrd debe de tener al menos 6 caracteres').isLength({ min: 6})
],
    auth,
    proyectoControllers.crearProyecto
)
module.exports = router;