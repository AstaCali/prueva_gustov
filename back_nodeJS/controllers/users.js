const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

//const { sequelize } = require('sequelize');

const { where } = require('sequelize');
const Role = require('../models/role');
const Person = require('../models/person');
// const Propietor = require('../models/proprietor');
const User = require('../models/user');

//const { generarJWT } = require('../helpers/jwt');
const { generarJWT } = require('../helpers/generar-jwt');
const dbConnection = require('../database/config');

//--###########################-- CRUD DE USUARIO------##################-

const usersPost = async (req, res) => {
  const { role_id, email, password, name, last_name, ci, cellphone, gender } = req.body;

  // Inicia una transacción
  const t = await dbConnection.transaction();

  try {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // Calcular los días de vacaciones basados en la fecha de inicio
    //const diasVacaciones = calcularDiasVacaciones(end_date);

    // Crear la persona dentro de la transacción
    const person = await Person.create({
      name,
      last_name,
      ci,
      cellphone,
      gender
    }, { transaction: t });

    // Crear el usuario dentro de la transacción
    const user = await User.create({
      role_id,
      //end_date, // Fecha de inicio del empleado
      //entry_date: diasVacaciones, // Días de vacaciones calculados
      email,
      password: hashedPassword,
      person_id: person.id,
      state: true
    }, { transaction: t });

    // Confirmar (commit) la transacción si todo sale bien
    await t.commit();

    // Generar el TOKEN - JWT
    const token = await generarJWT(user.id);

    res.status(201).json({
      user,
      person,
      token
    });

  } catch (error) {
    // Revertir los cambios en caso de error (rollback)
    await t.rollback();

    console.error('Error al crear el usuario:', error);
    res.status(500).json({ msj: "Error al crear el usuario" });
  }
};
const usersGet = async (req, res = response) => {
  try {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 6;
    const { search } = req.query;
    let whereCondition = {};

    if (search) {
      whereCondition = {
        [Op.or]: [
          { '$Person.name$': { [Op.like]: `%${search}%` } },
          { '$Person.last_name$': { [Op.like]: `%${search}%` } }
        ]
      };
    }

    // Realiza el conteo de todos los usuarios que coincidan con la condición
    const total = await User.count({
      include: [{ model: Person }],
      where: whereCondition
    });

    // Obtén los usuarios con las mismas condiciones
    const users = await User.findAll({
      include: [{ model: Role }, { model: Person }],
      offset: desde,
      limit: limite,
      where: whereCondition
    });

    const userToSend = users.map(user => {
      return {
        name: user.Person.name,
        last_name: user.Person.last_name,
        ci: user.Person.ci,
        cellphone: user.Person.cellphone,
        gender: user.Person.gender,

        id: user.id,
        name_role: user.Role.name,
        //end_date: user.end_date,// fecha inicio
        //entry_date: user.entry_date, // dia que tiene de vacaciones para tomar
        email: user.email,
        //role_id: user.Role.id,
        state: user.state,
      };
    });

    res.status(200).json({
      ok: true,
      total, // Incluye el total en la respuesta
      users: userToSend
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

//---RECUPRAR DATOS PARA EDITAR UN GetByID--
const usersGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: Role }, { model: Person }],
    });

    if (!user) {
      return res.status(404).json({ msg: 'El user no existe' });
    }

    const userToSend = {
      id: user.id,
      //password: user.password,
      role_id: user.Role.id,
      //end_date: user.end_date,
      email: user.email,
      name: user.Person.name,
      last_name: user.Person.last_name,
      ci: user.Person.ci,
      cellphone: user.Person.cellphone,
      gender: user.Person.gender,
      //state: user.state,

    };

    res.json({ 
      "ok": true,
      "user":userToSend
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const userPut = async (req, res) => {
  const { id } = req.params;
  const { role_id, email, password, name, last_name, ci, cellphone, gender } = req.body;

  // Inicia una transacción
  //const t = await sequelize.transaction();
  const t = await dbConnection.transaction();

  try {
    // Buscar el usuario
    const user = await User.findByPk(id, { include: [{ model: Person }] });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Encriptar la nueva contraseña si se proporciona
    let hashedPassword = user.password; // Mantener la contraseña actual si no se actualiza
    if (password) {
      const salt = bcryptjs.genSaltSync();
      hashedPassword = bcryptjs.hashSync(password, salt);
    }

    // Calcular los días de vacaciones basados en la nueva fecha de inicio (end_date)
    //const diasVacaciones = calcularDiasVacaciones(end_date);

    // Actualizar la persona dentro de la transacción
    await user.Person.update({
      name,
      last_name,
      ci,
      cellphone,
      gender
    }, { transaction: t });

    // Actualizar el usuario dentro de la transacción
    await user.update({
      role_id,
      //end_date, // Actualizar la fecha de inicio del empleado
      //entry_date: diasVacaciones, // Recalcular los días de vacaciones
      email,
      password: hashedPassword,
      state: user.state // Mantener el estado actual
    }, { transaction: t });

    // Confirmar (commit) la transacción si todo sale bien
    await t.commit();

    // Generar el TOKEN - JWT si se actualiza la contraseña (opcional)
    const token = await generarJWT(user.id);

    res.status(200).json({
      user,
      token
    });

  } catch (error) {
    // Revertir los cambios en caso de error (rollback)
    await t.rollback();

    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

//--eliminar usaurio--

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el usuario por id
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "user no encontrado" });
    }

    // Si no está relacionado, se puede eliminar el user y su correspondiente registro en la tabla PERSONA
    await user.destroy();
    const person = await Person.findOne({ where: { id: user.person_id } });
    await person.destroy();

    res.json({ msg: 'user eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al eliminar el usuario' });
  }
};
//------------------estado---------------------------------------
const updateUserState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "No existe un usuario con el ID proporcionado" });
    }

    // Actualizar el campo 'state' del usuario
    user.state = state;

    await user.save();

    res.json({
      "ok": true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el estado del usuario" });
  }
};
//--###########################--HASTA AQUI------##################-
const usuariosPatch = (req, res = response) => {
  res.json({
      msg: 'patch API - usuariosPatch'
  });
}

module.exports = {

  updateUserState,
  usuariosPatch,
  //-----
  //usersGetPerson,
  //----##--
  usersPost,
  usersGet,
  usersGetById,
  userPut,
  deleteUser,
}