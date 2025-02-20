const  dbConnection  = require('../database/config');
const { DataTypes } = require('sequelize');

const Plato = dbConnection.define("Platos", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    precio: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    imagen: { 
        type: DataTypes.STRING, // Almacenará la URL o ruta de la imagen
        allowNull: true 
    },
    estado: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }
});

module.exports = Plato;