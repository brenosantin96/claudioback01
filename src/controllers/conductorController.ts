import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Conductor } from '../models/Conductor'
import { Factura } from '../models/Factura';

dotenv.config();

export type ConductorType = {
    name: string;
    active: boolean;
}


export const listConductores = async (req: Request, res: Response) => {
    const conductores = await Conductor.findAll();
    if (conductores) {
        res.json({ conductores: conductores });
        return;
    } else {
        res.json({ msg: 'Não foi possível encontrar conductores' });
    }

}

export const getOneConductor = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== undefined || id !== null) {
        const conductor = await Conductor.findByPk(id);

        if (conductor) {
            res.json({ conductor })
            return;
        } else {
            res.status(404);
            res.json({ msg: "Não foi possível encontrar conductor" });
            return;
        }
    }
}

export const createConductor = async (req: Request, res: Response) => {
    let { name, active = true } = req.body;

    if (!name) {
        res.status(404);
        res.json({ msg: "Nome precisa ser preenchido." });
        return;
    }

    if (active === undefined || active === null || active === "") {
        active = true;
    }

    const conductor = new Conductor();

    conductor.name = name;
    conductor.active = active;

    const info = await conductor.save();
    res.json({ msg: "Conductor agregado com sucesso", info });
    return;

}



export const updateConductor = async (req: Request, res: Response) => {
    let id = req.params.id;
    let { name, active } = req.body;

    const conductor = await Conductor.findByPk(id);

    if (conductor) {

        let updatesConductor: ConductorType = {
            name: conductor.name, active: conductor.active
        };

        if (name) {
            updatesConductor.name = name;
        }

        if (active) {
            updatesConductor.active = active;
        }

        //Atualizando com as infos que foram informadas apenas
        conductor.update({
            name: updatesConductor.name, active: updatesConductor.active,
        }).then(() => {
            res.json({ msg: "Conductor atualizado com sucesso", conductor });
            return
        })


    } else {
        res.status(404);
        res.json({ msg: "Nao foi possivel atualizar este conductor" })
    }

}

export const deleteConductor = async (req: Request, res: Response) => {
    let id = req.params.id;

    const conductor = await Conductor.findByPk(id);

    const fatura = await Factura.findOne({ where: { ConductorId: id } })

    if (fatura) {
        res.json({ error: "O conductor tem faturas vinculadas a ele. Não é possivel excluir conductor." })
        res.status(400);
        return;
    }

    if (conductor) {
        conductor.destroy();
        const actualConductores = await Conductor.findAll();
        if (actualConductores) {
            res.json({ msg: `O conductor com ID ${conductor.id} e nome ${conductor.name} foi removido.`, actualConductores })
        }
    } else {
        res.status(404);
        res.json({ msg: `Não existe conductor com o ${id} para ser removido.` })
    }
}