import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a
          href="https://www.nmath.pt/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-back-link"
        >
          ← Voltar ao site do NMATH
        </a>

        <div className="footer-links">
          <a href="https://www.instagram.com/nmath_ist/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/company/nmath-ist/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:nmath.geral@gmail.com">nmath.geral@gmail.com</a>
        </div>

        <p className="footer-note"> Núcleo de Estudantes de Matemática do IST</p>
      </div>
    </footer>
  );
}