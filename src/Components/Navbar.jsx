
import "./navbar.css"

export default function Navbar(props){


    return(
        <div class="segmented-control">
            <button onClick={() => props.clickFunction("1º ano")} >1º Ano</button>
            <button onClick={() => props.clickFunction("2º ano")}>2º Ano</button>
            <button onClick={() => props.clickFunction("3º ano")}>3º Ano</button>
            <button onClick={() => props.clickFunction("Mestrado em Matemática Aplicada e Computação")}>Mestrado Matemática</button>
            <button onClick={() => props.clickFunction("Mestrado em Engenharia e Ciência de Dados")}>Mestrado Ciência de Dados</button>
            <button onClick={() => props.clickFunction("Programa Doutoral em Matemática")}>Doutoramento Matemática</button>
        </div>
    )
}