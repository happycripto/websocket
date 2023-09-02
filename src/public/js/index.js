import { io } from 'socket.io-client';

const socket = io();

// Obtener referencia al elemento de la lista de productos en la vista
const productList = document.getElementById('product-list');

// Escuchar evento de actualización de productos desde el servidor
socket.on('updateProducts', (products) => {
  // Generar el HTML para la lista de productos usando Handlebars
  const source = document.getElementById('product-template').innerHTML;
  const template = Handlebars.compile(source);
  const html = template({ products });

  // Actualizar la lista de productos en la vista
  productList.innerHTML = html;
});

// Función para enviar el nuevo producto al servidor
function addProduct() {
  const productName = document.getElementById('product-name').value;
  socket.emit('addProduct', productName);
}

// Función para eliminar un producto del servidor
function removeProduct(productId) {
  socket.emit('removeProduct', productId);
}


