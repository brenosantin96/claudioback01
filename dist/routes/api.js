"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController = __importStar(require("../controllers/userController"));
const provedorController = __importStar(require("../controllers/provedorController"));
const obraController = __importStar(require("../controllers/obrasController"));
const facturaController = __importStar(require("../controllers/facturaController"));
const Auth_1 = require("../middlewares/Auth");
const router = (0, express_1.Router)();
router.get('/ping', UserController.ping);
router.get('/users', Auth_1.Auth.private, UserController.getAllUsers);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);
//provedores
router.get('/provedores', provedorController.listProvedores);
router.get('/provedores/:id', provedorController.getOneProvedor);
router.post('/provedores', provedorController.createProvedor);
router.put('/provedores/:id', provedorController.updateProvedor);
router.delete('/provedores/:id', provedorController.deleteProvedor);
//obras
router.get('/obras', obraController.listObras);
router.get('/obras/:id', obraController.getOneObra);
router.post('/obras', obraController.createObra);
router.put('/obras/:id', obraController.updateObra);
router.delete('/obras/:id', obraController.deleteObra);
//facturas
router.get('/facturas', facturaController.listFacturas);
router.get('/facturas/:id', facturaController.getOneFactura);
router.post('/facturas', facturaController.createFactura);
router.put('/facturas/:id', facturaController.updateFactura);
router.delete('/facturas/:id', facturaController.deleteFactura);
exports.default = router;
