"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Factura_1 = require("../models/Factura");
const Obra_1 = require("../models/Obra");
const Provedor_1 = require("../models/Provedor");
Provedor_1.Provedor.hasMany(Factura_1.Factura);
Factura_1.Factura.belongsTo(Provedor_1.Provedor);
Obra_1.Obra.hasMany(Factura_1.Factura);
Factura_1.Factura.belongsTo(Obra_1.Obra);
