import {Factura} from '../models/Factura';
import {Obra} from '../models/Obra';
import {Provedor} from '../models/Provedor';
import {User} from '../models/User';


const dbInit = () => {
    Factura.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync da Factura deu erro", err)});
    Obra.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync da Obra deu erro", err)});
    Provedor.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync do Provedor deu erro", err)});
    User.sync({alter: true}).then(()=> {}).catch((err)=> {console.log("Algo na sync do Usuario deu erro", err)});
}

export default dbInit;