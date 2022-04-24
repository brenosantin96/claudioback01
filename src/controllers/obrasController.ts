import { Request, Response } from 'express';
import { Obra } from '../models/Obra'
import dotenv from 'dotenv';
import { ParamsDictionary } from "express-serve-static-core";

type ObraType = {
    name: string;
    direccion: string;
    presupuesto: number;
    dateStart: Date;
}


dotenv.config();


export const listObras = async (req: Request, res: Response) => {
    const obras = await Obra.findAll();
    res.json({ obras: obras });
    return;

}

export const getOneObra = async (req: Request, res: Response) => {
    let { id } = req.params;

    const obra = await Obra.findByPk(id);
    if (obra) {
        res.json({ obra: obra });
        return
    } else {
        res.json({ msg: "Não foi possível encontrar obra com esse ID informado" })
    }

}

export const createObra = async (req: Request<ParamsDictionary, any, ObraType>, res: Response) => {
    let { name, direccion, presupuesto, dateStart } = req.body;

    console.log(req.body)

    if (name === "" || name === null || name === undefined || direccion === "" || direccion === undefined || direccion === null) {
        res.json({ msg: "Nome e endereço precisam ser preenchidos." });
        return;
    }

    const obra = new Obra();

    if (presupuesto) {
        let stringPresupuesto = presupuesto.toString();
        stringPresupuesto = stringPresupuesto.replace('.', '').replace(',', '.').replace('R$', '').replace('R$ ', '');
        let presupuestoFloat = parseFloat(stringPresupuesto);
        presupuesto = presupuestoFloat;
        obra.presupuesto = presupuesto;
    }


    obra.name = name;
    obra.direccion = direccion;
    obra.presupuesto = presupuesto;
    obra.dateStart = dateStart;

    const info = await obra.save();
    res.json({ msg: "Obra cadastrada com sucesso", info });
    return;

}

export const updateObra = async (req: Request<ParamsDictionary, any, ObraType>, res: Response) => {
    let id = req.params.id;
    let { name, direccion, presupuesto, dateStart } = req.body;

    const obra = await Obra.findByPk(id);

    if (name === "" && direccion === "" && !presupuesto && !dateStart) {
        res.json({ msg: "Nao foi possivel atualizar, informe algum campo a ser atualizado." });
        return;
    }

    if (obra) {
        let updatesObra: ObraType = {
            name: obra.name, direccion: obra.direccion,
            presupuesto: obra.presupuesto, dateStart: obra.dateStart
        };

        if (name) {
            updatesObra.name = name;
        }

        if (direccion) {
            updatesObra.direccion = direccion;
        }

        if (presupuesto) {
            let stringPresupuesto = presupuesto.toString();
            stringPresupuesto = stringPresupuesto.replace('.', '').replace(',', '.').replace('R$', '').replace('R$ ', '');
            let presupuestoFloat = parseFloat(stringPresupuesto);
            updatesObra.presupuesto = presupuestoFloat;
        }

        if (dateStart) {
            updatesObra.dateStart = dateStart;
        } 

        //Aqui eu tenho que atualizar mas tem que achar um jeito de atualizar só oq foi modificiado..
        obra.update({
            name: updatesObra.name, direccion: updatesObra.direccion,
            presupuesto: updatesObra.presupuesto, dateStart: updatesObra.dateStart
        }).then(() => { res.json({ msg: "Obra atualizada com sucesso", obra }); return })
    }
}

export const deleteObra = async (req: Request, res: Response) => {
    let id = req.params.id;

    const obra = await Obra.findByPk(id);

    if (obra) {
        obra.destroy();
        const actualobras = await Obra.findAll();
        if (actualobras) {
            res.json({ msg: `A obra com ID ${obra.id} e nome ${obra.name} foi removida.`, actualobras })
        }
    } else {
        res.status(404);
        res.json({ msg: `Não existe obra com o ${id} para ser removido.` })
    }
}