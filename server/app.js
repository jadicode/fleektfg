// ################
// NPM IMPORTS
// ################
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
var cors = require('cors');
const multer = require('multer');
const chalk = require('chalk');
const { Sequelize, Model, DataTypes } = require('sequelize');
const nodemailer = require("nodemailer");


// ################
// Setup Node App
// ################

const app = express();

//Parseo el clientea JSON.

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// App session

app.use(
  session({
    key: "userId",
    secret: "pestillo",
    resave: true,
    saveUninitialized: true,
    cookie : {
      expires: 60 * 60 * 24,
    },
  })
);

// #######################
// AUTENTICACIÓN DE LA BD
// #######################

const sequelize = new Sequelize('mariadb://admin:node@localhost:3306/node')
try {
  sequelize.authenticate();
  console.log(chalk.bgGreen.black(' Conexión en db/admin/node: CORRECTA '));
} catch (error) {
  console.error(chalk.bgRed.white(' Error en db/admin/node: ', error ));
}

// Creación de modelos 

// USER INSERT //
class User extends Model {}

User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role:{
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize, 
  modelName: 'User' 
});

(async () => {
  await sequelize.sync({ force: true });
  const u1 = User.build({username: 'Javier', email: 'javi@javidiaz.es', password: 'Pestillo10', role:'user'});
  const u2 = User.build({username: 'admin', email: 'javi@admin.es', password: 'admin', role:'admin'});
  await u1.save();
  await u2.save();
})();

/* Esta clase almacenará los datos del formulario de compra */

class Pedidos extends Model {}

Pedidos.init({
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ciudad:{
    type: DataTypes.STRING,
    allowNull: true
  },
  codigopostal:{
    type: DataTypes.STRING,
    allowNull: true
  },
  producto_comprado: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  modelName: 'Pedidos'
});

class PedidoMultiple extends Model {}

PedidoMultiple.init({
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ciudad:{
    type: DataTypes.STRING,
    allowNull: true
  },
  codigopostal:{
    type: DataTypes.STRING,
    allowNull: true
  },
  items_comprados: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'PedidoMultiple'
});

class Productos extends Model {}

Productos.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: DataTypes.STRING,
    allowNull: true
  },
  image_path:{
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discount:{
    type: DataTypes.FLOAT,
    allowNull: true
  },
  delivery: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Productos'
});

// ###### //
// Seeder //
// ###### //

