import axios from "axios";    
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmacionEnvio = () => {
    const params = useParams();
    const [confirmacion, setConfirmacion] = useState('');
    const getDetallesProducto = () => {
        axios.get(`http://localhost:5000/confirmacion-envio/${params.id}`)
            .then((response) => {
                // Establecer Valor al useState
                setConfirmacion(response.data);
                //Recibe producto
               console.log(response.data);
            })
            .catch((error) => {
                console.log("Error en el producto:", error);
            });
    };
    useEffect(() =>{
        getDetallesProducto();
    }, []);

    const notify = () => toast("Has adquirido: "+ confirmacion.producto_comprado);

    return(
        <div className="confirmacion_envio">
            <div className="pedido_confirmado">
                <p>Gracias por comprar en Fleek <i class="fas fa-shipping-fast"></i></p>
                <p>¡Hola <span className="textobold">{confirmacion.name}</span>, tu pedido ha sido recibido!</p>
                <p>Este es el ticket de tu pedido: <b>{confirmacion.id}</b>. ¡No lo pierdas!</p>
                <button className="btn_xpress" onClick={notify}>FLEEK RESUMEN</button>
                <ToastContainer
                position="bottom-center"
                autoClose={10000} />
            </div>
        </div>
    )
}

export default ConfirmacionEnvio; 