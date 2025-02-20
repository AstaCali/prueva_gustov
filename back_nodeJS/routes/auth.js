const { Router } = require('express');
const { check } = require('express-validator');
const { login,renewToken } = require('../controllers/auth');

const {
    validarJWT,
} = require('../middlewares');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
],login );

router.get( '/renew',
    validarJWT,
    renewToken
)

module.exports = router;