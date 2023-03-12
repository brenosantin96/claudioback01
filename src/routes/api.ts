import { Router } from 'express';

import * as UserController from '../controllers/userController';
import * as provedorController from '../controllers/provedorController';
import * as obraController from '../controllers/obrasController';
import * as facturaController from '../controllers/facturaController';
import * as pontoController from '../controllers/pontoController';
import * as conductorController from '../controllers/conductorController';

import { Auth } from '../middlewares/Auth';
import { paginatedResults, paginatedResultsFactura } from '../middlewares/Paginate'
import { Provedor } from '../models/Provedor';
import { Factura } from '../models/Factura';
import { Obra } from '../models/Obra';
import { Conductor } from '../models/Conductor';


const router = Router();

router.get('/ping', UserController.ping);
router.get('/users', Auth.privateAdmin, UserController.getAllUsers);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

//provedores
router.get('/provedores', provedorController.listProvedores);
router.get('/provedores2', paginatedResults(Provedor), provedorController.listProvedores2);
router.get('/provedores/:id', provedorController.getOneProvedor);
router.post('/provedores', provedorController.createProvedor);
router.put('/provedores/:id', provedorController.updateProvedor);
router.delete('/provedores/:id', provedorController.deleteProvedor);

//obras
router.get('/obras', obraController.listObras);
router.get('/obras2', paginatedResults(Obra), obraController.listObras2);
router.get('/obras/:id', obraController.getOneObra);
router.post('/obras', obraController.createObra);
router.put('/obras/:id', obraController.updateObra);
router.delete('/obras/:id', obraController.deleteObra);

//facturas
router.get('/facturas', facturaController.listFacturas);
router.get('/facturas2', paginatedResultsFactura(Factura), facturaController.listFacturas2);
router.get('/facturas/:id', facturaController.getOneFactura);
router.get('/facturasInfo/:id', facturaController.listFacturaById);
router.post('/facturas', facturaController.createFactura);
router.put('/facturas/:id', facturaController.updateFactura);
router.delete('/facturas/:id', facturaController.deleteFactura);
router.get('/facturasAllInfo', facturaController.listFacturasAllInfo);
router.get('/facturasByObraComplete/:id', facturaController.listFacturasByObraCompleteInfo);
router.get('/listfacturas2', facturaController.listFacturas2)

//conductores
router.get('/conductores', conductorController.listConductores);
router.get('/conductores2', paginatedResults(Conductor), conductorController.listConductores2);
router.get('/conductores/:id', conductorController.getOneConductor);
router.post('/conductores', conductorController.createConductor);
router.put('/conductores/:id', conductorController.updateConductor);
router.delete('/conductores/:id', conductorController.deleteConductor);

//ponto
router.post('/ponto', Auth.private, pontoController.registerPoint);


//tests



export default router;

