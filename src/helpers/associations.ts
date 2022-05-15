import {Factura} from '../models/Factura';
import {Obra} from '../models/Obra';
import {Provedor} from '../models/Provedor';
import {User} from '../models/User';

Provedor.hasMany(Factura);
Factura.belongsTo(Provedor);

Obra.hasMany(Factura);
Factura.belongsTo(Obra);

