import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';
import { Factura } from './Factura';

export interface ObraInstance extends Model {
    id: number;
    name: string;
    direccion: string;
    presupuesto: number;
    dateStart: Date;
}

export const Obra = db.define<ObraInstance>('Obra', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    presupuesto: {
        type: DataTypes.FLOAT
    },
    dateStart: {
        type: DataTypes.DATEONLY
    },
}, {
    tableName: 'obras',
    timestamps: false
});


