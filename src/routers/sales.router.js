const express = require('express');

const router = express.Router();

const { validateQuantity, validateProductId } = require('./validations/sales.validation');

const { salesController } = require('../controllers');

router.post('/', validateQuantity, validateProductId, salesController.registerNewSaleController);

router.get('/', salesController.getAllSalesController);

router.get('/:id', salesController.getSalesByIdController);

module.exports = router;