import '../assets/css/style.css';

import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    
    const [data, setData] = useState('');


    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login/')
        } else {
            console.log("Ruta protegida");
        }
    }

    const getInfo = () => {
        if (localStorage.getItem('token')) {
            const datos_cookie = JSON.parse(localStorage.getItem('datos'))
            setData(datos_cookie);
        } else {
            console.log("No hay token. Consigue uno.");
        }
      }

    const [updateUser, setUpdateUser] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');

    const updateInfo = async () => {
        const parametros ={
            id: data.id,
            username: updateUser,
            email: updateEmail,
            password: updatePassword,
        }
        Axios.put('http://localhost:5000/user/',
        parametros
        ).then((response) => {
            console.log("Usuario actualizado.");
            console.log(response.data);
            localStorage.removeItem("token")
            localStorage.removeItem("datos")
            navigate("/");
            
        }).catch((err) => {
            console.log("Error al actualizar.");
        })
    }

    const deleteUser = () =>{
        Axios.delete(`http://localhost:5000/user/${data.id}`)
        .then((response) => {
            localStorage.removeItem("token")
            localStorage.removeItem("datos")
            navigate("/");
        }).catch((err) =>{
            console.log(err);
        })
    }
    useEffect(() =>{
        checkAuth();
    },);

    useEffect(() =>{
        getInfo();
      },[]);
  return (
      <div className="user_settings">
        <div className="settings">
            <h1>Fleek Settings</h1>
            <p>Modifica tus datos personales.</p>
            <div className="settings_block">
                <form>
                    <label>Número de Identificación de Fleek</label>
                    <input id="readonly" type="text" value={data.id} readOnly></input>
                    <label>Nombre de Usuario</label>
                    <input onChange={(e) => { setUpdateUser(e.target.value)}} type="text" placeholder={data.username} required></input>
                    <label>Correo electrónico</label>
                    <input onChange={(e) => { setUpdateEmail(e.target.value)}} type="text" placeholder={data.email} required></input>
                    <label>Contraseña</label>
                    <input onChange={(e) => { setUpdatePassword(e.target.value)}} type="text" placeholder={data.password} required></input>
                    <div className="user_actions">
                        <button className="enviar_settings" onClick={updateInfo}>Actualizar</button>
                        <button className="delete_settings" onClick={deleteUser}>Elimina tu cuenta</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="aviso_warning">
            <div className="logo_warning">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div className="text_warning">
                <h2>Política de Cambios</h2>
                <p>Al cambiar alguno de tus datos, se te pedirá que inicies sesión con las credenciales que proporcionaste.</p>
            </div>
        </div>
    </div>
  );
}

export default Settings;
