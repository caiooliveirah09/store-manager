const { productsService } = require('../services');

// const OK = 200;
// const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const getAllProductsController = async (_req, res) => {
  const { type, message } = await productsService.getAllProductsService();
  return res.status(type).json(message);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductByIdService(id);
  if (type === NOT_FOUND) return res.status(type).json({ message });
  return res.status(type).json(message);
};

const addNewProductController = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsService.addNewProductService(product);
  if (type === BAD_REQUEST || type === UNPROCESSABLE_ENTITY) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

const updateProductByIdController = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const { type, message } = await productsService.updateProductByIdService(id, update);
  if (type === NOT_FOUND || type === BAD_REQUEST || type === UNPROCESSABLE_ENTITY) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

const deleteProductByIdController = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProductByIdService(id);
  if (type === NOT_FOUND) return res.status(type).json({ message });
  return res.status(type).json();
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  addNewProductController,
  updateProductByIdController,
  deleteProductByIdController,
};