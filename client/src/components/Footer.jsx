import '../assets/css/style.css';
import LogoFooter from '../assets/img/fleekfooter.png';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-size">
        <div className="grid_footer">
          <div className="enlaces_footer">
            <p>Porqué comprar</p>
            <a href="/">Fleek Ocasión</a>
            <a href="/">Pagos</a>
            <a href="/">Envíos</a>
            <a href="/">Devoluciones</a>
            <a href="/">Atención al Cliente</a>
          </div>
          <div className="enlaces_footer">
            <p>Conócenos</p>
            <a href="/">¿Donde estamos?</a>
            <a href="/">Bolsa Empleo</a>
            <a href="/">Política de Cookies</a>
            <a href="/">Política de Privacidad</a>
            <a href="/">Aviso Legal</a>
          </div>
          <div className="enlaces_footer">
            <p>Redes Sociales</p>
            <a href="/">Facebook</a>
            <a href="/">Instagram</a>
            <a href="/">Twitter</a>
            <a href="/">TikTok</a>
            <a href="/">LinkedIn</a>
          </div>
        </div>
        <div className="footer_logo">
          <img src={LogoFooter} width="140" alt="Fleek | World´s technology"></img>
          <p>© Fleek T.F.G | Javier Díaz Fernández</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
