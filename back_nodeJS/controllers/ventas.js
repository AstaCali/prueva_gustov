const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleventa');
const Plato = require('../models/plato');
//const DetalleVenta = require('../models/detalleventa');
// const DetalleVenta = require('../models/detalleventa');
const dbConnection = require('../database/config');
const moment = require('moment'); //--PARA FECHA
const { Op } = require('sequelize');

//--registro de venta con detalle--
const postVenta = async (req, res) => {
    // const { total, carrito, user_id, person_id } = req.body; // Desestructuramos los datos recibidos
    const { total, carrito } = req.body;
    const id = req.id;
    console.log('LLEGA_ID_USER---PARA--VENTA',id);
    // Inicia una transacción
    const t = await dbConnection.transaction();

    if (!carrito || carrito.length === 0) {
        return res.status(400).json({ msg: 'El carrito no puede estar vacío' });
    }
  
    try {
      // Crear la venta
      const venta = await Venta.create({
        fecha : new Date,
        total,
        user_id : id,
        person_id: null,
      }, { transaction: t });
  
      // Crear los detalles de la venta (con el id de la venta recién creada)
      const detalles = carrito.map(item => ({
        venta_id: venta.id,  // Relacionar con el id de la venta
        plato_id: item.id,  // El plato_id de cada producto
        cantidad: item.cantidad,  // La cantidad de ese plato
        subtotal: item.preciosubtotal,  // El subtotal de ese producto
      }));
  
      // Registrar los detalles de la venta
      await DetalleVenta.bulkCreate(detalles, { transaction: t });
  
      // Confirmar la transacción si todo va bien
      await t.commit();
  
      // Responder con éxito
      res.status(201).json({
        ok: true,
        venta,
        detalles,
      });
    } catch (error) {
      // Revertir los cambios si hay algún error
      await t.rollback();
  
      console.error('Error al registrar la venta:', error);
      res.status(500).json({ msg: 'Error al registrar la venta' });
    }
};

