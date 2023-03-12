import { Model, DataTypes } from 'sequelize';
import {db} from '../instances/mysql';
import {ProvedorType} from '../controllers/provedorController';
import {ObraType} from '../controllers/obrasController';
import { Provedor } from './Provedor';
import { Obra } from './Obra';
import { ConductorType } from '../controllers/conductorController';

export interface FacturaInstance extends Model {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    ProvedorId: number;
    ObraId: number;
    ConductorId: number;
    
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
   // },
   //  conductor_id: {
  //      //fk
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     references: {
   //        model: Obra,
   //        key: 'id'
   //    }
   // },
}, {
    tableName: 'facturas',
    timestamps: false
}


);



//Factura.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync deu erro", err)});