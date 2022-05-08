import {Factura} from '../models/Factura';
import {Obra} from '../models/Obra';
import {Provedor} from '../models/Provedor';
import {User} from '../models/User';

Obra.hasMany(Factura);
Provedor.hasMany(Factura);
Factura.belongsTo(Provedor);
Factura.belongsTo(Obra);