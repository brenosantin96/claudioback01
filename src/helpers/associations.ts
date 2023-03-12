import { Factura } from '../models/Factura';
import { Obra } from '../models/Obra';
import { Provedor } from '../models/Provedor';
import { User } from '../models/User';
import { Ponto } from '../models/Ponto';
import { Conductor } from '../models/Conductor';

Provedor.hasMany(Factura, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Factura.belongsTo(Provedor, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });

Obra.hasMany(Factura, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Factura.belongsTo(Obra, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

Conductor.hasMany(Factura, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Factura.belongsTo(Conductor, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

User.hasMany(Ponto, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Ponto.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });  

