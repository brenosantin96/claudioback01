import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface ConductorInstance extends Model {
    id: number;
    name: string;
    active: boolean
}

export const Conductor = db.define<ConductorInstance>('Conductor', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'conductores',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});


