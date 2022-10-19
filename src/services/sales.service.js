const { registerNewSaleModel, getAllSalesModel,
  getSalesByIdModel } = require('../models/sales.model');

const OK = 200;
const CREATED = 201;
// const BAD_REQUEST = 400;
const NOT_FOUND = 404;
// const UNPROCESSABLE_ENTITY = 422;

const registerNewSaleService = async (sales) => {
  const newSale = await registerNewSaleModel(sales);
  return { type: CREATED, message: newSale };
};

const getAllSalesService = async () => {
  const allSales = await getAllSalesModel();
  return { type: OK, message: allSales };
};

const getSalesByIdService = async (id) => {
  const sales = await getSalesByIdModel(id);
  if (sales.length === 0) return { type: NOT_FOUND, message: 'Sale not found' };
  return { type: OK, message: sales };
};

module.exports = {
  registerNewSaleService,
  getAllSalesService,
  getSalesByIdService,
};