// const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const Person = require('../models/person');
const User = require("../models/user");
const Role = require("../models/role");
//const Usuario = require('../models/usuario');
// const Propietario = require('../models/propietario');

const personGetById = async(req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(404).json({ msg: 'Persona no existe' });
        }

        res.json({
            //total: usuarios.count,
            //usuarios: usuarios.rows
            "ok": true,
            person
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}
// const personGet = async(req, res) => {
//     try {
//         //const { id } = req.params;
//         const person = await Person.findAll();

//         res.json({
//             "ok": true,
//             person
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: "Error en el servidor"
//         });
//     }
// }
const personGet = async (req, res) => {
    try {
        // Buscar usuarios con el rol de 'PACIENTE'
        const users = await User.findAll({
            include: [
                {
                    model: Person,
                },
                {
                    model: Role,
                    where: { name: 'PACIENTE' } // Filtrar por rol 'PACIENTE'
                }
            ]
        });

        // Mapear los datos obtenidos para enviar la respuesta
        const personsToSend = users.map(user => {
            const personData = user.Person;
            return {
                id: personData.id,
                name: personData.name,
                last_name: personData.last_name
            };
        });

        res.json({
            ok: true,
            person: personsToSend
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
};
//----Crear persona----
const personPost  = async (req, res) => {
    const { name, last_name, ci, celular, gender } = req.body;
    //---- PARA AGARRAR EL ID y SABER QUIEN LO ESTA REGISTRANDO AL LOEARSE.
    // const id = req.id;
    // console.log('LLEGA_ID_USER',id);
  
    try {
      // Crear la persona
      const person = await Person.create({ name, last_name, ci, celular, gender });
  
      res.json({
        "ok": true,
        person
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el usuario" });
    }
};
//-----2024 ---CONtINUA BUSQUEDA DE PERSONA PARA LA COTIZACION--
// const personTodo = async(req, res = response ) =>{
//     const busqueda = req.params.busqueda;
//     const regex = new RegExp( busqueda, 'i');

//     const persons = await Person.find({name: regex});

//     res.json({
//         ok: true,
//         "personas":persons,
//     })
// }
const personTodo = async (req, res) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    try {
        //const busqueda = req.params.busqueda;
        const persons = await Person.findAll({
            // where: {
            //     name: {
            //         [Sequelize.Op.iLike]: `%${busqueda}%` // Utilizamos Sequelize.Op.iLike para realizar una búsqueda insensible a mayúsculas y minúsculas
            //     }
            // }
            where: {
                name: {
                    [Op.like]: `%${busqueda}%` // Utilizamos Sequelize.Op.iLike para realizar una búsqueda insensible a mayúsculas y minúsculas
                }
            }
        });
        res.json({
            ok: true,
            personas: persons
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// const editarPersona = async (req, res) => {
//   const { id } = req.params;
//   const { nombre, apellido, ci, genero } = req.body;

//   try {
//     // Actualizar la persona
//     await Persona.update({ nombre, apellido, ci, genero }, { where: { id } });

//     // Buscar la persona actualizada
//     const updatedPersona = await Persona.findOne({ where: { id } });

//     // Verificar si la persona es usuario y actualizar si es necesario
//     const usuario = await Usuario.findOne({ where: { persona_id: id } });
//     if (usuario) {
//       await Usuario.update({ 
//         nombre: updatedPersona.nombre,
//         apellido: updatedPersona.apellido,
//         ci: updatedPersona.ci,
//         genero: updatedPersona.genero
//       }, { where: { persona_id: id } });
//     }

//     // Verificar si la persona es propietario y actualizar si es necesario
//     const propietario = await Propietario.findOne({ where: { persona_id: id } });
//     if (propietario) {
//       await Propietario.update({ 
//         nombre: updatedPersona.nombre,
//         apellido: updatedPersona.apellido,
//         ci: updatedPersona.ci,
//         genero: updatedPersona.genero
//       }, { where: { persona_id: id } });
//     }

//     res.json(updatedPersona);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Hubo un error al actualizar a la persona' });
//   }
// }

// //solo se puede eliminar si pesrsona no esta relacionado con niniguna tabla
// const eliminarPersona = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Buscar la persona por su id
//     const persona = await Persona.findOne({ where: { id } });

//     // Verificar si la persona está relacionada con algún usuario
//     const usuario = await Usuario.findOne({ where: { persona_id: id } });

//     // Verificar si la persona está relacionada con algún propietario
//     const propietario = await Propietario.findOne({ where: { persona_id: id } });

//     if (usuario || propietario) {
//       // Si la persona está relacionada con alguna entidad, retornar un mensaje de error
//       return res.status(400).json({ message: 'No se puede eliminar la persona porque está relacionada con otra entidad' });
//     }

//     // Si la persona no está relacionada con ninguna entidad, eliminarla
//     await Persona.destroy({ where: { id } });

//     res.json({ message: 'La persona ha sido eliminada correctamente' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Hubo un error al eliminar la persona' });
//   }
// }

const personPath = (req, res = response) => {
    res.json({
        msg: 'patch API - PersonPatch'
    });
}

module.exports = {
    personPath,
    personGetById,
    personGet,
    personPost,
    personTodo
    // crearPersona,
    // editarPersona,
    // eliminarPersona,
    //personPacienteGet,

}