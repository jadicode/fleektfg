import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../assets/css/admin.css'

const ListaUsuarios = ()=> {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [search, setSearch] = useState('');
    const getUsuarios = () =>{
        Axios.get('http://localhost:5000/user/')
        .then((response) => {
            console.log(response.data);
            setUsuario(response.data);
        })
    }

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login/')
        } else {
            console.log("Ruta protegida");
        }
    }

    useEffect(() =>{
        checkAuth();
        window.scrollTo(0, 0);
    }, []);
    useEffect(() =>{
        getUsuarios();
    }, []);
  

    
        return(
            <div className="adminpedidos">
                <h2>Usuarios registrados en Fleek</h2>
                <div className="adminsearch">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar por nombre..." onChange={event => {setSearch(event.target.value)}}/>
                </div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>E-mail</th>
                            <th>Contraseña</th>
                        </tr>
                    {
                    usuario.length > 0 && (
                        usuario.filter((usuario) => {
                            if (search == ""){
                                return usuario
                            } else if(usuario.username.toLowerCase().includes(search.toLowerCase())){
                                return usuario
                            }
                        }).map( usuario => 
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.password}</td>
                            </tr>
                        )
                    )
                    }   
                    </table>    
                    
                </div>
        )
                }        
export default ListaUsuarios;