// //const { response, request } = require('express');
// //const bcryptjs = require('bcryptjs');

const Role = require('../models/role');

const rolesPath = (req, res = response) => {
    res.json({
        msg: 'patch API - rolesPath'
    });
}
const roleGet = async (req, res) => {
    try {
      const listRol = await Role.findAll();
  
      res.json({
        "ok": true,
        "roles":listRol
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Hubo un error al obtener la lista de roles' });
    }
};

module.exports = {
  // createRole,
  // editarPut,
  roleGet,
  //deleteRole,
  
  rolesPath

}
//---CONSULTA PARA INSER◘4AR DATOS--
// INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) 
// VALUES (NULL, 'ADMINISTRADOR', '2024-07-09 20:38:34.000000', '2024-07-09 20:38:34.000000'), 
//       (NULL, 'USER', '2024-07-09 20:38:34.000000', '2024-07-09 20:38:34.000000');