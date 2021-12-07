import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../assets/css/admin.css'

const AdministrarPedidosMultiples = ()=> {
    const navigate = useNavigate();

    const [pedido, setPedido] = useState('');
    const [parsering, setParsering] = useState('');
    const [search, setSearch] = useState('');
    const getPedidos = () =>{
        Axios.get('http://localhost:5000/lista-pedidos-multiples/')
        .then((response) => {
            console.log(response.data);
            setPedido(response.data);
            setParsering(JSON.stringify(response.data.items_comprados));
            console.log(parsering);
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

    function onclikaso(){
        alert(parsering)
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
                <h2>Lista de Pedidos Múltiples</h2>
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
                                <p>¡No hay ningún pedido múltiple! </p>
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
                                <button onClick={onclikaso}>VER PEDIDO</button>
                            </tr>
                        )
                    )
                    }   
                    </table>    
                    
                </div>
        )
                }        
export default AdministrarPedidosMultiples;