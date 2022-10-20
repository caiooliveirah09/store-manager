const { productsModel } = require('../models');
// 
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const NO_CONTENT = 204;

const getAllProductsService = async () => {
  const allProducts = await productsModel.getAllProductsModel();
  return { type: OK, message: allProducts };
};

const getProductByIdService = async (id) => {
  const product = await productsModel.getProductByIdModel(id);
  if (product.length === 0) return { type: NOT_FOUND, message: 'Product not found' };
  return { type: OK, message: product[0] };
};

const addNewProductService = async (product) => {
  if (!product.name) return { type: BAD_REQUEST, message: '"name" is required' };
  if (product.name.length < 5) {
 return {
    type: UNPROCESSABLE_ENTITY,
    message: '"name" length must be at least 5 characters long',
  }; 
}
  const result = await productsModel.addNewProductModel(product.name);
  console.log(result);
  return { type: CREATED, message: result[0] };
};

const updateProductByIdService = async (id, update) => {
  if (!update.name) return { type: BAD_REQUEST, message: '"name" is required' };
  if (update.name.length < 5) {
    return {
      type: UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  }
  const result = await productsModel.updateProductByIdModel(id, update);
  if (!result) return { type: NOT_FOUND, message: 'Product not found' };
  return { type: OK, message: result };
};

const deleteProductByIdService = async (id) => {
  const product = await productsModel.getProductByIdModel(id);
  if (product.length === 0) return { type: NOT_FOUND, message: 'Product not found' };
  await productsModel.deleteProductByIdModel(id);
  return { type: NO_CONTENT };
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  addNewProductService,
  updateProductByIdService,
  deleteProductByIdService,
};