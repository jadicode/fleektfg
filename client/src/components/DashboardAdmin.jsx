import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css'

const DashboardAdmin = ()=> {
    const navigate = useNavigate();

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

        return(
            <div className="dashboardadmin">
                <h1>Panel de Administrador</h1>
                <div className="grid-admin-options">
                <Link className="link-admin" to="/subir-producto/">
                    <div className="option-admin">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Sube un producto</p>
                    </div>
                </Link>
                <Link className="link-admin" to="/lista-pedidos/">
                    <div className="option-admin">
                        <i class="fas fa-list"></i>
                        <p>Pedidos individuales</p>
                    </div>
                </Link>
                <Link className="link-admin" to="/lista-pedidos-multiples/">
                    <div className="option-admin">
                        <i class="fas fa-store"></i>
                        <p>Pedidos múltiples</p>
                    </div>
                </Link>
                <Link className="link-admin" to="/lista-usuarios/">
                    <div className="option-admin">
                        <i class="fas fa-users"></i>
                        <p>Usuarios registrados</p>
                    </div>
                </Link>
                <Link className="link-admin" to="/listado-productos/">
                    <div className="option-admin">
                        <i class="fas fa-store"></i>
                        <p>Listado de productos</p>
                    </div>
                </Link>
                
                </div>
            </div>
        )
    }

export default DashboardAdmin;