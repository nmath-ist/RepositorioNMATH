import "./WelcomeBox.css"

export default function WelcomeBox(props) {
  const username = props.userData?.name || '';
  
  return (
    <div className="MainBox">
      <div className="welcome-column-left">
        <div className="welcome-box">
          <h1 className="welcome-box-title course-title"> Olá {username}! Bem-vind@ ao Repositório de Matemática! </h1>
          <p className="welcome-box-text">Neste espaço tens os materiais que precisas para os cursos de LMAC, MMAC, MECD e DM.
            Contudo, o repositório é recente e ainda pode ter bugs no código, portanto, se encontrares algum problema, descreve-o num email para educacao.nmath.ist@gmail.com.
          </p>
          <h2 className="welcome-box-title">Bom Estudo!</h2>
        </div>

        <div className="welcome-box">
          <h1 className="welcome-box-title course-title"> Páginas dos Cursos </h1>
          <div className="course-buttons">
            <button className="course-btn" onClick={() => window.open('https://fenix.tecnico.ulisboa.pt/cursos/lmac', '_blank')}>
              LMAC
            </button>
            <button className="course-btn" onClick={() => window.open('https://fenix.tecnico.ulisboa.pt/cursos/mma', '_blank')}>
              MMAC
            </button>
            <button className="course-btn" onClick={() => window.open('https://fenix.tecnico.ulisboa.pt/cursos/mecd', '_blank')}>
              MECD
            </button>
            <button className="course-btn" onClick={() => window.open('https://fenix.tecnico.ulisboa.pt/cursos/dmat', '_blank')}>
              DM
            </button>
          </div>
        </div>
      </div>

      <div className="welcome-column-right">
        <div className="welcome-box">
          <h1 className="welcome-box-title course-title"> Regras para Fazeres Upload de Documentos </h1>
          <p className="welcome-box-text">O repositório permite os utilizadores fazerem upload de documentos. Para isso, deves verificar:</p>
          <ol>
            <li>Que o documento que queres fazer upload não existe já no repositório</li>
            <li>Se o documento for um teste ou exame deves colocar o seu nome nos seguintes formatos: [Iniciais da Cadeira]_[Tipo de Avaliação]_[Rec - Apenas se for recurso]_[Ano Letivo][R]. O símbolo [R] apenas se usa se o teste/exame tiver resolução. Exemplo: AL_Map1_2223[R]</li>
            <li>O documento está em formato pdf</li>
          </ol>
          <p>Se quiseres dar upload a muitos ficheiros, envia-os para educacao.nmath.ist@gmail.com indicando a que cadeira pertencem.</p>
          <h2 className="welcome-box-title">Obrigado pelo Contributo!</h2>
        </div>
      </div>
    </div>
  );
}