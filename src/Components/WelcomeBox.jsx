import "./WelcomeBox.css"

export default function WelcomeBox(props) {
  const username = props.userData?.givenNames || '';
  return (
    <div className="MainBox">
<img className="solido-fundo solido-1" src="/solidos/tetraedro.png" alt="" aria-hidden="true" />
<img className="solido-fundo solido-2" src="/solidos/cubo.png" alt="" aria-hidden="true" />
<img className="solido-fundo solido-3" src="/solidos/dodecaedro.png" alt="" aria-hidden="true" />
<img className="solido-fundo solido-4" src="/solidos/icosaedro.png" alt="" aria-hidden="true" />

      <div className="welcome-content">
        <section className="welcome-section">
          <h1 className="welcome-title">Olá{username ? `, ${username}` : ''}. Bem-vind@ ao Repositório de Matemática.</h1>
          <p className="welcome-text">
            Neste espaço encontras os materiais para os cursos de LMAC, MMAC, MECD e DM.
            O repositório é recente e ainda pode ter bugs, se encontrares algum problema ou algo que possamos melhorar,
            descreve-o num email para <span className="mono">gabriela.barros@tecnico.ulisboa.pt</span>.
          </p>
          <p className="welcome-signoff">Bom estudo!</p>
        </section>

        <hr className="divider" />

        <section className="welcome-section">
          <h2 className="section-label">Páginas dos cursos</h2>
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
        </section>

        <hr className="divider" />

        <section className="welcome-section">
          <h2 className="section-label">Regras para upload de documentos</h2>
          <p className="welcome-text">O repositório permite que os utilizadores façam upload de documentos. Antes de o fazeres, verifica:</p>
          <ol className="welcome-list">
            <li>Que o documento não existe já no repositório.</li>
            <li>Se for um teste ou exame, que o nome segue o formato: [Iniciais da Cadeira]_[Tipo de Avaliação]_[Rec — apenas se for recurso]_[Ano Letivo][R]. O [R] usa-se apenas se o teste/exame tiver resolução. Exemplo: <span className="mono">AL_MAP1_2223[R]</span></li>
            <li>Que o documento está no formato certo.</li>
          </ol>
          <p className="welcome-text">Para o fazeres basta clicares em "Escolher ficheiro" no canto superior direito, selecionar o ficheiro e clicar em "Upload".</p>
          <p className="welcome-signoff">Obrigado pelo contributo!</p>
        </section>
      </div>
    </div>
  );
}
