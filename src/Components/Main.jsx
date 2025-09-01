import { useLocation, Link } from 'react-router-dom';
import Caixa from './Caixa.jsx';
import Caixa_File from './Caixa_File.jsx';
import './Main.css';

export default function Main(props) {
    const filhos = props.filhos || [];
    const htmlItems = filhos.map(item => {
        if (item.type === "folder") {
            return (
                <Caixa name={item.name} type={item.type} clickFunction={props.clickFunction} path = {item.path}/>
            );
        }else if (item.type === "file") {
            return(
                <Caixa_File name={item.name} type={item.type} clickFunction={props.clickFunction2} path = {item.path}/>
            )
        }
        return null;
    })


    return(
        <main>
            {htmlItems}
        </main>
    )
}