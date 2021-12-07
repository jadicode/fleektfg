import { Link } from 'react-router-dom';
import '../assets/css/style.css';

function Error() {
  return (
    <div className="notfound">
        <p className="pre_error">¡Oops :(!</p>
        <p className="error_title">Error 404</p>
        <p>La página que buscas no está disponible o no existe.</p>
        <Link className="volverinicio" to="/">Vuelve al Inicio</Link>
    </div>
  );
}

export default Error;
