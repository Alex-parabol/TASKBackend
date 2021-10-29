const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crear una tarea
// api/tareas
router.post('/', 
    auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//obtener las tareas del proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatoria').not().isEmpty()
    ],
    tareaController.actualizarTarea
)

router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)
module.exports = router;