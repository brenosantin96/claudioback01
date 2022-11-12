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
import { Conductor } from '../models/Conductor';

dotenv.config();

export type FacturaType = {
    number: number;
    dateFactura: Date;
    valor: number;
    ProvedorId: number;
    ObraId: number,
    ConductorId: number

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

export const listFacturasAllInfo = async (req: Request, res: Response) => {

    const facturasAllInfo = await Factura.findAll({
        include: [{
            model: Conductor,
        }, {
            model: Provedor,
        }, {
            model: Obra
        }]
    });

    if (facturasAllInfo) {
        res.json({ facturasAllInfo: facturasAllInfo });
        return;
    } else {
        res.json({ msg: 'Não foi possível encontrar facturas filtradas por obra' });
    }

}

export const listFacturaById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const factura = await Factura.findByPk(id, {
        include: [
            { model: Conductor },
            { model: Provedor },
            { model: Obra }]
    });

    if (factura) {
        res.json({ factura: factura });
        return;
    } else {
        res.json({ msg: `Não foi possível encontrar factura filtradas pelo ID ${id}` });
    }

}

export const listFacturasByObraCompleteInfo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const facturasByObra = await Factura.findAll({
        where: {
            ObraId: parseInt(id)
        },
        include: [{
            model: Conductor,
        }, {
            model: Provedor,
        }]
    });

    if (facturasByObra) {
        res.json(facturasByObra);
        return;
    } else {
        res.json({ msg: "Bleh" });
        return;
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

export const updateFactura = async (req: Request<ParamsDictionary, any, FacturaType>, res: Response) => {
    let id = req.params.id;

    let { number, dateFactura, valor, ProvedorId, ObraId, ConductorId } = req.body;

    const factura = await Factura.findByPk(id);

    if (number === 0 && valor === 0 && dateFactura === undefined && ProvedorId === undefined && ObraId === undefined && ConductorId === undefined) {
        res.json({ msg: "Nao foi possivel atualizar, informe algum campo a ser atualizado." });
        return;
    }

    if (factura) {
        let updatesFactura: FacturaType = {
            number: factura.number, dateFactura: factura.dateFactura, valor: factura.valor,
            ProvedorId: factura.ProvedorId, ObraId: factura.ProvedorId, ConductorId: factura.ConductorId
        };

        if (number) {
            updatesFactura.number = number;
        }

        if (dateFactura) {
            updatesFactura.dateFactura = dateFactura;
        }

        if (valor) {
            updatesFactura.valor = convertToMoney(valor);
        }

        if (ProvedorId) {
            updatesFactura.ProvedorId = ProvedorId;
        }

        if (ObraId) {
            updatesFactura.ObraId = ObraId;
        }

        if (ConductorId) {
            updatesFactura.ConductorId = ConductorId;
        }

        //Atualizando com as infos que foram informadas apenas
        factura.update({
            number: updatesFactura.number, dateFactura: updatesFactura.dateFactura, valor: updatesFactura.valor,
            ProvedorId: updatesFactura.ProvedorId, ObraId: updatesFactura.ProvedorId, ConductorId: updatesFactura.ConductorId
        }).then(() => { res.json({ msg: "Factura atualizada com sucesso", factura }); return })
    }
}

export const deleteFactura = async (req: Request, res: Response) => {
    let id = req.params.id;

    const factura = await Factura.findByPk(id);

    if (factura) {
        factura.destroy();
        const actualFacturas = await Factura.findAll();
        if (actualFacturas) {
            res.json({ msg: `A factura com ID ${factura.id} e numero ${factura.number} foi removida.`, actualFacturas })
        }
    } else {
        res.status(404);
        res.json({ msg: `No hay factura con el id ${id} para remover.` })
    }
}
