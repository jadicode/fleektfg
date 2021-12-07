import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Routes } from 'react-router';
import Header from './components/Header.jsx';
import Inicio from './components/Inicio';
import Error404 from './components/Error404.jsx';
import Producto from './components/Producto.jsx';
import PedidoUnico from './components/PedidoUnico.jsx';
import Footer from './components/Footer.jsx';
import ConfirmacionEnvio from './components/ConfirmacionEnvio.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Settings from './components/Settings.jsx';
import FleekOcasion from './components/categorias/FleekOcasion.jsx';
import Middleware from './components/Middleware.jsx';
import AdministrarPedidos from './components/AdministrarPedidos.jsx';
import SubirProducto from './components/SubirProducto.jsx';
import ListaUsuarios from './components/ListaUsuarios.jsx';
import ListaProductos from './components/ListaProductos.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import CartCheckout from './components/CartCheckout.jsx';
import ConfirmacionEnvioMultiple from './components/ConfirmacionEnvioMultiple.jsx';
import AdministrarPedidosMultiples from './components/AdministrarPedidosMultiples.jsx';
import TarjetasGraficas from './components/categorias/TarjetasGraficas.jsx';
import Contacto from './components/Contacto.jsx';
import Sobremesa from './components/categorias/Sobremesa.jsx';
import Portatiles from './components/categorias/Portatiles.jsx';
import Accesorios from './components/categorias/Accesorios.jsx';
import Hogar from './components/categorias/Hogar.jsx';
import Consolas from './components/categorias/Consolas.jsx';
import Audio from './components/categorias/Audio.jsx';
import FormSubmitted from './components/FormSubmitted.jsx';
import About from './components/About.jsx';

function Routering() {
    return(
        <Router>
            <Header></Header>
            <Routes>
                <Route path="/" exact element={<Inicio/>}/>
                <Route path="/home" element={<Inicio/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contacto/>}/>
                <Route path="/form-submitted" element={<FormSubmitted/>}/>
                <Route path="/productos/:id" element={<Producto/>}/>
                <Route path="/comprar/:id" element={<PedidoUnico/>}/>
                <Route path="/confirmacion-envio/:id" element={<ConfirmacionEnvio/>}/>
                <Route path="/confirmacion-envio-multiple/:id" element={<ConfirmacionEnvioMultiple/>}/>
                <Route exact path="/register/" element={<Register/>}/>
                <Route exact path="/login/" element={<Login/>}/>
                <Route exact path="/dashboard/" element={<Middleware/>}/>
                <Route exact path="/lista-pedidos/" element={<AdministrarPedidos/>}/>
                <Route exact path="/lista-pedidos-multiples/" element={<AdministrarPedidosMultiples/>}/>
                <Route exact path="/lista-usuarios/" element={<ListaUsuarios/>}/>
                <Route exact path="/listado-productos/" element={<ListaProductos/>}/>
                <Route exact path="/settings/" element={<Settings/>}/>
                <Route exact path="/fleekocasion/" element={<FleekOcasion/>}/>
                <Route exact path="/tarjetas-graficas/" element={<TarjetasGraficas/>}/>
                <Route exact path="/sobremesa/" element={<Sobremesa/>}/>
                <Route exact path="/portatiles/" element={<Portatiles/>}/>
                <Route exact path="/accesorios/" element={<Accesorios/>}/>
                <Route exact path="/hogar/" element={<Hogar/>}/>
                <Route exact path="/consolas/" element={<Consolas/>}/>
                <Route exact path="/audio/" element={<Audio/>}/>
                <Route exact path="/subir-producto/" element={<SubirProducto/>}/>
                <Route exact path="/cart/" element={<ShoppingCart/>}/>
                <Route exact path="/proceed-checkout/" element={<CartCheckout/>}/>
                <Route path="*" exact element={<Error404/>}/>
            </Routes>
            <Footer></Footer>
        </Router>
    );
}

export default Routering;