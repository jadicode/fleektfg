import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css'

const Dashboard = ()=> {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState('');

    const getUserDetails = () => {

        Axios.get('http://localhost:5000/auth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then((response) => {
            setUserDetails(response.data);
        })
        .catch((error) => {
            console.log("Error al obtener los detalles del usuario.", error);
        })
    }

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login/')
        } else {
            console.log("Ruta protegida");
            setUserDetails(token);
        }
    }
    
    useEffect(() =>{
        getUserDetails();
        window.scrollTo(0, 0);
    }, []);
        
    useEffect(() =>{
        checkAuth();
    }, []);

        return(
            <div className="dashboard">
                <h1>Bienvenido a tu FleekPanel</h1>
                <p class="dashboard_desc">¡Accede a los descuentos exclusivos de Fleek y mucho más!</p>
                <div className="panel">
                    <div className="panel_option">
                        <p>Fleek Ocasión</p>
                        <i class="fas fa-award"></i>
                        <Link className="link_panel" to="/fleekocasion">Acceder</Link>
                    </div>
                    <div className="panel_option">
                        <p>Mi Carrito</p>
                        <i class="fas fa-cart-arrow-down"></i>
                        <Link className="link_panel" to="/cart">Ir</Link>
                    </div>
                    <div className="panel_option">
                        <p>Ajustes</p>
                        <i class="fas fa-cog"></i>
                        <Link className="link_panel" to="/settings">Editar</Link>
                    </div>
                </div>
            </div>
        )
    }

export default Dashboard;