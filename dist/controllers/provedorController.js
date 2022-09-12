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
exports.deleteProvedor = exports.updateProvedor = exports.createProvedor = exports.getOneProvedor = exports.listProvedores = void 0;
const Provedor_1 = require("../models/Provedor");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const listProvedores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const provedores = yield Provedor_1.Provedor.findAll();
    res.json({ provedores: provedores });
    return;
});
exports.listProvedores = listProvedores;
const getOneProvedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    const provedor = yield Provedor_1.Provedor.findByPk(id);
    if (provedor) {
        res.json({ provedor: provedor });
        return;
    }
    else {
        res.json({ msg: "Não foi possível encontrar provedor com esse ID informado", name: "Não encontrado" });
    }
});
exports.getOneProvedor = getOneProvedor;
const createProvedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.body;
    console.log(req.body);
    if (!name) {
        res.json({ msg: "Nome precisa ser preenchido." });
        return;
    }
    const provedor = new Provedor_1.Provedor();
    provedor.name = name;
    const info = yield provedor.save();
    res.json({ msg: "Provedor cadastrado com sucesso", info });
    return;
});
exports.createProvedor = createProvedor;
const updateProvedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let name = req.body.name;
    const provedor = yield Provedor_1.Provedor.findByPk(id);
    if (name === "" || name === null || name === undefined) {
        res.json({ msg: "Nao foi possivel atualizar, informe o campo a ser atualizado." });
        return;
    }
    if (provedor) {
        provedor.update({ name: name });
        res.json({ msg: "Provedor atualizado com sucesso", provedor });
    }
    else {
        res.json({ msg: "Nao foi possivel atualizar este provedor" });
    }
});
exports.updateProvedor = updateProvedor;
const deleteProvedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const provedor = yield Provedor_1.Provedor.findByPk(id);
    if (provedor) {
        provedor.destroy();
        const actualprovedores = yield Provedor_1.Provedor.findAll();
        if (actualprovedores) {
            res.json({ msg: `O provedor com ID ${provedor.id} e nome ${provedor.name} foi removido.`, actualprovedores });
        }
    }
    else {
        res.status(404);
        res.json({ msg: `Não existe provedor com o ${id} para ser removido.` });
    }
});
exports.deleteProvedor = deleteProvedor;
