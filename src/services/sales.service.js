const { registerNewSaleModel, getAllSalesModel, getSalesByIdModel } = require('../models/sales.model');
const { getAllProductsModel } = require('../models/products.model');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const registerNewSaleService = async (sales) => {
  const allProducts = await getAllProductsModel();
  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].quantity <= 0) {
      return {
        type: UNPROCESSABLE_ENTITY,
        message: '"quantity" must be greater than or equal to 1',
      };
    }
    if (!sales[i].productId) return { type: BAD_REQUEST, message: '"productId" is required' };
    if (!sales[i].quantity) return { type: BAD_REQUEST, message: '"quantity" is required' };
    if (!allProducts.some((product) => product.id === sales[i].productId)) return { type: NOT_FOUND, message: 'Product not found' };
  }
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