"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Factura = mysql_1.db.define('Factura', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    dateFactura: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    valor: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
    //  provedor_id: {
    //     fk 
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: Provedor,
    //         key: 'id'
    //     }
    //  },
    //  obra_id: {
    //      //fk
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //        model: Obra,
    //        key: 'id'
    //    }
    // }
}, {
    tableName: 'facturas',
    timestamps: false
});
//Factura.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync deu erro", err)});
