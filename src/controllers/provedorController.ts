import { Request, Response } from 'express';
import { Provedor, ProvedorInstance } from '../models/Provedor'
import dotenv from 'dotenv'


dotenv.config();

type Provedores = {
    name: string
}

export const listProvedores = async (req: Request, res: Response) => {
    const provedores = await Provedor.findAll();
    res.json({ provedores: provedores });
    return;

}

export const createProvedor = async (req: Request, res: Response) => {
    let { name } = req.body;

    console.log(req.body)

    if (!name) {
        res.json({ msg: "Nome precisa ser preenchido." })
    }

    const provedor = new Provedor();

    provedor.name = name;
    const info = await provedor.save();
    res.json({ msg: "Provedor cadastrado com sucesso", info });

}



export const updateProvedor = async (req: Request, res: Response) => {
    let id = req.params.id;
    let name = req.body.name;

    const provedor = await Provedor.findByPk(id);

    let updates: Provedores = { name: '' };

    if (name === "" || name === null || name === undefined) {
        res.json({ msg: "Nao foi possivel atualizar, informe o campo a ser atualizado." });
        return;
    }

    if (provedor) {
        updates.name = name;
        provedor.update({ name: name });
        res.json({ msg: "Provedor atualizado com sucesso", provedor });
    } else {
        res.json({ msg: "Nao foi possivel atualizar este provedor" })
    }

}

export const deleteProvedor = async (req: Request, res: Response) => {
    let id = req.params.id;

    const provedor = await Provedor.findByPk(id);

    if (provedor) {
        provedor.destroy();
        const actualprovedores = await Provedor.findAll();
        if (actualprovedores) {
            res.json({ msg: `O provedor com ID ${provedor.id} e nome ${provedor.name} foi removido.`, actualprovedores })
        }
    } else {
        res.status(404);
        res.json({ msg: `Não existe provedor com o ${id} para ser removido.` })
    }
}