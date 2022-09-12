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
exports.ping = exports.getAllUsers = exports.tokenIsValid = exports.login = exports.signUp = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password, isAdmin = false } = req.body;
    if (email.length > 0 && password.length > 0) {
        let hasUser = yield User_1.User.findOne({ where: { email } });
        if (hasUser) {
            res.json({ error: 'Não foi possível cadastrar, email já existe.' });
            return;
        }
        if (!hasUser) {
            let senhaCriptografada = yield bcrypt_1.default.hash(password, 10);
            if (senhaCriptografada !== undefined) {
                let newUser = yield User_1.User.create({ email, password: senhaCriptografada, isAdmin });
                console.log(newUser);
                const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, password: newUser.password }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '2h'
                });
                res.status(201);
                res.json({ id: newUser.id, token });
                return;
            }
        }
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    let user = yield User_1.User.findOne({ where: { email } });
    if (!user) {
        res.json({ error: "Usuário com esse e-mail não existe" });
        return;
    }
    if (user) {
        const matchedPasswords = yield bcrypt_1.default.compare(password, user.password);
        if (!matchedPasswords) {
            res.json({ msg: "Email ou senha incorretos" });
            return;
        }
        if (matchedPasswords) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, password: user.password }, process.env.JWT_SECRET_KEY, {
                expiresIn: '2h'
            });
            res.json({ msg: "Logado com sucesso", status: true, isAdmin: user.isAdmin, token });
            return;
        }
    }
    res.json({ msg: "Não foi possível fazer o login", status: false });
    return;
});
exports.login = login;
const tokenIsValid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.tokenIsValid = tokenIsValid;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield User_1.User.findAll();
    if (users) {
        res.json(users);
        return;
    }
    else {
        res.json({ msg: 'Não há usuários a serem exibidos.' });
    }
});
exports.getAllUsers = getAllUsers;
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
