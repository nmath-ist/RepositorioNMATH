import './header.css'



export default function Header(props) {


  return (
  <header className ='header' >
  <img className = 'image' src="/Imagens/NMATH.png" alt="NMATH" />
      <h1 className = 'titulo' onClick={props.clickFunction}> Repositório de Matemática </h1>
    <form onSubmit = {props.actionFunction}>
        <input className = 'pesquisar' type="text" placeholder="&#128270; Pesquisar Conteúdo..." name = "query" />
        <button type="submit" style = {{display: 'none'}}> </button>
    </form>
    <button className = 'upload' type = "button" > Upload </button>
  </header>);
}