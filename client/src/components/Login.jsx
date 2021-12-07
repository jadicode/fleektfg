import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorStatus, setErrorStatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    
    const login = () =>{
        Axios.post("http://localhost:5000/login/", {
            username: username,
            password: password,
        }).then((response) =>{
            if (!response.data.auth){
                setLoginStatus(false)
                setErrorStatus(true)
                console.log("Usuario o contraseña incorrectos!");
            } else{
                localStorage.setItem("token", response.data.token);
                setLoginStatus(true)
                localStorage.setItem("datos", JSON.stringify(response.data.foundUser))
                navigate("/dashboard/");
            }
        })
    }

    const checkAuth = () => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard/')
        } else {
            console.log("¡Inicia sesión en Fleek :D!");
        }
    }

    useEffect(() =>{
        checkAuth();
        window.scrollTo(0, 0);
    });
    return(
        <div className="login_page">
            <div className="form_login">
            <i class="fas fa-sign-in-alt"></i>
                 <h1>Inicia sesión</h1>
                <label>Usuario</label>
                <input placeholder="Usuario..." type="text" onChange={(e) => { setUsername(e.target.value)}} />
                <label>Contraseña</label>
                <input placeholder="Contraseña..." type="password" onChange={(e) => { setPassword(e.target.value)}} />
                <p>¿Eres nuevo en Fleek? <Link className="XD" to="/register/">Crea tu cuenta</Link>.</p>
                <button onClick={login}>Inicia Sesión</button>
            </div>
            {loginStatus && (
                <button onClick={checkAuth}> Comprueba auth </button>
            )}
                        {errorStatus &&(
                <div className="error_login">
                    <p><b>¡Ups :( !</b> Usuario o contraseña incorrectos.</p>
                </div>
            )}
        </div>
    )
}

export default Login;