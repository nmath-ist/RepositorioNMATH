import { FaRegFile } from "react-icons/fa";
import './Caixa_FIle.css';

export default function Caixa_File(props) {



    return <button className = 'caixa_File' onClick={() => props.clickFunction(props.name, props.path)}> 
        <div className = 'colocar-cor_File'></div>
        <div className = 'simbolo-livro_File'> <FaRegFile /> </div>
        <p className = 'nome-cadeira_File'>{props.name}</p>
    </button>;
}