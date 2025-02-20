
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { esRoleValido, emailExiste, existsUserById, esPersonValido } = require('../helpers/db-validators');

const { 
    platoPost,
    platoGet,
    eliminarPlato,
    putPlatoState,
    platoGetById,
    putPlato,
    platoPath
} = require('../controllers/platos');

const router = Router();

//--###########################--CRUD------#############################--

const multer = require('multer');
const upload = multer({ dest: 'img/' })

router.post('/', upload.single('imagen'), [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
], platoPost);

router.get('/',[validarJWT], platoGet );//se necesita token

//-----eliminar plato---
router.delete('/:id', eliminarPlato );
//-----editar estado plato---
router.put('/estado/:id', putPlatoState );
//-----getById de plato para recuperar datos---
router.get('/getId/:id', platoGetById );
//-------EDITAR PLATO----
router.put('/:id', upload.single('imagen'),putPlato);

router.patch('/', platoPath );
//--###########################--HASTA AQUI------#############################--

module.exports = router;