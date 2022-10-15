import { Factura } from '../models/Factura'
import { Obra } from '../models/Obra';
import { Provedor } from '../models/Provedor';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export function populateDB() {
    let passwordClaudio = '1234';
    let passwordJose = '4321';

    let passHashClaudio: string;
    let passHashJose: string;

    //Populate DB with insertions
    bcrypt.hash(passwordClaudio, 10).then((result) => {
        passHashClaudio = result;
        bcrypt.hash(passwordJose, 10).then((result) => {
            passHashJose = result;
            User.bulkCreate([
                { email: "claudio@gmail.com", name: 'Claudio', password: passHashClaudio, isAdmin: true },
                { email: "jose@gmail.com", name: 'Jose', password: passHashJose, isAdmin: false },
            ], { ignoreDuplicates: true }).then(() => console.log("Users data have been saved"));
        })
    })

    Provedor.bulkCreate([
        { name: "Bricomart" },
        { name: 'Veralia' },
        { name: 'Bigmat' }
    ], { ignoreDuplicates: true }).then(() => { });

    Obra.bulkCreate([
        { name: 'Obra01', direccion: 'Calle Monte Naranco, 23', presupuesto: 5457.22, dateStart: new Date('2022-01-25') },
        { name: 'Obra02', direccion: 'Calle Marques de Toca, 95', presupuesto: 14578.22, dateStart: new Date('2021-04-22') },
        { name: 'Obra03', direccion: 'Calle General Ricardos, 32', presupuesto: 45788.22, dateStart: new Date('2021-09-17') },
    ], { ignoreDuplicates: true }).then(() => { });


    Factura.bulkCreate([
        { number: 1, dateFactura: new Date('2022-05-18'), valor: 541.00, provedor: 1, obra: 1 },
        { number: 2, dateFactura: new Date('2022-01-29'), valor: 421.00, provedor: 2, obra: 3 },
        { number: 3, dateFactura: new Date('2022-02-20'), valor: 17.50, provedor: 3, obra: 1 },
    ], { ignoreDuplicates: true }).then(() => { }).catch((err) => {
        console.log("Erro ao fazer factura", err);
    })
}