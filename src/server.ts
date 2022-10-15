import { Request, Response } from 'express';
import './helpers/associations';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { db } from './instances/mysql';
import bodyparser from "body-parser";

//Esses imports foram feitos aqui apenas para POPULAR O DB em fase de testes, depois apagar todos imports abaixo dessa linha.
import { Factura } from './models/Factura'
import { Obra } from './models/Obra';
import { Provedor } from './models/Provedor';
import { User } from './models/User';
import bcrypt from 'bcrypt';
import { populateDB } from './helpers/populateDB';


dotenv.config();

const server = express();


//rota estática, cors, requests e responses, routes.
server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyparser.json()) // save this line!
server.use(apiRoutes);


server.listen(process.env.PORT || 4000, () => {
    console.log("Server iniciado.")
});


 
//Sync DB
db.sync(({ alter: true })).then(() => {
    populateDB();
}).catch((err) => { console.log("Deu algum erro ao sincronizar o ORM com o BANCO DE DADOS:", err) }); 

//Test DB
db.authenticate().then(() => { console.log("Autenticado no DB com sucesso") })
    .catch((err) => {
        console.log(`Deu algum erro na hora de autenticar: ${err}`);
    });