(async () => {
    await sequelize.sync({ force: true });
    // Inicio
    const product_seed_uno = Productos.build({name: 'GTX 1050ti Series', brand: 'NVIDIA', description:"Te presentamos la Gigabyte GeForce GTX 1050Ti OC, una gráfica con 4Gb GDDR5, VR Ready y sistema de ventilación Windforce. Una de las mejores gráficas calidad/precio del mercado.", image_path: "public/storage/articles/pdestacado_uno.png", price: 229.99, delivery:"48/72h" , stock: "En Stock", categoria: "Destacado"});
    const product_seed_dos = Productos.build({name: 'MSI Katana GF66', brand:'MSI', description:"Agudiza tu juego con el MSI Katana GF66. Ideal para el gaming y trabajo hasta en el sitio más inesperado.", image_path: "public/storage/articles/pdestacado_dos.png", price: 1027.99, delivery:"48/72h", stock: "En Stock",  categoria: "Destacado"});
    const product_seed_tres = Productos.build({name: 'Samsung QLED 4K TV', brand: 'Samsung', description:"Experimenta colores más brillantes con Quantum Dot y los nuevos televisores QLED de Samsung.", image_path: "public/storage/articles/pdestacado_tres.png", price: 799.99, delivery:"48/72h", stock: "En Stock",  categoria: "Destacado"});
    const product_seed_cuatro = Productos.build({name: 'Google Home Mini', brand:'Google', description:" Te presentamos el nuevo Nest Mini. En él tu música suena mejor y más potente que nunca. Además, el Asistente de Google es una gran ayuda en toda la casa.", image_path: "public/storage/articles/pdestacado_cuatro.png", price: 35.99, delivery:"48/72h", stock: "En Stock",  categoria: "Destacado"});
    // FleekOcasion
    const product_seed_cinco = Productos.build({name: 'Logitech G502 Ratón Gaming', brand: 'Logitech', description:"Te presentamos un ratón característico para el gaming. Con 16000 DPI, el G502 viene para quedarse en tu hogar. Firme precisión de tracking.", image_path: "public/storage/articles/fleekocasion_uno.png", price: 77.50, discount: 32.99 , delivery:"48/72h" , stock: "En Stock", categoria: "Fleekocasion"});
    const product_seed_seis = Productos.build({name: 'LG SK1D Bar Barra de Sonido', brand:'LG', description:"La barra de sonido económica de LG, 100W de potencia para resaltar la música que te gusta.", image_path: "public/storage/articles/fleekocasion_dos.png", price: 100, discount: 50, delivery:"48/72h", stock: "En Stock",  categoria: "Fleekocasion"});
    const product_seed_siete = Productos.build({name: 'Nintendo Switch', brand: 'Nintendo', description:"Una de las mejores consolas de Nintendo, disfruta de sus variedades en juegos característicos de Nintendo.", image_path: "public/storage/articles/fleekocasion_tres.png", price: 300, discount: 250, delivery:"48/72h", stock: "En Stock",  categoria: "Fleekocasion"});
    const product_seed_ocho = Productos.build({name: 'Corsair Vengeance 2x8GB', brand:'Corsair', description:"Corsair te presenta sus nuevas tarjetas RAM, dará un toque de rendimiento óptimo en tu ordenador de escritorio. Incluye RGB colors. 3200hz.", image_path: "public/storage/articles/fleekocasion_cuatro.png", price: 70, discount: 55, delivery:"48/72h", stock: "En Stock",  categoria: "Fleekocasion"});
    // Tarjetas Gráficas
    const product_seed_nueve = Productos.build({name: 'GTX 3080 EVGA 12GB VRAM', brand:'NVIDIA', description:"Nvidia te presenta sus nuevas tarjetas gráficas, dará un toque de rendimiento óptimo en tu ordenador para procesar gráficos potentes.", image_path: "public/storage/articles/tarjetagrafica_uno.png", price: 1770, delivery:"48/72h", stock: "En Stock",  categoria: "TarjetaGrafica"});
    const product_seed_diez = Productos.build({name: 'AMD RADEON RX6700 12GB VRAM', brand:'AMD', description:"AMD te presenta sus nuevas tarjetas gráficas, dará un toque de rendimiento óptimo en tu ordenador para procesar gráficos potentes.", image_path: "public/storage/articles/tarjetagrafica_dos.png", price: 970, delivery:"48/72h", stock: "En Stock",  categoria: "TarjetaGrafica"});
    const product_seed_once = Productos.build({name: 'AMD RADEON RX6600 8GB VRAM', brand:'AMD x MSI', description:"AMD x MSI te presenta sus nuevas tarjetas gráficas, dará un toque de rendimiento óptimo en tu ordenador para procesar gráficos potentes.", image_path: "public/storage/articles/tarjetagrafica_tres.png", price: 670, delivery:"48/72h", stock: "En Stock",  categoria: "TarjetaGrafica"});
    // Sobremesa
    const ps1 = Productos.build({name: 'FleekPC PREMIUM Intel i9 10th RTX 3080 16GB RAM', brand:'Fleek', description:"Este FleekPC está fabricado en nuestras instalaciones con los mejores componentes de calidad y 2 años de garantía. Pensado para juegos y rendimiento informático.", image_path: "public/storage/articles/sobremesa_uno.png", price: 1470, delivery:"48/72h", stock: "En Stock",  categoria: "FleekPC"});
    const ps2 = Productos.build({name: 'FleekPC GOLD Intel i7 10th RTX 3060 8GB RAM', brand:'Fleek', description:"Este FleekPC está fabricado en nuestras instalaciones con los mejores componentes de calidad y 2 años de garantía. Pensado para juegos y rendimiento informático.", image_path: "public/storage/articles/sobremesa_dos.png", price: 1300, delivery:"48/72h", stock: "En Stock",  categoria: "FleekPC"});
    const ps3 = Productos.build({name: 'FleekPC SILVER Intel i5 9th RTX 3060 16GB RAM', brand:'Fleek', description:"Este FleekPC está fabricado en nuestras instalaciones con los mejores componentes de calidad y 2 años de garantía. Pensado para juegos y rendimiento informático.", image_path: "public/storage/articles/sobremesa_tres.png", price: 1000, delivery:"48/72h", stock: "En Stock",  categoria: "FleekPC"});
    const ps4 = Productos.build({name: 'FleekPC BRONZE Intel i3 8th GTX 1050ti 8GB RAM', brand:'Fleek', description:"Este FleekPC está fabricado en nuestras instalaciones con los mejores componentes de calidad y 2 años de garantía. Pensado para juegos y rendimiento informático.", image_path: "public/storage/articles/sobremesa_cuatro.png", price: 669, delivery:"48/72h", stock: "En Stock",  categoria: "FleekPC"});
    // Portátiles
    const p1 = Productos.build({name: 'ACER Nitro FPS i7 9th RTX 3080', brand:'Acer', image_path: "public/storage/articles/portatil_uno.png", price: 1540, delivery:"48/72h", stock: "En Stock",  categoria: "Portatil"});
    const p2 = Productos.build({name: 'ASUS TUF Gaming i9 10th 2080ti', brand:'Asus', image_path: "public/storage/articles/portatil_dos.png", price: 1399, delivery:"48/72h", stock: "En Stock",  categoria: "Portatil"});
    const p3 = Productos.build({name: 'Lenovo IdeaPad 5', brand:'Lenovo', image_path: "public/storage/articles/portatil_tres.png", price: 568, delivery:"48/72h", stock: "En Stock",  categoria: "Portatil"});
    // Accesorios
    const funda =  Productos.build({name: 'Funda Transparente para iPhone 12', brand:'xKuin', image_path: "public/storage/articles/funda.png", price: 44, delivery:"48/72h", stock: "En Stock",  categoria: "Accesorio"});
    // Hogar
    const hogar_uno = Productos.build({name: 'Roomba Robot Aspirador', brand:'Roomba', description:"Roomba es tu aspirador inteligente perfecto. Contrólalo desde tu smartphone.", image_path: "public/storage/articles/roomba.png", price: 544, delivery:"48/72h", stock: "En Stock",  categoria: "Hogar"});
    const hogar_dos = Productos.build({name: 'Bombilla inteligente XIAOMI', brand:'Xiaomi', image_path: "public/storage/articles/bombilla.png", price: 17, delivery:"48/72h", stock: "En Stock",  categoria: "Hogar"});
     // Consolas
    const xbox = Productos.build({name: 'Xbox Series S + Mando', brand:'Microsoft', description:"La última generación de la Xbox de Microsoft ha llegado para quedarse.", image_path: "public/storage/articles/xbox.png", price: 294, delivery:"48/72h", stock: "En Stock",  categoria: "Consola"});
    const playstation = Productos.build({name: 'PlayStation 5 + Mando', brand:'Sony', image_path: "public/storage/articles/ps5.png", price: 559, delivery:"48/72h", stock: "En Stock",  categoria: "Consola"});
      // Audio
    const au1 = Productos.build({name: 'Logitech G322 Auricular', brand:'Logitech', image_path: "public/storage/articles/auriculares_uno.png", price: 559, delivery:"48/72h", stock: "En Stock",  categoria: "Audio"});
    const au2 = Productos.build({name: 'Tempest Fury v3', brand:'Tempest', image_path: "public/storage/articles/auriculares_dos.png", price: 17, delivery:"48/72h", stock: "En Stock",  categoria: "Audio"});
    const au3 = Productos.build({name: 'Tempest TDS 553', brand:'Tempest', image_path: "public/storage/articles/auriculares_tres.png", price: 14, delivery:"48/72h", stock: "En Stock",  categoria: "Audio"});
    // Guardar Seeds
    await product_seed_uno.save();
    await product_seed_dos.save();
    await product_seed_tres.save();
    await product_seed_cuatro.save();
    await product_seed_cinco.save();
    await product_seed_seis.save();
    await product_seed_siete.save();
    await product_seed_ocho.save();
    await product_seed_nueve.save();
    await product_seed_diez.save();
    await product_seed_once.save();
    await ps1.save();
    await ps2.save();
    await ps3.save();
    await ps4.save();
    await p1.save();
    await p2.save();
    await p3.save();
    await funda.save();
    await hogar_uno.save();
    await hogar_dos.save();
    await xbox.save();
    await playstation.save();
    await au1.save();
    await au2.save();
    await au3.save();
  })();

