import { Model, DataTypes } from 'sequelize';
import {db} from '../instances/mysql';
import {ProvedorType} from '../controllers/provedorController';
import {ObraType} from '../controllers/obrasController';
import { Provedor } from './Provedor';
import { Obra } from './Obra';

export interface FacturaInstance extends Model {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    provedor: ProvedorType
    obra: ObraType
    
}

export const Factura = db.define<FacturaInstance>('Factura', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateFactura: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
   // provedorid: {
   //     fk in provedorTable
   //     type: DataTypes.INTEGER,
   //     allowNull: false
   // },
   // obraid: {
   //    type: DataTypes.INTEGER,
   //    allowNull: false
   // }
}, {
    tableName: 'facturas',
    timestamps: false
}


);



//Factura.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync deu erro", err)});