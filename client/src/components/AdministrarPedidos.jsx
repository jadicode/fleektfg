import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../assets/css/admin.css'

const AdministrarPedidos = ()=> {
    const navigate = useNavigate();

    const [pedido, setPedido] = useState('');
    const [search, setSearch] = useState('');
    const getPedidos = () =>{
        Axios.get('http://localhost:5000/lista-pedidos/')
        .then((response) => {
            console.log(response.data);
            setPedido(response.data);
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
        getPedidos();
    }, []);
  

    
        return(
            <div className="adminpedidos">
                <h2>Lista de Pedidos</h2>
                <div className="adminsearch">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar por nombre..." onChange={event => {setSearch(event.target.value)}}/>
                </div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Calle</th>
                            <th>Ciudad</th>
                            <th>Código Postal</th>
                            <th>Producto Comprado</th>
                        </tr>
                        {
                            pedido.length == "" &&(
                                <p>¡No hay ningún pedido individual! </p>
                            )
                        }
                    {
                    pedido.length > 0 && (
                        pedido.filter((pedido) => {
                            if (search == ""){
                                return pedido
                            } else if(pedido.name.toLowerCase().includes(search.toLowerCase())){
                                return pedido
                            }
                        }).map( pedido => 
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.name}</td>
                                <td>{pedido.calle}</td>
                                <td>{pedido.ciudad}</td>
                                <td>{pedido.codigopostal}</td>
                                <td>{pedido.producto_comprado}</td>
                            </tr>
                        )
                    )
                    }   
                    </table>    
                    
                </div>
        )
                }        
export default AdministrarPedidos;