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
    repVentaDetalleGet,
    platoGetRep,
    reportePath
} = require('../controllers/reporte');

const router = Router();

//--###########################--CRUD------#############################--
// router.post('/',[validarJWT],postVenta);
router.get('/',repVentaDetalleGet );//se necesita token
router.get('/platos',platoGetRep );
// router.get('/',ventaGet );//se necesita token
// router.get('/detalleventa/:venta_id', getDetallesVenta);
// router.delete('/:id',eliminarVenta );


router.patch('/', reportePath );
//--###########################--HASTA AQUI------#############################--

module.exports = router;