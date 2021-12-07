import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

const Consolas = () => {
    const { addItem } = useCart();

    const [search, setSearch] = useState('');
    const [consola, setConsola] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/consolas/')
        .then((response) => {
            console.log(response.data);
            setConsola(response.data);
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
                        <h1 className="fleekocasion">Consolas / <span className="fleekinfotext">Elige tu favorita</span></h1>
                        <hr className="fleekhr"/>
                        <p>Las mejores para tus juegos.</p>
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
                    consola.length > 0 && (
                        consola.filter((consola) => {
                            if (search === ""){
                                return consola
                            } else if(consola.name.toLowerCase().includes(search.toLowerCase())){
                                return consola
                            }
                        }).map(consola => 
                            <Link className="renderDestacados" to={`/productos/${consola.id}`}><div className="destacado" key={consola.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + consola.image_path}/>
                            <div className="texto_destacado">
                                <p>{consola.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{consola.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(consola)}><i class="fas fa-cart-plus"></i></button>
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

export default Consolas;