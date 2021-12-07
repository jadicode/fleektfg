import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Contacto = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const enviarCorreo = () =>{
        axios.post("http://localhost:5000/contact/", {
            name: name,
            email: email,
            message: message
        }).then((response) =>{
            console.log(response);
            navigate("/form-submitted")
        })
    }

    return(
        <div className="contact">
            <div className="contact-info">
                <h1>Contáctanos</h1>
                <p>¿Tienes alguna duda con tu pedido, pago o producto? Rellena el formulario y nos pondremos rápidamente en contacto contigo.</p>
                <p className="info-apartado-contact"><i class="fas fa-share-alt-square"></i> Síguenos en nuestras redes</p>
                <p className="info-apartado-contact"><i class="fas fa-database"></i> No hacemos negocio con tus datos</p>
                <p className="info-apartado-contact"><i class="fas fa-reply-all"></i> Respondemos en 24h laborables</p>
            </div>
            <div className="contact-form">
              <label>Nombre</label>
              <input placeholder="Nombre..." type="text" onChange={(e) => { setName(e.target.value)}} required/>
              <label>Email</label>
              <input placeholder="Correo electrónico..." type="email" onChange={(e) => { setEmail(e.target.value)}} required/>
              <label>Mensaje</label>
              <textarea  placeholder="Mensaje..." type="text" onChange={(e) => { setMessage(e.target.value)}} required/>
              <button onClick={enviarCorreo}>Enviar</button>
            </div>
        </div>
    )
}

export default Contacto
