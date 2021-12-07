import React from 'react'
import axios from "axios";    
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";

const CartCheckout = () => {
    const {
        cartTotal,
      } = useCart();
    const navigate = useNavigate();

    useEffect(() =>{
        window.scrollTo(0, 0);
    }, []);

    const url ="http://localhost:5000/pedido-multiple/";
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
            items_comprados: localStorage.getItem('react-use-cart')
        })
        .then(response => {
            console.log(response.data);
            navigate(`/confirmacion-envio-multiple/${response.data.id}`);
        })
    }

    function handle(e) {
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata);
    }

    return (
        <div className="detalles_pedido">
        <h1>Finaliza tu pedido</h1>
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
                    <p>Total: <span id="totalpedido">{cartTotal}€</span> <span className="iva">(IVA incluido)</span></p>
                </div>
            </form>
        </div>
    </div>
    )
}

export default CartCheckout
