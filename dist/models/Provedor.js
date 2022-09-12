"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provedor = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Provedor = mysql_1.db.define('Provedor', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'provedores',
    timestamps: true,
    createdAt: true,
    updatedAt: false
});
