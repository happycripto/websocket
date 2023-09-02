import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import { Server } from "socket.io";
import router from "./routes/routes.js";
import __dirname from './utils.js';
import productos from './data/productos.js';

const app = express();

// Configuración de Handlebars
const hbs = exphbs.create(); // Cambio aquí
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Definir directorio de recursos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io-client/dist')));




// Rutas
app.use('/', router);

// Ruta para la vista "home.handlebars"
app.get('/home', (req, res) => {
  res.render('home', { products: productos });
});

// Ruta para la vista "realTimeProducts.handlebars"
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: productos });
});

// Iniciar servidor en el puerto 8080
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

// Configuración de WebSocket
const io = new Server(server);

io.on('connection', socket => {
    console.log('Cliente conectado al socket');

    // Manejar eventos de agregar o eliminar productos
    socket.on('addProduct', (newProductName) => {
      // Lógica para agregar el producto a la lista de productos
      const newProduct = { id: productos.length + 1, name: newProductName };
      productos.push(newProduct);
      io.emit('updateProducts', productos);
    });
  
    socket.on('removeProduct', (productId) => {
      // Lógica para eliminar el producto de la lista de productos
      const productIndex = productos.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        productos.splice(productIndex, 1);
        io.emit('updateProducts', productos);
      }
    });
});
