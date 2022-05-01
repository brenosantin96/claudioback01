import { Router } from 'express';

import * as UserController from '../controllers/userController';
import * as provedorController from '../controllers/provedorController';
import * as obraController from '../controllers/obrasController';
import {Auth} from '../middlewares/Auth';


const router = Router();

router.get('/ping', UserController.ping);
router.get('/users', Auth.private, UserController.getAllUsers);
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

export default router;