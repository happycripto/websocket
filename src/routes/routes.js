import express from 'express';
import productos from '../data/productos.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { products: [] });
});

// Ruta para la vista realTimeProducts.handlebars
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: productos }); // Reemplaza productos con tus datos
});




export default router;
