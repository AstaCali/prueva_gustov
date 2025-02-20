const Plato = require('../models/plato');
const { Op } = require('sequelize');
const dbConnection = require('../database/config');
const fs = require('fs');

const multer = require('multer');
const DetalleVenta = require('../models/detalleventa');
const upload = multer({ dest: 'img/' })

/*const platoPost = async (req, res) => {
  const { nombre, precio} = req.body;

  // Inicia una transacción
  const t = await dbConnection.transaction();

  try {

    // Crear la persona dentro de la transacción
    const plato = await Plato.create({
      nombre,
      precio,
      imagen: null,
      estado : true
    }, { transaction: t });

    // Confirmar (commit) la transacción si todo sale bien
    await t.commit();

    // Guardar la imagen adjunta usando Multer
    upload.single('imagen')(req, res, async (err) => {
      if (err) {
        console.error('Error al guardar la imagen:', err);
      }

      if (req.file) {
        // Obtener la información del archivo adjunto
        const originalName = req.file.originalname;
        //const imageName = generateUniqueFileName(originalName);

        // Mover el archivo adjunto al directorio deseado con el nombre único
        const imagePath = `img/${originalName}`;
        fs.renameSync(req.file.path, imagePath);

        // Actualizar el campo car_image en el automóvil
        plato.imagen = originalName;
        await plato.save();
      }

      res.json({
        platos: plato
      });
    });

  } catch (error) {
    // Revertir los cambios en caso de error (rollback)
    await t.rollback();

    console.error('Error al crear plato:', error);
    res.status(500).json({ msj: "Error al crear plato" });
  }
};*/

const platoPost = async (req, res) => {
  const { nombre, precio } = req.body;
  let imagePath = null;

  // Inicia una transacción
  const t = await dbConnection.transaction();

  try {
    // Guardar la imagen si existe
    if (req.file) {
      const originalName = req.file.originalname;
      imagePath = `img/${originalName}`;
      //imagePath = originalName;
      fs.renameSync(req.file.path, imagePath);
    }

    // Crear el registro en la base de datos dentro de la transacción
    const plato = await Plato.create({
      nombre,
      precio,
      imagen: imagePath, // Guardar la ruta de la imagen
      estado: true
    }, { transaction: t });

    // Confirmar (commit) la transacción si todo sale bien
    await t.commit();

    res.json({ plato });

  } catch (error) {
    // Revertir los cambios en caso de error (rollback)
    await t.rollback();

    console.error('Error al crear plato:', error);
    res.status(500).json({ msj: "Error al crear plato" });
  }
};

/*const platoGet = async (req, res = response) => {
  try {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 6;
    const { search } = req.query;
    let whereCondition = {};

    if (search) {
      whereCondition = {
        [Op.or]: [
          { '$Plato.nombre$': { [Op.like]: `%${search}%` } }
        ]
      };
    }

    // Realiza el conteo de todos los usuarios que coincidan con la condición
    const total = await Plato.count({
      where: whereCondition
    });

    // Obtén los usuarios con las mismas condiciones
    const platos = await Plato.findAll({
      //include: [{ model: Role }, { model: Person }],
      offset: desde,
      limit: limite,
      where: whereCondition
    });

    const platoToSend = platos.map(plato => {
      return {
        nombre: plato.nombre,
        precio: plato.precio,
        imagen: plato.imagen,
        estado: plato.estado
      };
    });

    res.status(200).json({
      ok: true,
      total, // Incluye el total en la respuesta
      platos: platoToSend
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};*/

