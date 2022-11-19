import { Request, Response, NextFunction } from "express";
import { Model, ModelStatic, where } from "sequelize/types";
import { FacturaType } from "../controllers/facturaController";
import { Conductor } from "../models/Conductor";
import {Factura} from '../models/Factura'
import { Obra } from "../models/Obra";
import { Provedor } from "../models/Provedor";
import { resultsType } from "../types/PaginationType";

export const paginatedResults = (model: ModelStatic<any>) => {


    return async (req: Request, res: Response, next: NextFunction) => {

        const page = parseInt(req.query.page as string) //usuario tem que passar pagina
        const limit = parseInt(req.query.limit as string) // usuario tem que passar limite

        //tem que ter o INDEX de onde vai iniciar a exibir e o INDEX de onde vai finalizar a exibicao
        //vamos pensar page 3 limit 3

        const startIndex = (page - 1) * limit; // START INDEX VAI SER 6 O INDEX COMECA DO 0
        const endIndex = page * limit;  // ENDINDEX VAI SER 9
        const resultsModel = await model.findAll(); //aqui puxamos os usuarios que desejamos.


        if (resultsModel) {
            //Aqui criamos um objeto vazio apenas com os valores vindo do banco
            const results: resultsType = {
                results: resultsModel
            }

            //Aqui checamos se é menor que o tamanho dos resultados, se for maior, nao vai aparecer um NEXT.
            if (endIndex < results.results.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            //Aqui checamos se é maior que 0, se for menor, nao vai aparecer um PREVIOUS no objeto.
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            //Aqui 
            const paginatedModelResults = resultsModel.slice(startIndex, endIndex)
            results.results = paginatedModelResults;
            res.locals.paginatedResult = results;
            next();
            //res.json({ results: results });
        }
    }
}

export const paginatedResultsFactura = (model: ModelStatic<any>) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const page = parseInt(req.query.page as string) 
        const limit = parseInt(req.query.limit as string) 
        const startIndex = (page - 1) * limit; 
        const endIndex = page * limit;  

        const resultsModel = await model.findAll({
            include: [{
                model: Conductor,
            }, {
                model: Provedor,
            }, {
                model: Obra
            }]
        }); 


        if (resultsModel) {
            const results: resultsType = {
                results: resultsModel
            }

            if (endIndex < results.results.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            //Aqui 
            const paginatedModelResults = resultsModel.slice(startIndex, endIndex)
            results.results = paginatedModelResults;
            res.locals.paginatedResult = results;
            next();
            //res.json({ results: results });
        }
    }
}

