import { Request, Response } from 'express';
import { User } from '../models/User';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const signUp = async (req: Request, res: Response) => {

    let { email, name, password, isAdmin = false } = req.body;

    if (email.length > 0 && password.length > 0) {
        let hasUser = await User.findOne({ where: { email } });
        if (hasUser) { res.json({ error: 'Não foi possível cadastrar, email já existe.' }); return; }
        if (!hasUser) {

            let senhaCriptografada = await bcrypt.hash(password, 10);

            if (senhaCriptografada !== undefined) {
                let newUser = await User.create({ email, name, password: senhaCriptografada, isAdmin });
                console.log(newUser);
                const token = JWT.sign({ id: newUser.id, email: newUser.email, name: newUser.name, password: newUser.password },
                    process.env.JWT_SECRET_KEY as string,
                    {
                        expiresIn: '2h'
                    });

                res.status(201);
                res.json({ id: newUser.id, token });
                return;

            }


        }
    }
};

export const login = async (req: Request, res: Response) => {

    let { email, password } = req.body;


    let user = await User.findOne({ where: { email } });
    if (!user) {
        res.json({ error: "Usuário com esse e-mail não existe" });
        return;
    }

    if (user) {

        const matchedPasswords = await bcrypt.compare(password, user.password);
        if (!matchedPasswords) {
            res.json({ msg: "Email ou senha incorretos" });
            return;
        }

        if (matchedPasswords) {
            const token = JWT.sign({ id: user.id, email: user.email, name: user.name, password: user.password },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: '2h'
                });

            res.json({ msg: "Logado com sucesso", status: true, isAdmin: user.isAdmin, token });
            return;
        }

    }

    res.json({ msg: "Não foi possível fazer o login", status: false });
    return
};

export const tokenIsValid = async (req: Request, res: Response) => {
    
}

export const getAllUsers = async (req: Request, res: Response) => {

    let users = await User.findAll();

    if (users) {
        res.json(users);
        return
    } else {
        res.json({ msg: 'Não há usuários a serem exibidos.' })
    }

};


export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}


//teste