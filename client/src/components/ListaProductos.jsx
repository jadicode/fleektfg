import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../assets/css/admin.css'
import swal from 'sweetalert';


const ListaProductos = ()=> {
    const navigate = useNavigate();

    const [allproductos, setAllProductos] = useState('');
    const [search, setSearch] = useState('');
    const [eliminar, setEliminar] = useState('');
    const getAllProductos = () =>{
        Axios.get('http://localhost:5000/lista-productos/')
        .then((response) => {
            console.log(response.data);
            setAllProductos(response.data);
        })
    }

    function Swalling() {
        swal({
            title: `Estás apunto de eliminar el producto nº${eliminar}`,
            text: "Una vez lo elimines, no se podrá restaurar.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            eliminarProducto();
              swal(`Producto nº${eliminar}, eliminado. Recarga la página para ver los resultados.`, {
                icon: "success",
              });
            } else {
              swal("No se ha eliminado ningún producto.");
            }
          });
    }
    const eliminarProducto = () =>{
        Axios.delete(`http://localhost:5000/adminproducto/${eliminar}`)
        .then((response) => {
            console.log("PRODUCTO ELIMINADO");
        }).catch((err) =>{
            console.log("Algo salió mal");
        })
    }

    const handleChange = (event) =>{
        setEliminar(event.target.value)
        console.log(eliminar);
        navigate("/listado-productos/")
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
        getAllProductos();
    }, []);
  

    
        return(
            <div className="adminpedidos">
                <h2>Productos de Fleek</h2>
                <div className="adminsearch">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar por nombre..." onChange={event => {setSearch(event.target.value)}}/>
                </div>
                <div className="admineliminar">
                <button onClick={Swalling}><i class="fas fa-trash-alt"></i></button>
                    <input type="text" placeholder="ID del producto a eliminar..." onChange={handleChange}/>
                </div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre del Producto</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Envío</th>
                            <th>Stock</th>
                        </tr>
                    {
                    allproductos.length > 0 && (
                        allproductos.filter((allproductos) => {
                            if (search == ""){
                                return allproductos
                            } else if(allproductos.name.toLowerCase().includes(search.toLowerCase())){
                                return allproductos
                            }
                        }).map( allproductos => 
                            <tr key={allproductos.id}>
                                <td>{allproductos.id}</td>
                                <td><img className="img_filtered" alt="Producto destacado" src={"http://localhost:5000/" + allproductos.image_path}/></td>
                                <td>{allproductos.name}</td>
                                <td>{allproductos.brand}</td>
                                <td>{allproductos.price} €</td>
                                <td>{allproductos.categoria}</td>
                                <td>{allproductos.delivery}</td>
                                <td>{allproductos.stock}</td>
                            </tr>
                        )
                    )
                    }   
                    </table>    
                    
                </div>
        )
                }        
export default ListaProductos;