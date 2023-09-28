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

    // Agregamos un data-product-id al botón de eliminar para identificar el producto
  const removeButtons = productList.querySelectorAll('.remove-product-button');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeProduct);
  });
  });

  // Función para enviar el nuevo producto al servidor
  function addProduct() {
    const productName = document.getElementById('product-name',).value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productStock = parseInt(document.getElementById('product-stock').value);
  

    // Crear un objeto que represente el producto
    const newProduct = {
      name: productName,
      price: productPrice, 
      stock: productStock 
    };

    socket.emit('addProduct', newProduct);
    console.log('ENVIADO: Nuevo producto al servidor:', productName);

  }

  // Función para eliminar un producto del servidor
  function removeProduct(event) {
    const productId = event.target.getAttribute('data-product-id');
    console.log('Eliminando producto con ID:', productId);
    socket.emit('removeProduct', productId);
  }

  addProductButton.addEventListener('click', addProduct);

  productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-product-button')) {
      console.log('Botón Eliminar clickeado.');
      removeProduct(event);
    }
  });
});

export default socket;








