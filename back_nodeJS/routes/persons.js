const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarJWT,
    // validarCampos,
    // esAdminRole,
    // tieneRole
} = require('../middlewares');

const router = Router();
const {
    personPath,
    personGetById,
    personGet,
    personPost,
    personTodo
    // crearPersona,
    // editarPersona,
    // eliminarPersona
} = require('../controllers/persons');

router.get('/:id', personGetById);

router.get('/', personGet );

router.post('/',[
    //validarJWT,
    check('name', 'El nombre persona es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido de persona es obligatorio').not().isEmpty(),
    check('ci', 'El CI persona es obligatorio').not().isEmpty(),
    check('celular', 'El celular de persona es obligatorio').not().isEmpty(),
    check('gender', 'El genero de persona es obligatorio').not().isEmpty()
], personPost );

//----BUSCADOR---
router.get('/general/:busqueda', validarJWT, personTodo);

// router.put('/:id',[
//     check('nombre', 'El nombre persona es obligatorio').not().isEmpty(),
//     check('apellido', 'El apellido de persona es obligatorio').not().isEmpty(),
//     check('ci', 'El CI persona es obligatorio').not().isEmpty(),
//     check('genero', 'El genero de persona es obligatorio').not().isEmpty()
// ], editarPersona );

// router.delete('/:id', eliminarPersona );

router.patch('/', personPath );


module.exports = router;