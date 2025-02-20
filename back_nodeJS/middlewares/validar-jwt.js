const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Role = require('../models/role');
//const Role =require('../models/role')
//const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {
    
    //const token = req.header('Authorization').split(' ')[1];
    // Leer el Token
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        req.id = id;

        // leer el usuario que corresponde al uid
        //const usuario = await User.findById( id );
        const usuario = await User.findByPk( id,{include:Role} );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        //********prueba---------- */
        // req.usuario = {
        //     // id: usuario.id,
        //     // email: usuario.email,
        //     // nombre: usuario.nombre,
        //     Role: usuario.Role.name
        //     //rol: usuario.role.nombre // agregar el nombre del rol en la respuesta
        // };
        /**--------hasta aqui--- */
        // Verificar si el uid tiene estado true
        // if ( !usuario.estado ) {
        //     return res.status(401).json({
        //         msg: 'Token no válido - usuario con estado: false'
        //     })
        // }
        
        
        //req.usuario = usuario; // esto comente
        //console.log('Usuario autenticado:', usuario);
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}