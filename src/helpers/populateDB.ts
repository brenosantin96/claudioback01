//Esses imports foram feitos aqui apenas para POPULAR O DB em fase de testes, depois apagar todos imports abaixo dessa linha.
import { Factura } from '../models/Factura'
import { Obra } from '../models/Obra';
import { Provedor } from '../models/Provedor';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { Conductor } from '../models/Conductor';

export function populateDB() {

    console.log("Function populateDB Comment by now...")

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

    Conductor.bulkCreate([
        { name: 'Robson', active: true },
        { name: 'Alex', active: true },
        { name: 'Claudio', active: true }
    ], { ignoreDuplicates: true }).then(() => {
        console.log("conductores added to Database");
    });

    Factura.bulkCreate([
        { number: 1, dateFactura: new Date('2022-05-18'), valor: 541.00, ProvedorId: 1, ObraId: 1, ConductorId: 1 },
        { number: 2, dateFactura: new Date('2022-01-29'), valor: 421.00, ProvedorId: 2, ObraId: 1, ConductorId: 2 },
        { number: 3, dateFactura: new Date('2022-03-21'), valor: 171.50, ProvedorId: 3, ObraId: 1, ConductorId: 3 },
        { number: 4, dateFactura: new Date('2022-10-11'), valor: 12.50, ProvedorId: 3, ObraId: 2, ConductorId: 3 },
        { number: 5, dateFactura: new Date('2022-06-05'), valor: 33.21, ProvedorId: 2, ObraId: 2, ConductorId: 2 },
        { number: 6, dateFactura: new Date('2022-04-30'), valor: 41.55, ProvedorId: 1, ObraId: 2, ConductorId: 1 },
        { number: 7, dateFactura: new Date('2022-05-22'), valor: 117.2, ProvedorId: 1, ObraId: 3, ConductorId: 1 },
        { number: 8, dateFactura: new Date('2022-05-21'), valor: 321.50, ProvedorId: 1, ObraId: 3, ConductorId: 1 },
        { number: 9, dateFactura: new Date('2022-11-05'), valor: 551.2, ProvedorId: 2, ObraId: 3, ConductorId: 2 },
        { number: 10, dateFactura: new Date('2022-11-04'), valor: 31.44, ProvedorId: 2, ObraId: 1, ConductorId: 2 },
        { number: 11, dateFactura: new Date('2022-10-10'), valor: 415.44, ProvedorId: 3, ObraId: 2, ConductorId: 3 },
        { number: 12, dateFactura: new Date('2022-09-21'), valor: 667.22, ProvedorId: 3, ObraId: 3, ConductorId: 3 },
    ], { ignoreDuplicates: true }).then(() => {
        console.log("Faturas adicionadas com sucesso!")
     }).catch((err) => {
        console.log("Erro ao fazer factura", err);
    });  
 

}

 