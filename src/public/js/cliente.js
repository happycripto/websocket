// Importa WebSocket desde una URL relativa
import socket from "./index.js";


// Agregar eventos y lógica para manejar la conexión WebSocket
socket.addEventListener('open', (event) => {
  console.log('Conexión WebSocket abierta:', event);
});

socket.addEventListener('message', (event) => {
  console.log('Mensaje recibido del servidor:', event.data);
});

socket.addEventListener('close', (event) => {
  console.log('Conexión WebSocket cerrada:', event);
});



