import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

const Accesorios = () => {
    const { addItem } = useCart();

    const [search, setSearch] = useState('');
    const [accesorio, setAccesorios] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/accesorios/')
        .then((response) => {
            console.log(response.data);
            setAccesorios(response.data);
        })
    }

    useEffect(() =>{
        getProducts();
        window.scrollTo(0, 0);
    }, []);

    
        return(
            <div className="categoria_fleek">
                <div className="bg-white">
                    <div className="fleektitle">
                        <h1 className="fleekocasion">Accesorios / <span className="fleekinfotext">Elige tu favorito</span></h1>
                        <hr className="fleekhr"/>
                        <p>Todos los accesorios disponibles en Fleek.</p>
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
                    accesorio.length > 0 && (
                        accesorio.filter((accesorio) => {
                            if (search === ""){
                                return accesorio
                            } else if(accesorio.name.toLowerCase().includes(search.toLowerCase())){
                                return accesorio
                            }
                        }).map( accesorio => 
                            <Link className="renderDestacados" to={`/productos/${accesorio.id}`}><div className="destacado" key={accesorio.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + accesorio.image_path}/>
                            <div className="texto_destacado">
                                <p>{accesorio.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{accesorio.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(accesorio)}><i class="fas fa-cart-plus"></i></button>
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

export default Accesorios;