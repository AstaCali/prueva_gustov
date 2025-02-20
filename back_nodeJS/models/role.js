const  dbConnection  = require('../database/config');
const { DataTypes } = require('sequelize');

const Role=dbConnection.define(
    "Roles", {
        id:{ 
            type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement: true 
        },
        name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
    }
);

module.exports = Role;