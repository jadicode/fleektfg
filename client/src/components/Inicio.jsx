import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';


export default class Inicio extends Component {
  // JSON datos vacíos para insertar.
  state = { data: [] };

  componentDidMount() {
    // GET REQUEST AL ENTRAR EN LA PÁGINA
    // Petición async a nuestra url
    fetch('http://localhost:5000/productos/')
      // Body a JSON
      .then(response => response.json())
      // and update the state data to said json
      .then(data => this.setState({ data }));
  }
  
    render() {
      return (
          <div className="inicio">
              <div className="extra_banner">
                <p>¡Echa un vistazo a <span>Fleek Ocasión</span>! Descuentos exclusivos para usuarios registrados.</p>
            </div>
            <div className="carousel-size">
                <div className="carousel">
                <p>¡Encuentra tus favoritos en <span className="colorazul">Fleek</span>!</p>
                    <h2>¿Qué estás buscando hoy?</h2>
                    <Carousel className="item-slide" itemsToShow={6} disableArrowsOnEnd={false} pagination={false}>
                        <Link className="general_link" to="/fleekocasion"><div className="categoria">
                            <i class="fas fa-award"></i>
                            <p className="p-categoria">Fleek Ocasión</p>
                        </div></Link>
                        <Link className="general_link" to="/tarjetas-graficas"><div className="categoria">
                            <i class="fas fa-hourglass-half"></i>
                            <p className="p-categoria">Tarjetas Gráficas</p>
                        </div></Link>
                        <Link className="general_link" to="/sobremesa"><div className="categoria">
                            <i class="fas fa-desktop"></i>
                            <p className="p-categoria">Sobremesa</p>
                        </div></Link>
                        <Link className="general_link" to="/portatiles"><div className="categoria">
                            <i class="fas fa-laptop"></i>
                            <p className="p-categoria">Portátiles</p>
                        </div></Link>
                        <Link className="general_link" to="/accesorios"><div className="categoria">
                            <i class="fas fa-microchip"></i>
                            <p className="p-categoria">Accesorios</p>
                        </div></Link>
                        <Link className="general_link" to="/hogar"><div className="categoria">
                            <i class="fas fa-home"></i>
                            <p className="p-categoria">Hogar</p>
                        </div></Link>
                        <Link className="general_link" to="/consolas"><div className="categoria">
                            <i class="fas fa-gamepad"></i>
                            <p className="p-categoria">Consolas</p>
                        </div></Link>
                        <Link className="general_link" to="/audio"><div className="categoria">
                        <i class="fas fa-headset"></i>
                            <p className="p-categoria">Audio</p>
                        </div></Link>
                    </Carousel>
                </div>
            </div>
            <div className="productos_top">
                <h1>Destacados semanales</h1>
                <div className="destacados_size">
                    {
                        this.state.data.map(function(destacados) {
                            return <Link className="renderDestacados" to={`/productos/${destacados.id}`}><div className="destacado" key={destacados.id}>
                                <img alt="Producto destacado" src={"http://localhost:5000/" + destacados.image_path}/>
                                <div className="texto_destacado">
                                    <p>{destacados.name}</p>
                                    <p>{destacados.price} €</p>
                                </div>
                            </div></Link>
                        })
                    }
                </div>
            </div>
            <div className="categorias_destacadas_size">
                <div className="categorias_destacadas">
                    <h1>Categorías destacadas</h1>
                    <div className="ct_dest">
                        <div className="catdesc">
                            <p>Tarjetas Gráficas</p>
                        </div>
                        <div className="catdesc">
                            <p>Consolas</p>
                        </div>
                        <div className="catdesc">
                            <p>Accesorios</p>
                        </div>
                        <div className="catdesc">
                            <p>Portátiles</p>
                        </div>
                    </div>
                </div>
            </div>

            </div>
      );
    }
  }