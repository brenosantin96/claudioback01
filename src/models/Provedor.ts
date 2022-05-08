import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';
import { Factura } from './Factura';

export interface ProvedorInstance extends Model {
    id: number;
    name: string;
}

export const Provedor = db.define<ProvedorInstance>('Provedor', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'provedores',
    timestamps: true,
    createdAt: true,
    updatedAt: false
});