//----Lista de ventas--
const ventaGet = async (req, res) => {
    try {
        const desde = isNaN(Number(req.query.desde)) ? 0 : Number(req.query.desde);
        const limite = isNaN(Number(req.query.limite)) ? 6 : Number(req.query.limite);
        
        // Capturar los parámetros de fecha desde el query
        const fechaInicio = req.query.fechaInicio; // Ejemplo: '2025-02-18'
        const fechaFin = req.query.fechaFin; // Ejemplo: '2025-02-18'

        let whereCondition = {}; // Condición inicial vacía

        // Si el usuario envía un rango de fechas, lo agregamos al filtro
        if (fechaInicio && fechaFin) {
            whereCondition.fecha = {
                [Op.between]: [`${fechaInicio} 00:00:00`, `${fechaFin} 23:59:59`] // Incluye todo el rango del día
            };
        } else if (fechaInicio) {
            whereCondition.fecha = {
                [Op.gte]: `${fechaInicio} 00:00:00` // Desde la fecha dada en adelante
            };
        } else if (fechaFin) {
            whereCondition.fecha = {
                [Op.lte]: `${fechaFin} 23:59:59` // Hasta la fecha dada
            };
        }

        // Contar las ventas que cumplen la condición
        const total = await Venta.count({ where: whereCondition });

        // Obtener las ventas con paginación y filtro
        const ventas = await Venta.findAll({
            offset: desde,
            limit: limite,
            where: whereCondition,
            order: [['fecha', 'DESC']] // Ordenar por fecha de más reciente a más antigua
        });

        res.status(200).json({
            ok: true,
            total, // Total de registros encontrados
            ventas, // Se envía directamente
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};
//---getById vENTA LISTA DETALLE ----
const getDetallesVenta = async (req, res) => {
    try {
        const { venta_id } = req.params;

        // Verificamos si el `venta_id` es válido
        if (!venta_id || isNaN(Number(venta_id))) {
            return res.status(400).json({ msg: "El ID de la venta es inválido." });
        }

        // Obtener los detalles de la venta con los datos del plato
        const detalles = await DetalleVenta.findAll({
            where: {
                venta_id: venta_id, // Filtrar por `venta_id`
            },
            include: [
                {
                    model: Plato, 
                    attributes: ['nombre','precio'], // Solo obtenemos el nombre del plato
                }
            ],
            order: [['id', 'ASC']] // Opcional: Ordenar los detalles
        });

        // Verificamos si se encontraron detalles
        if (detalles.length === 0) {
            return res.status(404).json({ msg: "No se encontraron detalles para esta venta." });
        }
        // Calcular la suma total de los subtotales
        const sumaSubtotal = detalles.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
        // Responder con los detalles, incluyendo el nombre del plato
        res.status(200).json({
            ok: true,
            sumaSubtotal,
            detalles: detalles.map(item => ({
                id: item.id,
                venta_id: item.venta_id,
                plato_id: item.plato_id,
                nombre: item.Plato.nombre,  // Accedemos al nombre del plato
                cantidad: item.cantidad,
                subtotal: item.subtotal,
                precio: item.Plato.precio
            }))
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error interno del servidor." });
    }
};
//----ELIMINAR VENTA---
const eliminarVenta = async (req, res) => {
    const { id } = req.params; // Suponiendo que el ID de la venta se pasa como parámetro en la URL

    try {
        // Buscar la venta por el ID
        const venta = await Venta.findByPk(id);

        if (!venta) {
            return res.status(404).json({ msg: 'Venta no encontrada.' });
        }

        // Eliminar la venta (esto también eliminará los detalles asociados debido a la cascada)
        await venta.destroy();

        res.status(200).json({ msg: 'Venta eliminada correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la venta.' });
    }
};
//---EDITAR VENTA----
const putVenta = async (req, res) => {
    const { id } = req.params;  // ID de la venta a editar
    const { total, carrito } = req.body;  
    const user_id = req.id;  // Usuario autenticado

    console.log('EDITANDO_VENTA_ID:', id);

    // Inicia una transacción
    const t = await dbConnection.transaction();

    try {
        // Buscar la venta en la base de datos
        const venta = await Venta.findByPk(id);

        if (!venta) {
            return res.status(404).json({ msg: 'Venta no encontrada' });
        }

        // Actualizar los datos de la venta (si se proporcionan nuevos valores)
        await venta.update(
            { total, user_id }, 
            { transaction: t }
        );

        // Si hay carrito, actualizar los detalles de la venta
        if (carrito && carrito.length > 0) {
            // Eliminar los detalles anteriores
            await DetalleVenta.destroy({ where: { venta_id: id }, transaction: t });

            // Crear nuevos detalles de venta
            const nuevosDetalles = carrito.map(item => ({
                venta_id: id,
                //plato_id: item.plato_id,
                plato_id: item.plato_id || item.id,
                cantidad: item.cantidad,
                subtotal: item.preciosubtotal,
            }));

            // Insertar nuevos detalles en la base de datos
            await DetalleVenta.bulkCreate(nuevosDetalles, { transaction: t });
        }

        // Confirmar la transacción
        await t.commit();

        // Responder con la venta actualizada
        res.status(200).json({
            ok: true,
            msg: 'Venta actualizada correctamente',
            venta,
        });

    } catch (error) {
        // Revertir la transacción en caso de error
        await t.rollback();
        console.error('Error al editar la venta:', error);
        res.status(500).json({ msg: 'Error al editar la venta' });
    }
};
//----LISTA DE PLATOS CON ESTADO ACTIVOSS-----
const platoGetVenta = async (req, res) => {
    try {
      const desde = isNaN(Number(req.query.desde)) ? 0 : Number(req.query.desde);
      const limite = isNaN(Number(req.query.limite)) ? 6 : Number(req.query.limite);
      const search = req.query.search || "";
  
      const whereCondition = {
        estado: true, // Filtra solo los que tienen estado en true
        ...(search && { nombre: { [Op.like]: `%${search}%` } }) // Agrega búsqueda si hay un término
      };
  
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
//--##Total de venta del dia ya colocado-##-----
const getTotalVentasDelDia = async (req, res) => {
    try {
        const hoyInicio = moment().startOf("day").format("YYYY-MM-DD 00:00:00"); 
        const hoyFin = moment().endOf("day").format("YYYY-MM-DD 23:59:59"); 

        console.log('Fecha inicio del día:', hoyInicio);
        console.log('Fecha fin del día:', hoyFin);

        // Contar la cantidad de ventas realizadas hoy
        const cantidadVentas = await Venta.count({
            where: {
                fecha: {
                    [Op.between]: [hoyInicio, hoyFin],
                },
            },
        });

        res.status(200).json({
            ok: true,
            cantidadVentas: cantidadVentas || 0 // Cantidad de ventas realizadas hoy
        });

    } catch (error) {
        console.error("Error al obtener la cantidad de ventas del día:", error);
        res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};

const ventaPath = (req, res = response) => {
    res.json({
        msg: 'patch API - ventaPath'
    });
}

module.exports = {
    postVenta,
    ventaGet,
    getDetallesVenta,
    eliminarVenta,
    putVenta,
    platoGetVenta,
    getTotalVentasDelDia,
    ventaPath
}
