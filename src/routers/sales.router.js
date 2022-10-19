const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.post('/', salesController.registerNewSaleController);

router.get('/', salesController.getAllSalesController);

router.get('/:id', salesController.getSalesByIdController);

module.exports = router;