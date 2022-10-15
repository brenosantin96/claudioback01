import {Factura} from '../models/Factura';
import {Obra} from '../models/Obra';
import {Provedor} from '../models/Provedor';
import {User} from '../models/User';
import {Ponto} from '../models/Ponto';

Provedor.hasMany(Factura);
Factura.belongsTo(Provedor);

Obra.hasMany(Factura);
Factura.belongsTo(Obra);

User.hasMany(Ponto);
Ponto.belongsTo(User);  
