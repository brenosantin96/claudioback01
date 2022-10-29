import { Factura } from '../models/Factura';
import { Obra } from '../models/Obra';
import { Provedor } from '../models/Provedor';
import { User } from '../models/User';
import { Ponto } from '../models/Ponto';
import { Conductor } from '../models/Conductor';

Provedor.hasMany(Factura);
Factura.belongsTo(Provedor);

Obra.hasMany(Factura);
Factura.belongsTo(Obra);

Conductor.hasMany(Factura);
Factura.belongsTo(Conductor);

User.hasMany(Ponto);
Ponto.belongsTo(User);  
