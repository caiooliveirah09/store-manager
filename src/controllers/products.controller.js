const { productsService } = require('../services');

const OK = 200;
// const CREATED = 201;
// const BAD_REQUEST = 400;
const NOT_FOUND = 404;

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

module.exports = {
  getAllProductsController,
  getProductByIdController,
};