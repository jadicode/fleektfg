import React from 'react';
import ReactDOM from 'react-dom';
import Routering from './Routering'

import './assets/css/style.css';
import { CartProvider } from 'react-use-cart';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
    <Routering></Routering>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


