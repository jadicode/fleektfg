import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

const Sobremesa = () => {
    const { addItem } = useCart();

    const [sobremesa, setSobreMesa] = useState('');
    const [search, setSearch] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/sobremesa/')
        .then((response) => {
            console.log(response.data);
            setSobreMesa(response.data);
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
                        <h1 className="fleekocasion">FleekPC´s / <span className="fleekinfotext">Elige tu favorito</span></h1>
                        <hr className="fleekhr"/>
                        <p>Busca el rendimiento que te atraiga.</p>
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
                    sobremesa.length > 0 && (
                        sobremesa.filter((sobremesa) => {
                            if (search === ""){
                                return sobremesa
                            } else if(sobremesa.name.toLowerCase().includes(search.toLowerCase())){
                                return sobremesa
                            }
                        }).map( sobremesa => 
                            <Link className="renderDestacados" to={`/productos/${sobremesa.id}`}><div className="destacado" key={sobremesa.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + sobremesa.image_path}/>
                            <div className="texto_destacado">
                                <p>{sobremesa.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{sobremesa.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(sobremesa)}><i class="fas fa-cart-plus"></i></button>
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
export default Sobremesa;