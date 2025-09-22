import "./WelcomeBox.css"

export default function WelcomeBox(props) {
  return (<div className="MainBox">
    <div className="welcome-box">
      <h1 className="welcome-box-title">Bem-vind@ {props.name} ao Repositório de Matemática!</h1>
      <p  className="welcome-box-text"> Neste espaço tens os materiais que precisas para os cursos de LMAC, MMAC, MECD  e DM.
         Contudo, o repositório é recente e ainda pode ter bugs no código, portanto, se encontrares algum problema, descreve-o num email para educacao.nmath.ist@gmail.com.
        </p>

      <h2 className="welcome-box-title"> Bom Estudo!</h2>
    </div>


    <div className="welcome-box">
      <h1 className="welcome-box-title">Regras para Fazeres Upload de Documentos</h1>
      <p  className="welcome-box-text"> O repositório permite os utilizadores fazerem upload de documentos. Para isso, deves verificar: </p>
        <ol>
            <li> Que estás na pasta correta, ou seja, apenas prime o butão upload se estiveres no local da pasta que queres colocar o documento</li>
            <li> Que o documento que queres fazer upload não existe já no repositório</li>
            <li> Se o documento for um teste ou exame deves colocar o seu nome nos seguintes formatos: MAP2_2324[R], MAP2_2324, Exame_2324 ou Exame_Rec_2324. O símbolo [R] apenas se usa se o teste/exame tiver resolução </li>
            <li> O documento está em formato pdf </li>
        </ol> 
        <p> Se quiseres dar upload a muitos ficheiros, envia-os para educacao.nmath.ist@gmail.com indicando a que cadeira pertencem. </p>

        <h2 className="welcome-box-title"> Obrigado pelo Contributo!</h2>
    </div>
    </div>
  );
}