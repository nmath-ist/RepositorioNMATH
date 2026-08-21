import { HiOutlineDocumentText } from "react-icons/hi2";
import './Caixa_FIle.css';

export default function Caixa_File(props) {

    return <button className='caixa_File' onClick={() => props.clickFunction(props.name, props.path)}>
        <span className='simbolo-livro_File'><HiOutlineDocumentText /></span>
        <p className='nome-cadeira_File'>{props.name}</p>
    </button>;
}
