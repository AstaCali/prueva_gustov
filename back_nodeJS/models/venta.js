const  dbConnection  = require('../database/config');
const { DataTypes } = require('sequelize');
const User = require("./user");
const Person = require('./person');

const Venta = dbConnection.define("Ventas", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    fecha: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    total: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    person_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    }
});

// Definir relaciones
Venta.belongsTo(User, { foreignKey: "user_id" });  // Un empleado realiza una venta
Venta.belongsTo(Person, { foreignKey: "person_id" });  // Un cliente opcional está vinculado a la venta

module.exports = Venta;