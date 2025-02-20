const dbConnection  = require('../database/config');
const { DataTypes } = require('sequelize');
const Role = require('./role');
const Person = require('./person');

const User=dbConnection.define(
    "Users", {
        id:{ 
            type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement: true 
        },
        role_id:  { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        person_id:  { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        // end_date: { //--fecha inicio
        //     type: DataTypes.STRING,
        //     allowNull: false, // O true si puede ser nulo
        //     defaultValue: DataTypes.NOW // Establece la fecha actual como valor por defecto
        // },
        // entry_date: { // la cantidad de vacaciones
        //     type: DataTypes.STRING,
        //     allowNull: false, // O true si puede ser nulo
        // },
        email : { 
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true 
        },
        password:  { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
);

User.belongsTo(Role, {foreignKey:'role_id'});
User.belongsTo(Person, {foreignKey:'person_id'});
//---
module.exports = User;