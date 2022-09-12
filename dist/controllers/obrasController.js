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
exports.deleteObra = exports.updateObra = exports.createObra = exports.getOneObra = exports.listObras = void 0;
const Obra_1 = require("../models/Obra");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const listObras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obras = yield Obra_1.Obra.findAll();
    res.json({ obras: obras });
    return;
});
exports.listObras = listObras;
const getOneObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    const obra = yield Obra_1.Obra.findByPk(id);
    if (obra) {
        res.json({ obra: obra });
        return;
    }
    else {
        res.json({ msg: "Não foi possível encontrar obra com esse ID informado" });
    }
});
exports.getOneObra = getOneObra;
const createObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, direccion, presupuesto, dateStart } = req.body;
    console.log(req.body);
    if (name === "" || name === null || name === undefined || direccion === "" || direccion === undefined || direccion === null) {
        res.json({ msg: "Nome e endereço precisam ser preenchidos." });
        return;
    }
    const obra = new Obra_1.Obra();
    if (presupuesto) {
        let stringPresupuesto = presupuesto.toString();
        console.log(stringPresupuesto);
        stringPresupuesto = stringPresupuesto.replace(',', '.').replace('€', '');
        console.log("Novamente: ", stringPresupuesto);
        let presupuestoFloat = parseFloat(stringPresupuesto);
        presupuesto = presupuestoFloat;
        obra.presupuesto = presupuesto;
    }
    if (name) {
        obra.name = name;
    }
    if (direccion) {
        obra.direccion = direccion;
    }
    if (presupuesto) {
        obra.presupuesto = presupuesto;
    }
    if (dateStart) {
        obra.dateStart = dateStart;
    }
    const info = yield obra.save();
    res.json({ msg: "Obra cadastrada com sucesso", info });
    return;
});
exports.createObra = createObra;
const updateObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let { name, direccion, presupuesto, dateStart } = req.body;
    const obra = yield Obra_1.Obra.findByPk(id);
    if (name === "" && direccion === "" && !presupuesto && !dateStart) {
        res.json({ msg: "Nao foi possivel atualizar, informe algum campo a ser atualizado." });
        return;
    }
    if (obra) {
        let updatesObra = {
            name: obra.name, direccion: obra.direccion,
            presupuesto: obra.presupuesto, dateStart: obra.dateStart
        };
        if (name) {
            updatesObra.name = name;
        }
        if (direccion) {
            updatesObra.direccion = direccion;
        }
        if (presupuesto) {
            let stringPresupuesto = presupuesto.toString();
            stringPresupuesto = stringPresupuesto.replace('.', '').replace(',', '.').replace('R$', '').replace('R$ ', '');
            let presupuestoFloat = parseFloat(stringPresupuesto);
            updatesObra.presupuesto = presupuestoFloat;
        }
        if (dateStart) {
            updatesObra.dateStart = dateStart;
        }
        //Atualizando com as infos que foram informadas apenas
        obra.update({
            name: updatesObra.name, direccion: updatesObra.direccion,
            presupuesto: updatesObra.presupuesto, dateStart: updatesObra.dateStart
        }).then(() => { res.json({ msg: "Obra atualizada com sucesso", obra }); return; });
    }
});
exports.updateObra = updateObra;
const deleteObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const obra = yield Obra_1.Obra.findByPk(id);
    if (obra) {
        obra.destroy();
        const actualobras = yield Obra_1.Obra.findAll();
        if (actualobras) {
            res.json({ msg: `A obra com ID ${obra.id} e nome ${obra.name} foi removida.`, actualobras });
        }
    }
    else {
        res.status(404);
        res.json({ msg: `Não existe obra com o ${id} para ser removido.` });
    }
});
exports.deleteObra = deleteObra;
