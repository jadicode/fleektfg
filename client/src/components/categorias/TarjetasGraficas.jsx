import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { CartProvider, useCart } from "react-use-cart";

const TarjetasGraficas = () => {
    const { addItem } = useCart();

    const [tarjetasGraficas, setTarjetasGraficas] = useState('');
    const [search, setSearch] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/tarjetas-graficas/')
        .then((response) => {
            console.log(response.data);
            setTarjetasGraficas(response.data);
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
                        <h1 className="fleekocasion">Tarjetas Gráficas / <span className="fleekinfotext">Elige tu favorita</span></h1>
                        <hr className="fleekhr"/>
                        <p>Desde NVIDIA hasta AMD pasando por QUADRO.</p>
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
                    tarjetasGraficas.length > 0 && (
                        tarjetasGraficas.filter((tarjetasGraficas) => {
                            if (search === ""){
                                return tarjetasGraficas
                            } else if(tarjetasGraficas.name.toLowerCase().includes(search.toLowerCase())){
                                return tarjetasGraficas
                            }
                        }).map( tarjetasGraficas => 
                            <Link className="renderDestacados" to={`/productos/${tarjetasGraficas.id}`}><div className="destacado" key={tarjetasGraficas.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + tarjetasGraficas.image_path}/>
                            <div className="texto_destacado">
                                <p>{tarjetasGraficas.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{tarjetasGraficas.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(tarjetasGraficas)}><i class="fas fa-cart-plus"></i></button>
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
export default TarjetasGraficas;