const { registerNewSaleService, getAllSalesService,
  getSalesByIdService } = require('../services/sales.service');

// const BAD_REQUEST = 400;
const NOT_FOUND = 404;
// const UNPROCESSABLE_ENTITY = 422;

const registerNewSaleController = async (req, res) => {
  const sales = req.body;
  const { type, message } = await registerNewSaleService(sales);
  return res.status(type).json(message);
};

const getAllSalesController = async (_req, res) => {
  const { type, message } = await getAllSalesService();
  return res.status(type).json(message);
};

const getSalesByIdController = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await getSalesByIdService(id);
  if (type === NOT_FOUND) return res.status(type).json({ message });
  return res.status(type).json(message);
};

module.exports = {
  registerNewSaleController,
  getAllSalesController,
  getSalesByIdController,
};