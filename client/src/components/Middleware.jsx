import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";

import Dashboard from "./Dashboard";
import DashboardAdmin from "./DashboardAdmin";

const Middleware = () =>{
    const [datos, setDatos] = useState('');
    const navigate = useNavigate();

    const getRole = () => {
        if (localStorage.getItem('token')) {
            const datos_cookie = JSON.parse(localStorage.getItem('datos'))
            setDatos(datos_cookie);
        } else {
            console.log("No hay token. Consigue uno.");
        }
      }

      useEffect(() =>{
        getRole()
      }, [])
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

    return (
        <div className="middleware">
            {datos.role === 'user' && <Dashboard/>}
            {datos.role === 'admin' && <DashboardAdmin/>}
        </div>
    )
}

export default Middleware;