const platoGet = async (req, res) => {
  try {
    const desde = isNaN(Number(req.query.desde)) ? 0 : Number(req.query.desde);
    const limite = isNaN(Number(req.query.limite)) ? 6 : Number(req.query.limite);
    const search = req.query.search || "";

    const whereCondition = search
      ? { nombre: { [Op.like]: `%${search}%` } }
      : {}; // Si no hay búsqueda, no aplicamos filtro.

    // Contar los registros que cumplen la condición
    const total = await Plato.count({ where: whereCondition });

    // Obtener los platos con paginación y filtro
    const platos = await Plato.findAll({
      offset: desde,
      limit: limite,
      where: whereCondition,
    });

    res.status(200).json({
      ok: true,
      total, // Total de registros encontrados
      platos, // Se envía directamente sin necesidad de map()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};
//--eliminar--
const eliminarPlato = async (req, res) => {
  const { id } = req.params; // Obtener el ID del plato desde la URL

  try {
      // Verificar si el plato está relacionado con alguna venta
      const existeRelacion = await DetalleVenta.findOne({
          where: { plato_id: id }
      });

      if (existeRelacion) {
          return res.status(400).json({
              ok: false,
              msg: "Está relacionado no se puede borrar."
          });
      }

      // Eliminar el plato si no tiene relaciones
      const resultado = await Plato.destroy({ where: { id } });

      if (resultado === 0) {
          return res.status(404).json({
              ok: false,
              msg: "Plato no encontrado."
          });
      }

      res.json({
          ok: true,
          msg: "Plato eliminado correctamente."
      });

  } catch (error) {
      console.error("Error al eliminar el plato:", error);
      res.status(500).json({ ok: false, msg: "Error interno del servidor." });
  }
};
//-----EDITAR ESTADO--
const putPlatoState = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; // Cambiado de 'state' a 'estado'

  try {
    // Buscar el plato por ID
    const plato = await Plato.findByPk(id);

    if (!plato) {
      return res.status(404).json({ message: "No existe el menú con el ID proporcionado" });
    }

    // Actualizar el campo 'estado'
    plato.estado = estado;

    await plato.save();

    res.json({
      ok: true,
      message: "Estado actualizado correctamente",
      plato
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el estado del menú" });
  }
};
//---getById para recuperar datos de ese ID para recuperar datos --
const platoGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const plato = await Plato.findByPk(id);

    if (!plato) {
      return res.status(404).json({ msg: 'El plato no existe' });
    }

    const platoToSend = {
      id: plato.id,
      nombre: plato.nombre,
      precio: plato.precio,
      imagen: plato.imagen
    };

    res.json({ 
      "ok": true,
      "plato":platoToSend
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
//----EDITAR PLATO--
const putPlato = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  // Inicia una transacción
  const t = await dbConnection.transaction();

  try {
    // Buscar el plato en la base de datos
    const plato = await Plato.findByPk(id);
    if (!plato) {
      return res.status(404).json({ message: "No existe el plato con el ID proporcionado" });
    }

    let imagePath = plato.imagen; // Mantiene la imagen actual si no se sube una nueva

    // Verifica si se ha subido un nuevo archivo
    if (req.file) {
      const originalName = req.file.originalname;
      const newImagePath = `img/${originalName}`;

      // Elimina la imagen anterior si existe
      if (plato.imagen && fs.existsSync(plato.imagen)) {
        fs.unlinkSync(plato.imagen);
      }

      // Mueve la nueva imagen
      fs.renameSync(req.file.path, newImagePath);
      imagePath = newImagePath; // Actualiza la imagen
    }

    // Actualizar el plato dentro de la transacción
    await plato.update(
      { nombre, precio, imagen: imagePath },
      { transaction: t }
    );

    // Confirmar la transacción
    await t.commit();

    res.json({ message: "Plato actualizado correctamente", plato });

  } catch (error) {
    await t.rollback();
    console.error('Error al actualizar plato:', error);
    res.status(500).json({ message: "Error al actualizar el plato" });
  }
};

module.exports = { putPlato };

const platoPath = (req, res = response) => {
    res.json({
        msg: 'patch API - platoPath'
    });
}

module.exports = {
  platoPost,
  platoGet,
  eliminarPlato,
  putPlatoState,
  platoGetById,
  putPlato,
  platoPath
}
