const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');
const Role = require('../models/role');
const Person = require('../models/person');

const { generarJWT } = require('../helpers/generar-jwt');
const { Model } = require('sequelize');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');
//const Dentist = require('../models/dentist');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
      
        // Verificar si el email existe
        const user = await User.findOne({ where: { email }});
        console.log(user);
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario no registrado'
            });
        }

        // SI el usuario está activo
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'Usuario no activo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'El password es incorrecto'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.id );

        const userLogin = {
            id: user.id,
            email: user.email,
            //password: user.password,
            // Role: user.Role,
            // Person: user.Person,
            state : user.state
        };
      
        //res.json([userToSend]);

        res.json({
            //user,
            userLogin,
            ok: true,
            token,
            menu: getMenuFrontEnd(user.role_id)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}
//-----Remo♂8e Token--
const renewToken = async(req, res = response) => {

    const uid = req.id;
    console.log('LLEGA ID#!!:', uid);
    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    //const usuario = await User.findByPk( uid );
    //const usuario = await User.findOne({ uid, include:[{model:Role},{model:Person}]});
    const usuario = await User.findByPk(uid,{ include:[{model:Role},{model: Person}]});

    // Verificar si el usuario es un odontólogo
    // const odontologo = await Dentist.findOne({
    //     where: { users_id: uid }
    // });

    const userLoginrenew = {
        id: usuario.id,
        email: usuario.email,
        //password: user.password,
        //odontologoId: odontologo ? odontologo.id : 0, // Incluir el ID del odontólogo si existe
        role: usuario.Role,
        person: usuario.Person,
        state : usuario.state
    };

    res.json({
        ok: true,
        token,
        //usuario
        "usuario": userLoginrenew,
        menu: getMenuFrontEnd(usuario.role_id)
        // "role": usuario.Role,
        // "person": usuario.Person,
        // "email": usuario.email
        //usuario
    });

}

//-----Remo♂8e Token--


module.exports = {
    login,
    renewToken
}
