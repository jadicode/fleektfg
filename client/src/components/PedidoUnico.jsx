import axios from "axios";    
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PedidoUnico = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [pedido, setPedido] = useState('');

    const getDetallesPedido = () => {
        axios.get(`http://localhost:5000/comprar/${params.id}`)
            .then((response) => {
                // Establecer Valor al useState
                setPedido(response.data);
                //Recibe producto
               console.log(response.data);
            })
            .catch((error) => {
                console.log("Error en el producto:", error);
            });
    };

    useEffect(() =>{
        getDetallesPedido();
        window.scrollTo(0, 0);
    }, []);

    const url ="http://localhost:5000/pedidos/";
    const [data, setData] = useState({
        name:"",
        calle:"",
        ciudad:"",
        codigopostal:""
    })

    function submit(e) {
        e.preventDefault();
        axios.post(url,{
            name: data.name,
            calle: data.calle,
            ciudad: data.ciudad,
            codigopostal: data.codigopostal,
            producto_comprado: `${pedido.name}`
        })
        .then(response => {
            console.log(response.data);
            navigate(`/confirmacion-envio/${response.data.id}`);
        })
    }

    function handle(e) {
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata);
    }



    return(
        <div className="detalles_pedido">
            <h1>Resumen de tu pedido</h1>
            <hr className="hr_producto"></hr>
            <div className="grid_details">
                <div className="detalles_compra">
                    <div className="details">
                        <img src={"http://localhost:5000/" + pedido.image_path} alt={pedido.name} />
                        <div className="product_details">
                            <p>{pedido.name}</p>
                            <p>{pedido.price}€</p>
                            <br/>
                            <p>Envío: <span className="delivery">4.99€</span></p>
                        </div>
                    </div>
                </div>
                <div className="quantity">
                    <p>x1 (CANTIDAD)</p>
                </div>
            </div>
            <hr className="hr_producto"></hr>
            <div className="formulario_pedido">
                <form className="formpedido" encType="multipart/form-data" onSubmit={(e) => submit(e)}>
                    <div className="datos_de_envio">
                        <h3>Datos para el pedido</h3>
                        <label htmlFor="name">Nombre y Apellidos</label>
                        <input required onChange={(e) => handle(e)} id="name" value={data.name} placeholder="Ej: Javier Díaz Fernández" type="text" name="name"/>
                        <label  htmlFor="calle">Calle/Piso + Bloque/Nº</label>
                        <input required onChange={(e) => handle(e)} id="calle" value={data.calle} placeholder="Ej: Avenida del Águila, 40" type="text" name="calle"/>
                        <label htmlFor="ciudad">Ciudad</label>
                        <input required onChange={(e) => handle(e)} id="ciudad" value={data.ciudad} placeholder="Ej: La Línea de la Concepción" type="text" name="ciudad"/>
                        <label htmlFor="codigopostal">Código Postal</label>
                        <input required onChange={(e) => handle(e)} id="codigopostal" value={data.codigopostal} placeholder="Ej: 11300" type="text" name="codigopostal"/>
                        <input className="confirmarpedido" type="submit" value="Finaliza tu compra" />
                    </div>
                    <div className="metodo_de_pago">
                        <h3>Método de pago</h3>
                        <div className="payment">
                            <div>
                                <label htmlFor="mastercard">Mastercard</label>
                                <input type="checkbox" name="mastercard"/>
                            </div>
                            <div>
                                <label htmlFor="visa">Visa</label>
                                <input type="checkbox" name="visa"/>
                            </div>
                            <div>
                                <label htmlFor="paypal">PayPal</label>
                                <input type="checkbox" name="paypal"/>
                            </div>
                        </div>
                        <hr className="hrmetodo"></hr>
                        <p>Total: <span id="totalpedido">{pedido.price}€</span> <span className="iva">(IVA incluido)</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PedidoUnico; 