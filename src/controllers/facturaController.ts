import { Request, Response } from 'express';
import { Obra } from '../models/Obra'
import dotenv from 'dotenv';
import { ParamsDictionary } from "express-serve-static-core";
import { ProvedorType } from './provedorController';
import { ObraType } from './obrasController';
import { Factura } from '../models/Factura';
import { Provedor } from '../models/Provedor';
import { ConductorType } from './conductorController';
import { convertToMoney } from '../helpers/convertNumbers'

dotenv.config();

export type FacturaType = {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    proveedorID: number;
    obraID: number,
    conductorID: number

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

            //factura.provedor.

            res.json({ factura })
            return;
        } else {
            res.json({ msg: "Não foi possível encontrar factura" });
            return;
        }


    }

}

export const createFactura = async (req: Request, res: Response) => {

    const { number, dateFactura, valor, ProvedorId, ObraId, ConductorId } = req.body;

    if (number === null || number === undefined || number === "" ||
        dateFactura === null || dateFactura === undefined || dateFactura === "" ||
        valor === null || valor === undefined || valor === "" ||
        ProvedorId === null || ProvedorId === undefined || ProvedorId === "" ||
        ObraId === null || ObraId === undefined || ObraId === "" ||
        ConductorId === null || ConductorId === undefined || ConductorId === ""
    ) {
        res.status(400);
        res.json({ msg: "Informe os atributos corretamente" });
        return;
    }
    else {
        let factura = new Factura();

        if (valor) {
            factura.valor = convertToMoney(valor);
        }

        factura.number = parseInt(number);
        factura.dateFactura = dateFactura;
        factura.ProvedorId = parseInt(ProvedorId);
        factura.ObraId = parseInt(ObraId);
        factura.ConductorId = parseInt(ConductorId);

        const info = await factura.save();
        res.status(200);
        res.json({ msg: "Factura agregada com sucesso", info });
        return;
    }

}

export const updateFactura = async (req: Request, res: Response) => {

    res.json({ msg: "Rota do Create" });
    return;
}

export const deleteFactura = async (req: Request, res: Response) => {

    res.json({ msg: "Rota do Create" });
    return;
}
