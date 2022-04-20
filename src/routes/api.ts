import { Router } from 'express';

import * as UserController from '../controllers/userController';
import * as provedorController from '../controllers/provedorController';
import {Auth} from '../middlewares/Auth';


const router = Router();

router.get('/ping', UserController.ping);
router.get('/users', Auth.private, UserController.getAllUsers);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

//provedores
router.get('/provedores', provedorController.listProvedores);
router.post('/provedores', provedorController.createProvedor);
router.put('/provedores/:id', provedorController.updateProvedor);
router.delete('/provedores/:id', provedorController.deleteProvedor);

export default router;