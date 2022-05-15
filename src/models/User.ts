import { Model, DataTypes } from 'sequelize';
import {db} from '../instances/mysql';

export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
    isAdmin:  boolean;
}

export const User = db.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'users',
    timestamps: false
});

