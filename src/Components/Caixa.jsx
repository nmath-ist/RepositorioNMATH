import { HiOutlineFolder } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
import './Caixa.css';

export default function Caixa(props) {

    return <button className='caixa' onClick={() => props.clickFunction(props.name, props.path)}>
        <span className='simbolo-livro'><HiOutlineFolder /></span>
        <p className='nome-cadeira'>{props.name}</p>
        <span className='seta'><HiOutlineChevronRight /></span>
    </button>;
}
