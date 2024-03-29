import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/User'
import { Ponto } from '../models/Ponto'
import { PontoType } from '../types/PontoType'
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
const { Op } = require("sequelize");

dotenv.config();

export const registerPoint = async (req: Request, res: Response) => {

    const decodedUser = res.locals.decoded;
    const user = await User.findByPk(decodedUser.id);

    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();

    const markedPointsOfDay = await Ponto.findAll({
        where: {
            datePoint: {
                [Op.gt]: TODAY_START,
                [Op.lt]: NOW
            },
        }
    });

    const markedPointsOfDayByUser = await Ponto.findAll({
        where: {
            datePoint: {
                [Op.gt]: TODAY_START,
                [Op.lt]: NOW
            },
            UserId: (user !== null) ? user.id : decodedUser.id
        }
    })



    if (!markedPointsOfDay || markedPointsOfDay.length === 0) {
        const ponto = new Ponto;
        ponto.datePoint = new Date();
        if (user) {
            console.log(user)
            ponto.UserId = user.id as number;
            console.log(ponto.UserId);
        }

        if (markedPointsOfDayByUser) {
            ponto.numPoint = markedPointsOfDayByUser.length + 1;
        }

        const newPoint = await ponto.save();
        res.json({ msg: "Ponto registrado com sucesso", msg2: "Caiu no IF de quando nao encontrou ponto do DIA", newPoint })
        return;

    }

    if (markedPointsOfDay) {

        const ponto = new Ponto;
        ponto.datePoint = new Date();

        if (user) {
            ponto.UserId = user.id as number;
        }

        if (markedPointsOfDayByUser) {
            ponto.numPoint = markedPointsOfDayByUser.length + 1;
        } 
        

        const newPoint = await ponto.save();
        res.json({ msg: "ponto registrado", markedPoint: newPoint, markedPointsOfDayByUser });
        return;


    }

    return;
}

