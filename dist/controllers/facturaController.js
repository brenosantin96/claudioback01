"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFactura = exports.updateFactura = exports.createFactura = exports.getOneFactura = exports.listFacturas = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Factura_1 = require("../models/Factura");
dotenv_1.default.config();
const listFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facturas = yield Factura_1.Factura.findAll();
    if (facturas) {
        res.json({ facturas: facturas });
        return;
    }
    else {
        res.json({ msg: 'Não foi possível encontrar facturas' });
    }
});
exports.listFacturas = listFacturas;
const getOneFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id !== undefined) {
        const factura = yield Factura_1.Factura.findByPk(id);
        if (factura) {
            //factura.provedor.
            res.json({ factura });
            return;
        }
        else {
            res.json({ msg: "Não foi possível encontrar factura" });
            return;
        }
    }
});
exports.getOneFactura = getOneFactura;
const createFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ msg: "Rota do Create" });
    return;
});
exports.createFactura = createFactura;
const updateFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ msg: "Rota do Create" });
    return;
});
exports.updateFactura = updateFactura;
const deleteFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ msg: "Rota do Create" });
    return;
});
exports.deleteFactura = deleteFactura;
