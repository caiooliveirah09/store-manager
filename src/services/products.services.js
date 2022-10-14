const { productsModel } = require('../models');

const OK = 200;
// const CREATED = 201;
// const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const getAllProductsService = async () => {
  const allProducts = await productsModel.getAllProductsModel();
  return { type: OK, message: allProducts };
};

const getProductByIdService = async (id) => {
  const product = await productsModel.getProductByIdModel(id);
  if (!product) return { type: NOT_FOUND, message: 'Product not found' };
  if (product.length === 0) return { type: NOT_FOUND, message: 'Product not found' };
  return { type: OK, message: product[0] };
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};