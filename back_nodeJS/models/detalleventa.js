const  dbConnection  = require('../database/config');
const { DataTypes } = require("sequelize");
const Venta = require("./venta");
const Plato = require("./plato");

const DetalleVenta = dbConnection.define("DetalleVentas", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    venta_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    plato_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    cantidad: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    subtotal: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    }
});

// Definir relaciones
DetalleVenta.belongsTo(Venta, { foreignKey: "venta_id", onDelete: "CASCADE" }); // Si se elimina una venta, se eliminan los detalles
DetalleVenta.belongsTo(Plato, { foreignKey: "plato_id" });

module.exports = DetalleVenta;