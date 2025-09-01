import { HiOutlineBookOpen } from "react-icons/hi2";
import './Caixa.css';
import {useLocation} from 'react-router-dom';

export default function Caixa(props) {

const location = useLocation().name;


    return <button className = 'caixa' onClick={() => props.clickFunction(props.name, props.path)}> 
        <div className = 'colocar-cor'></div>
        <div className = 'simbolo-livro'> <HiOutlineBookOpen /> </div>
        <p className = 'nome-cadeira'>{props.name}</p>
    </button>;
}