const  dbConnection  = require('../database/config');
const { DataTypes } = require('sequelize');


const Person=dbConnection.define(
    "Persons", {
        id:{ 
            type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement: true 
        },
        name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        last_name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        ci:{ 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        cellphone:{ 
            type: DataTypes.INTEGER,  
            allowNull: false 
        },
        gender: {
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isIn: [['M', 'F']] // solo se aceptan los valores 'V' y 'M'
            }
        },
    }
);
module.exports = Person;