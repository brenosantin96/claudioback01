import { Model, DataTypes } from 'sequelize';
import {db} from '../instances/mysql';
import {UserInstance} from '../models/User'

export interface PontoInstance extends Model {
    id: number;
    datePoint: Date;
    numPoint: number;
    UserId: number
    
}

export const Ponto = db.define<PontoInstance>('Ponto', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    datePoint: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numPoint: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    /* //FK in User table
     user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    } */
}, {
    tableName: 'pontos',
    timestamps: false
}


);



//Factura.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync deu erro", err)});