// ########## //
// FIN SEEDER //
// ########## //
 

// PARSING application/json
app.use(express.json());

// PARSING Cookies
app.use(cookieParser());

// PARSING application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// PARSING multipart/form-data
const multerdata = multer();

// ########################## //
// Almacenamiento de Imágenes //
// ########################## //

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/storage/articles');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.name}.${ext}`);
  }
});

var upload = multer({ storage: multerStorage });

// Contenido estático //
app.use('/public', express.static('public'));



// #################### //
// JWT RUTAS PROTEGIDAS //
// #################### //

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Token no encontrado")
  } else{
    jwt.verify(token, "jwtSecret", (err, decoded) =>{
      if (err){
        res.json({auth: false, message: "Autenticación incorrecta"});
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get('/auth', verifyJWT, function (req, res) {  
  res.send("¡Estás dentro y tienes token!");
});

app.get('/prueba', verifyJWT, function (req, res) {  
  res.send("¡Estás dentro y tienes token!");
});


// ########### //
// ENTRYPOINTS //
// ########### //

/* USER ENTRYPOINT  */
// Registrar Usuario 
app.post('/register/', function (req, res)  {
  const newUser = req.body;
  User.create(newUser)
    .then(userData => {
      res.send(userData);
    })
    .catch(err => console.log(err));
});

// Login 
app.get('/login/', function (req, res) {
  if (req.session.user){
    res.send({
      loggedIn: true, 
      user: req.session.user
    })
  } else{
    res.send({loggedIn: false})
  }
});

app.post('/login/', function (req, res) {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username: username,
      password:  password
    }
  })
  .then((foundUser) => {
    if(!foundUser){
      res.json({ auth: false, message: "Wrong username/password"})
    } else {
      console.log("AUTENTICACIÓN CORRECTA");
      const id = foundUser.id;
      const username = foundUser.username;
      const email = foundUser.email;
      const password = foundUser.password;
      const token = jwt.sign({id, username, email, password}, "jwtSecret", {
        expiresIn: "300d",
      })
      req.session.user = foundUser
      //req.session.admin = true;
      res.cookie('token_id', token)
      res.json({ auth: true, token: token, foundUser: foundUser})
    }
  })
  .catch((err) => {
    console.log('ERROR');
    res.json({ auth: false, message: "No user exists."})
  });
});

app.get('/user/', function (req, res) {
  User.findAll()
    .then(users => {res.send(users);})
    .catch(err => console.log(err));
});

// UPDATE
app.put('/user/', function (req, res) {
  User.update(req.body, {
    where: { id: req.body.id }
    })
    .then(result => {res.send({updated: result[0]});})
    .catch(err => {console.log(err)});
});


// DELETE
app.delete('/user/:id', function (req, res) {
  User.destroy({
    where: { id: req.params.id }
    })
    .then(result => {res.send({deleted: result});})
    .catch(err => {console.log(err)});
});




// Destacados Semanales
app.get('/productos/', function (req, res) {
  Productos.findAll({
    where: {categoria: "Destacado"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Acceder al ID del PRODUCTO
app.get('/productos/:id', function (req, res) {
  Productos.findByPk(req.params.id)
  .then(destacados_id => {res.send(destacados_id)})
  .catch(err => console.log(err))
});

// Listar compra individual de producto
app.get('/comprar/:id', function (req, res) {
  Productos.findByPk(req.params.id)
  .then(compraunica => {res.send(compraunica)})
  .catch(err => console.log(err))
});

// Crear pedido
app.post('/pedidos/', function (req, res) {
  const newPedido = req.body;
  Pedidos.create(newPedido)
    .then(datapedido => {
      res.send(datapedido);
    })
    .catch(err => console.log(err));

});
// Crear pedido multiple
app.post('/pedido-multiple/', function (req, res) {
  const newPedidoMultiple = req.body;
  PedidoMultiple.create(newPedidoMultiple)
    .then(datapedido => {
      res.send(datapedido);
    })
    .catch(err => console.log(err));

});

// FleekOcasion
app.get('/fleekocasion/', function (req, res) {
  Productos.findAll({
    where: {categoria: "Fleekocasion"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Tarjetas Gráficas
app.get('/tarjetas-graficas/', function (req, res) {
  Productos.findAll({
    where: {categoria: "TarjetaGrafica"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Sobremesa
app.get('/sobremesa/', function (req, res) {
  Productos.findAll({
    where: {categoria: "FleekPC"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Portátiles
app.get('/portatiles/', function (req, res) {
  Productos.findAll({
    where: {categoria: "Portatil"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Accesorios
app.get('/accesorios/', function (req, res) {
  Productos.findAll({
    where: {categoria: "Accesorio"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Hogar
app.get('/hogar/', function (req, res) {
  Productos.findAll({
    where: {categoria: "Hogar"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Consolas
app.get('/consolas/', function (req, res) {
  Productos.findAll({
    where: {categoria: "Consola"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Audio
app.get('/audio/', function (req, res) {
  Productos.findAll({
    where: {categoria: "Audio"}
  })
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

// Confirmación envío

app.get('/confirmacion-envio/:id', function (req, res) {
  Pedidos.findByPk(req.params.id)
  .then(confirmacion => {res.send(confirmacion)})
  .catch(err => console.log(err))
});

app.get('/confirmacion-envio-multiple/:id', function (req, res) {
  PedidoMultiple.findByPk(req.params.id)
  .then(confirmacion => {res.send(confirmacion)})
  .catch(err => console.log(err))
});

///////////////////////
/* ADMIN ENTRYPOINTS */
///////////////////////

// Panel Pedidos
app.get('/lista-productos/', function (req, res) {
  Productos.findAll()
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});

app.get('/lista-pedidos/', function (req, res) {
  Pedidos.findAll()
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});
app.get('/lista-pedidos-multiples/', function (req, res) {
  PedidoMultiple.findAll()
    .then(destacados => {res.send(destacados);})
    .catch(err => console.log(err));
});
// Delete Pedido
app.delete('/adminpedidos/:id', function (req, res) {
  Pedidos.destroy({
    where: { id: req.params.id }
    })
    .then(result => {res.send({deleted: result});})
    .catch(err => {console.log(err)});
});

// Delete Producto
app.delete('/adminproducto/:id', function (req, res) {
  Productos.destroy({
    where: { id: req.params.id }
    })
    .then(result => {res.send({deleted: result});})
    .catch(err => {console.log(err)});
});

// Crear producto con imagen
app.post('/producto/', upload.single('image'), function (req, res) {
  const newProducto = req.body;
  newProducto['image_path'] = req.file.path;
  
  Productos.create(newProducto)
    .then(newProducto => {res.send(newProducto);})
    .catch(err => console.log(err));
});


// ################################ //
// #         NODE MAILER          # //
// ################################ //

const contactEmail = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'm4mbblqdanhybtx6@ethereal.email',
      pass: '8CG5FjVxSpegqVtjd2'
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post('/contact/', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "contactfleekworldwide@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
      console.log("Se ha enviado un correo")
    }
  });
});


// ################################
// PORT CONFIGURATION
// ################################

const PORT = 5000
app.listen(PORT, () => {
 console.log(chalk.bgCyan.black(` Servidor ejecutado en el puerto: ${PORT} `));
});
