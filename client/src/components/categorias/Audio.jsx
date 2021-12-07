import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

const Audio = () => {
    const { addItem } = useCart();

    const [search, setSearch] = useState('');
    const [audio, setAudio] = useState('');
    const getProducts = () =>{
        Axios.get('http://localhost:5000/audio/')
        .then((response) => {
            console.log(response.data);
            setAudio(response.data);
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
                        <h1 className="fleekocasion">Audio / <span className="fleekinfotext">Elige desde tu buen oído.</span></h1>
                        <hr className="fleekhr"/>
                        <p>El mejor sonido .</p>
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
                    audio.length > 0 && (
                        audio.filter((audio) => {
                            if (search === ""){
                                return audio
                            } else if(audio.name.toLowerCase().includes(search.toLowerCase())){
                                return audio
                            }
                        }).map(audio => 
                            <Link className="renderDestacados" to={`/productos/${audio.id}`}><div className="destacado" key={audio.id}>
                            <img alt="Producto destacado" src={"http://localhost:5000/" + audio.image_path}/>
                            <div className="texto_destacado">
                                <p>{audio.name}</p>
                                <div className="precios-producto">
                                    <div className="precios-prod">
                                        <p>{audio.price} €</p>
                                    </div>
                                    <button className="add-to-cart-min" onClick={() => addItem(audio)}><i class="fas fa-cart-plus"></i></button>
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

export default Audio;