import express from 'express';
import productos from '../data/productos.js';
import { productsModel } from '../models/ProductsModel.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { products: [] });
});

// Ruta para la vista Products.handlebars
router.get('/Products', async  (req, res) => {
  const { page = 1 } = req.query;
  const { products, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit: 4, page })
  res.render('Products', { products: products,hasPrevPage, hasNextPage, nextPage, prevPage });
});


export default router;
