
const socket = io();


document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const addProductButton = document.getElementById('add-product-button');

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
    console.log('ENVIADO: Nuevo producto al servidor:', productName);
  }

  // Función para eliminar un producto del servidor
  function removeProduct(productId) {
    socket.emit('removeProduct', productId);
  }

  addProductButton.addEventListener('click', addProduct);

  productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-product-button')) {
      const productId = event.target.getAttribute('data-product-id');
      removeProduct(productId);
    }
  });
});
export default socket;






