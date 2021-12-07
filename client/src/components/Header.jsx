import '../assets/css/style.css';
import LogoHeader from '../assets/img/fleek.png';
import { slide as Menu } from 'react-burger-menu'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartProvider, useCart } from "react-use-cart";

function Header() {
  const [userStatus, setUserStatus] = useState(false);
  const userLogged = userStatus;

  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const [data, setData] = useState('');
  const navigate = useNavigate();


  const checkIfUserLoggedIn = () => {
    if (localStorage.getItem('token')) {
        setUserStatus(true);
    } else {
        setUserStatus(false);
    }
}

const userDetails = () => {
  if (localStorage.getItem('token')) {
      setUserStatus(true);
      const datos_cookie = JSON.parse(localStorage.getItem('datos'))
      setData(datos_cookie);
  } else {
      setUserStatus(false);
  }
}

  const removeToken = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("datos")
    navigate("/");
  }

  useEffect(() =>{
    checkIfUserLoggedIn();
  },);

  useEffect(() =>{
    userDetails();
  },[]);
  return (
    <div className="header">
      <div className="header-size">
      <Link id="logo" to="/"><div className="logo">
          <img src={LogoHeader} width="140" alt="Fleek | World´s technology"></img>
          <p>World´s technology.</p>
        </div></Link>
        <div className="login-menu">
          {userLogged ? 
          <p className="userLogged"><i class="fas fa-user"></i>{data.username}</p> 
          : 
          <div className="login">
            <Link to="/login/">Inicia sesión o Regístrate</Link>
            
          </div>
          }
          <Link className="header-cart" to="/cart">
          <i class="fas fa-shopping-cart"></i>
          <p>{totalUniqueItems}</p>
          </Link>
          <Menu right elastic>
            <Link id="home" className="menu-item" to="/"><i class="fas fa-home"></i> Inicio</Link>
            {userStatus &&(
              <Link id="dashboard" className="menu-item" to="/dashboard"><i class="fas fa-sliders-h"></i> Dashboard</Link>
            )}
            <Link id="cart" className="menu-item" to="/cart"><i class="fas fa-shopping-cart"></i> Mi carrito</Link>
            <Link id="fleekocasion" className="menu-item" to="/fleekocasion"><i class="fas fa-award"></i> Fleek Ocasión</Link>
            <Link id="about" className="menu-item" to="/about"><i class="fas fa-address-card"></i> Sobre nosotros</Link>
            <Link id="contact" className="menu-item" to="/contact"><i class="fas fa-envelope"></i> Contacto</Link>
            {userStatus &&(
              <button onClick={removeToken}><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
            )}
          </Menu>
        </div> 
      </div>
    </div>
  );
}

export default Header;
