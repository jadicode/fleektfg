import React from 'react'
import { CartProvider, useCart } from "react-use-cart";
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
      } = useCart();

    if (isEmpty) return <div className="cart-empty"><p>¡Ups! Tu carrito está vacío.</p><Link className="sigue_comprando" to="/">Sigue comprando</Link></div>

    return (
        <div className="shoppingcart">
            <h1><i id="shoppingcart" class="fas fa-shopping-cart"></i> Tienes {totalUniqueItems} artículo(s) en tu carrito</h1>
            <hr className="hr-cart"/>
            <ul>
            {items.map((item) => (
                <li className="cart-added" key={item.id}>
                <div className="product-cart-added">
                    <img className="img-cart" src={"http://localhost:5000/" + item.image_path} alt={item.name} />
                    <p className="cart-product-name">{item.name}</p>
                    <p className="cart-product-price">{item.price}€</p>
                </div>
                <div className="cart-action">
                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}><i class="fas fa-plus-square"></i></button>
                    <p>{item.quantity}</p>
                    <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}><i class="fas fa-minus-square"></i></button>
                    <button onClick={() => removeItem(item.id)}><i class="fas fa-times"></i></button>
                </div>
                </li>
                
            ))}
            </ul>
            <hr className="hr-cart"/>
            <div className="totals">
                <p>Total a pagar: <span className="green">{cartTotal}€</span></p>
                <Link className="buttoncart" to="/proceed-checkout"><button>Siguiente</button></Link>
            </div>
        </div>
    )
}

export default ShoppingCart
