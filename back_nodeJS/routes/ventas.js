
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
    postVenta,
    ventaGet,
    getDetallesVenta,
    eliminarVenta,
    putVenta,
    platoGetVenta,
    getTotalVentasDelDia,
    ventaPath
} = require('../controllers/ventas');

const router = Router();

//--###########################--CRUD------#############################--
router.post('/',[validarJWT],postVenta);

// router.get('/',[validarJWT], ventaGet );//se necesita token
router.get('/',ventaGet );//se necesita token
router.get('/detalleventa/:venta_id', getDetallesVenta);
//router.get('/:id',[validarJWT], usersGetById ); 
router.delete('/:id',eliminarVenta );
// router.delete('/:id',[validarJWT],deleteUser );
router.put('/:id',putVenta );
router.get('/platoGetVenta/',platoGetVenta );
//--------------------------------------------------
router.get('/ventaTotalDia/',getTotalVentasDelDia );

router.patch('/', ventaPath );
//--###########################--HASTA AQUI------#############################--

module.exports = router;