import React, { Component, Fragment, useState} from 'react';
import axios from 'axios';

import '../assets/css/admin.css'; 

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

const SubirProducto = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState([]);
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');

  const uploadArticle = async (e) => {
    debugger
    e.preventDefault();
    const data3 = new FormData();
    data3.append('name', name);
    data3.append('price', price);
    data3.append('image', image.selectedFile);
    data3.append('brand', brand);
    data3.append('categoria', categoria);
    data3.append('stock', stock);
    await axios({
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
            "access-token": getCookie('token'),
        },
        url: 'http://localhost:5000/producto/',
        data: data3
    }).then(response => {
    console.log(response.data.id);
    props.history.push('/sudaderas');
    }).catch(err=>{
      console.log(err);
    });
  }

  
  return(
    <div className="subir_producto">
      <form encType="multipart/form-data" onSubmit={uploadArticle}>
        <h2>Rellena los campos para subir un producto a Fleek</h2>
        <label>Nombre</label>
        <input required placeholder="Nombre del producto..." type="text" name="name" onChange={e => setName(e.target.value)}/>
        <label>Selecciona una imagen</label>
        <input required type="file" name="image" onChange={e => setImage({selectedFile:e.target.files[0]})}/>
        <label>Precio en €</label>
        <input required placeholder="Precio del producto..." type="text" name="price" onChange={e => setPrice(e.target.value)}/>
        <label>Marca</label>
        <input required placeholder="Marca del producto..." type="text" name="price" onChange={e => setBrand(e.target.value)}/>
        <label>Categoría (Fleekocasion, Destacado...)</label>
        <input required placeholder="Establece una categoría..." type="text" name="price" onChange={e => setCategoria(e.target.value)}/>
        <label>Stock</label>
        <input required placeholder="Stock: Disponible / No disponible" type="text" name="price" onChange={e => setStock(e.target.value)}/>
        <input type="submit" value="Insertar"/>
      </form>
    </div>
  )
}
export default SubirProducto;

