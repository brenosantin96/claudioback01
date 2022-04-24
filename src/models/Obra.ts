import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

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
    },
    direccion: {
        type: DataTypes.STRING,
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