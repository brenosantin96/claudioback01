"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obra = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Obra = mysql_1.db.define('Obra', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    presupuesto: {
        type: sequelize_1.DataTypes.FLOAT
    },
    dateStart: {
        type: sequelize_1.DataTypes.DATEONLY
    },
}, {
    tableName: 'obras',
    timestamps: false
});
