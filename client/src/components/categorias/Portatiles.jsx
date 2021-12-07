import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

const Portatiles = () => {
    const { addItem } = useCart();

    const [portatil, setPortatil] = useState('');
    const [search, setSearch] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/portatiles/')
        .then((response) => {
            console.log(response.data);
            setPortatil(response.data);
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
                        <h1 className="fleekocasion">Portátiles / <span className="fleekinfotext">Elige tu favorito</span></h1>
                        <hr className="fleekhr"/>
                        <p>Encuentra tu portátil de uso diario.</p>
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
                    portatil.length > 0 && (
                        portatil.filter((portatil) => {
                            if (search === ""){
                                return portatil
                            } else if(portatil.name.toLowerCase().includes(search.toLowerCase())){
                                return portatil
                            }
                        }).map( portatil => 
                            <Link className="renderDestacados" to={`/productos/${portatil.id}`}><div className="destacado" key={portatil.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + portatil.image_path}/>
                            <div className="texto_destacado">
                                <p>{portatil.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{portatil.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(portatil)}><i class="fas fa-cart-plus"></i></button>
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

export default Portatiles;