import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { CartProvider, useCart } from "react-use-cart";

const FleekOcasion = ()=> {
    const navigate = useNavigate();
    const { addItem } = useCart();

    const [fleekocasion, setFleekOcasion] = useState('');
    const [search, setSearch] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/fleekocasion/')
        .then((response) => {
            console.log(response.data);
            setFleekOcasion(response.data);
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
        getProducts();
        window.scrollTo(0, 0);
    }, []);

    
        return(
            <div className="categoria_fleek">
                <div className="bg-white">
                    <div className="fleektitle">
                        <h1 className="fleekocasion">Fleek Ocasión / <span className="fleekinfotext">Descuentos exclusivos</span></h1>
                        <hr className="fleekhr"/>
                        <p>Aprovecha tus ventajas como usuario y compra con descuento en productos seleccionados.</p>
                    </div>
                </div>

                <div className="content_categoria">
                    <div className="searchbar">
                        <i className="fas fa-indent"></i>
                        <p className="filtro">Filtros</p>
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Buscar..." onChange={event => {setSearch(event.target.value)}}/>
                    </div>
                    <div className="grid_productos">
                    {
                    fleekocasion.length > 0 && (
                        fleekocasion.filter((fleekocasion) => {
                            if (search === ""){
                                return fleekocasion
                            } else if(fleekocasion.name.toLowerCase().includes(search.toLowerCase())){
                                return fleekocasion
                            }
                        }).map( fleekocasion => 
                            <Link className="renderDestacados" to={`/productos/${fleekocasion.id}`}><div className="destacado" key={fleekocasion.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + fleekocasion.image_path}/>
                            <div className="texto_destacado">
                                <p>{fleekocasion.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{fleekocasion.discount} €</p>
                                        <p>{fleekocasion.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(fleekocasion)}><i class="fas fa-cart-plus"></i></button>
                                </div>
                            </div>
                        </div></Link>
                        )
                    )
                    }       
                    </div>
                    
                </div>
            </div>
        )
                }        
export default FleekOcasion;