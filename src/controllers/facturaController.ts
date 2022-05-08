import { Request, Response } from 'express';
import { Obra } from '../models/Obra'
import dotenv from 'dotenv';
import { ParamsDictionary } from "express-serve-static-core";
import { ProvedorType } from './provedorController';
import { ObraType } from './obrasController';
import { Factura } from '../models/Factura';

dotenv.config();
export type FacturaType = {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    provedor: ProvedorType
    obra: ObraType

}


export const listFacturas = async (req: Request, res: Response) => {
    const facturas = await Factura.findAll();
    if (facturas) {
        res.json({ facturas: facturas });
        return;
    } else {
        res.json({ msg: 'Não foi possível encontrar facturas' });
    }

}

export const getOneFactura = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== undefined) {
        const factura = await Factura.findByPk(id);

        if (factura) {
            let facturaID = factura.id;
            let facturaNumber = factura.number;
            let facturaDate = factura.dateFactura;
            let facturaValor = factura.valor;
            let facturaProvedor = factura.provedor.name;
            let facturaObra = factura.obra.name;

            res.json({ factura })
            return;
        } else {
            res.json({ msg: "Não foi possível encontrar factura" });
            return;
        }


    }

}

export const createFactura = async(req: Request, res: Response) => {

    res.json({msg: "Rota do Create"});
    return;
}

export const updateFactura = async(req: Request, res: Response) => {

    res.json({msg: "Rota do Create"});
    return;
}

export const deleteFactura = async(req: Request, res: Response) => {

    res.json({msg: "Rota do Create"});
    return;
}
