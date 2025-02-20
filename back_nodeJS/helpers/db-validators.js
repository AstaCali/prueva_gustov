const Role = require('../models/role');
const User = require('../models/user');
const Person = require('../models/person');
// const Category = require('../models/category');
// const Plate = require('../models/plate');
// const Car = require('../models/car');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const esPersonValido = async(person = '') => {

    const existePersona = await Person.findOne({ person });
    if ( !existePersona ) {
        throw new Error(`La persona ${ person } no está registrado en la BD`);
    }
}

// const esPlateValido = async(plate = '') => {

//     const existePlate = await Plate.findOne({ plate });
//     if ( !existePlate ) {
//         throw new Error(`La placa ${ person } no está registrado en la BD`);
//     }
// }

// const esCarValido = async(car = '') => {

//     const existeCar = await Car.findOne({ car });
//     if ( !existeCar ) {
//         throw new Error(`La persona ${ car } no está registrado en la BD`);
//     }
// }

const emailExiste = async( email = '' ) => {

    // Verificar si el email existe
    const existeEmail = await User.findOne({ where: { email: email } });
    if ( existeEmail ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

const existsUserById = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await User.findByPk(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
    //-----------------------esta aparte-------------
    // if (existeUsuario.rol !== 'Administrador') {
    //     throw new Error(`El usuario con id ${id} no tiene los permisos necesarios para realizar esta acción`);
    // }
    // ---------------------hasta aqui-------
}
// const esCategoiaValido = async(categoria = '') => {

//     const existeCategoria = await Category.findOne({ categoria });
//     if ( !existeCategoria ) {
//         throw new Error(`La categoria ${ categoria } no está registrado en la BD`);
//     }
// }


module.exports = {
    esRoleValido,
    emailExiste,
    existsUserById,
    esPersonValido,
    // esCategoiaValido,
    // esPlateValido,
    // esCarValido
}

