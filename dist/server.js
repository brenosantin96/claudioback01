"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/associations");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./routes/api"));
const mysql_1 = require("./instances/mysql");
const body_parser_1 = __importDefault(require("body-parser"));
//Esses imports foram feitos aqui apenas para POPULAR O DB em fase de testes, depois apagar todos imports abaixo dessa linha.
const Factura_1 = require("./models/Factura");
const Obra_1 = require("./models/Obra");
const Provedor_1 = require("./models/Provedor");
const User_1 = require("./models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const server = (0, express_1.default)();
//rota estática, cors, requests e responses, routes.
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(body_parser_1.default.json()); // save this line!
server.use(api_1.default);
server.listen(process.env.PORT, () => {
    console.log("Server iniciado.");
});
//Sync DB
mysql_1.db.sync(({ alter: true })).then(() => {
    let passwordClaudio = '1234';
    let passwordJose = '4321';
    let passHashClaudio;
    let passHashJose;
    //Populate DB with insertions
    bcrypt_1.default.hash(passwordClaudio, 10).then((result) => {
        passHashClaudio = result;
        bcrypt_1.default.hash(passwordJose, 10).then((result) => {
            passHashJose = result;
            User_1.User.bulkCreate([
                { email: "claudio@gmail.com", password: passHashClaudio, isAdmin: true },
                { email: "jose@gmail.com", password: passHashJose, isAdmin: false },
            ], { ignoreDuplicates: true }).then(() => console.log("Users data have been saved"));
        });
    });
    Provedor_1.Provedor.bulkCreate([
        { name: "Bricomart" },
        { name: 'Veralia' },
        { name: 'Bigmat' }
    ], { ignoreDuplicates: true }).then(() => { });
    Obra_1.Obra.bulkCreate([
        { name: 'Obra01', direccion: 'Calle Monte Naranco, 23', presupuesto: 5457.22, dateStart: new Date('2022-01-25') },
        { name: 'Obra02', direccion: 'Calle Marques de Toca, 95', presupuesto: 14578.22, dateStart: new Date('2021-04-22') },
        { name: 'Obra03', direccion: 'Calle General Ricardos, 32', presupuesto: 45788.22, dateStart: new Date('2021-09-17') },
    ], { ignoreDuplicates: true }).then(() => { });
    Factura_1.Factura.bulkCreate([
        { number: 1, dateFactura: new Date('2022-05-18'), valor: 541.00, provedor: 1, obra: 1 },
        { number: 2, dateFactura: new Date('2022-01-29'), valor: 421.00, provedor: 2, obra: 3 },
        { number: 3, dateFactura: new Date('2022-02-20'), valor: 17.50, provedor: 3, obra: 1 },
    ], { ignoreDuplicates: true }).then(() => { }).catch((err) => {
        console.log("Erro ao fazer factura", err);
    });
}).catch((err) => { console.log("Deu algum erro ao sincronizar o ORM com o BANCO DE DADOS:", err); });
//Test DB
mysql_1.db.authenticate().then(() => { console.log("Autenticado no DB com sucesso"); })
    .catch((err) => {
    console.log(`Deu algum erro na hora de autenticar: ${err}`);
});
