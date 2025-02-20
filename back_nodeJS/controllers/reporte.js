const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleventa');
const Plato = require('../models/plato');
const dbConnection = require('../database/config');
const { Op } = require('sequelize');

const repVentaDetalleGet = async (req, res) => {
    try {
        const { fechaInicio, fechaFin, plato_id } = req.query;
        const desde = isNaN(Number(req.query.desde)) ? 0 : Number(req.query.desde);
        const limite = isNaN(Number(req.query.limite)) ? 20 : Number(req.query.limite);

        let whereVenta = {};
        let whereDetalle = {};

        // Filtrar por fecha en Venta
        if (fechaInicio && fechaFin) {
            whereVenta.fecha = {
                [Op.between]: [`${fechaInicio} 00:00:00`, `${fechaFin} 23:59:59`]
            };
        } else if (fechaInicio) {
            whereVenta.fecha = { [Op.gte]: `${fechaInicio} 00:00:00` };
        } else if (fechaFin) {
            whereVenta.fecha = { [Op.lte]: `${fechaFin} 23:59:59` };
        }

        // Filtrar por plato_id en DetalleVenta
        if (plato_id) {
            whereDetalle.plato_id = plato_id;
        }
        // Contar las ventas que cumplen la condición
        const total = await DetalleVenta.count({ where: whereDetalle });
        // Buscar los detalles de venta
        const detalles = await DetalleVenta.findAll({
            where: whereDetalle,
            offset: desde,
            limit: limite,
            include: [
                {
                    model: Venta,
                    where: whereVenta, //  Sin alias
                    attributes: ["id", "fecha", "total"]
                },
                {
                    model: Plato,
                    attributes: ["nombre"] // Sin alias
                }
            ],
            order: [[Venta, "fecha", "DESC"]] // Sin alias
        });

        // Mapear la respuesta
        const detallesMapeados = detalles.map(detalle => ({
            fecha: detalle.Venta.fecha,
            nombre: detalle.Plato.nombre,
            cantidad: detalle.cantidad,
            subtotal: detalle.subtotal
        }));

        res.status(200).json({
            ok: true,
            total,
            detalles:detallesMapeados
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};
//----LISTA DE PLATOS PARA SLECCIONAR EN REPORTE---
const platoGetRep = async (req, res) => {
    try {
      const plato = await Plato.findAll();
  
      res.json({
        "ok": true,
        "plato":plato
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hubo un error al obtener la lista platos menu' });
    }
};

const reportePath = (req, res = response) => {
    res.json({
        msg: 'patch API - reportePath'
    });
}

module.exports = {
    repVentaDetalleGet,
    platoGetRep,
    reportePath
}