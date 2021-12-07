import axios from "axios";    
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

function Producto() {
    const { addItem } = useCart();
    const params = useParams();
    const [producto, setProducto] = useState('');
    const getDetallesProducto = () => {
        axios.get(`http://localhost:5000/comprar/${params.id}`)
            .then((response) => {
                // Establecer Valor al useState
                setProducto(response.data);
                //Recibe producto
               console.log(response.data);
            })
            .catch((error) => {
                console.log("Error en el producto:", error);
            });
    };
    useEffect(() =>{
        getDetallesProducto();
        window.scrollTo(0, 0);
    }, []);
    return(
        <div className="detalles_producto">
            <div className="imagen_producto">
                <img src={"http://localhost:5000/" + producto.image_path} alt={producto.name} />
            </div>
            <div className="producto">
                <h1>{producto.name}</h1>
                <p id="price">{producto.price} € <span className="iva">(IVA incluído)</span></p>
                <hr className="hr_producto"></hr>
                <p className="description">{producto.description}</p>
                <div className="fleekchat">
                    <p><i class="far fa-comments"></i> FleekChat no está disponible en este momento</p>
                </div>
                <p>Marca: <span className="brand">{producto.brand}</span></p>
                <p>Entrega: <span className="delivery">{producto.delivery}</span></p>
                <p>Existencias: <span className="stock">{producto.stock}</span></p>
                <div className="acciones_producto">
                    <Link className="comprar_ahora" to={`/comprar/${producto.id}`}>Comprar</Link>
                    <Link className="añadir_al_carrito" to="/cart" onClick={() => addItem(producto)}>Añadir al Carrito</Link>
                </div>
            </div>
        </div>
    )
}

export default Producto;