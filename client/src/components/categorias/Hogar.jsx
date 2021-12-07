import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

const Hogar = () => {
    const { addItem } = useCart();

    const [search, setSearch] = useState('');
    const [hogar, setHogar] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/hogar/')
        .then((response) => {
            console.log(response.data);
            setHogar(response.data);
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
                        <h1 className="fleekocasion">Hogar / <span className="fleekinfotext">Elige tu favorito</span></h1>
                        <hr className="fleekhr"/>
                        <p>Tu hogar inteligente con Fleek.</p>
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
                    hogar.length > 0 && (
                        hogar.filter((hogar) => {
                            if (search === ""){
                                return hogar
                            } else if(hogar.name.toLowerCase().includes(search.toLowerCase())){
                                return hogar
                            }
                        }).map(hogar => 
                            <Link className="renderDestacados" to={`/productos/${hogar.id}`}><div className="destacado" key={hogar.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + hogar.image_path}/>
                            <div className="texto_destacado">
                                <p>{hogar.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{hogar.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(hogar)}><i class="fas fa-cart-plus"></i></button>
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

export default Hogar;