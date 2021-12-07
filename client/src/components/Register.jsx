import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const register = () =>{
        Axios.post("http://localhost:5000/register/", {
            username: usernameReg,
            email: emailReg,
            password: passwordReg,
            role: 'user'
        }).then((response) =>{
            console.log(response);
            navigate("/login");
        })
    }

    return(
        <div className="register">
            <div className="form">
              <i class="far fa-address-book"></i>
              <h1>¡Crea tu cuenta de Fleek!</h1>
              <label>Usuario</label>
              <input placeholder="Nombre de usuario..." type="text" onChange={(e) => { setUsernameReg(e.target.value)}} required/>
              <label>Email</label>
              <input placeholder="Correo electrónico..." type="email" onChange={(e) => { setEmailReg(e.target.value)}} required/>
              <label>Password</label>
              <input  placeholder="Contraseña..." type="text" onChange={(e) => { setPasswordReg(e.target.value)}} required/>
              <button onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Login;