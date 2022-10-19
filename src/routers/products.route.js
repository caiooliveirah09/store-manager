const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');

router.get('/', productsController.getAllProductsController);

router.get('/:id', productsController.getProductByIdController);

router.post('/', productsController.addNewProductController);

router.put('/:id', productsController.updateProductByIdController);

router.delete('/:id', productsController.deleteProductByIdController);

module.exports = router;