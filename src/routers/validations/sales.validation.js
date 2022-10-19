const { getAllProductsModel } = require('../../models/products.model');

// const OK = 200;
// const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].quantity <= 0) {
      return res.status(UNPROCESSABLE_ENTITY)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!sales[i].quantity) {
      return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
    }
  }
  return next();
};

  const validateProductId = async (req, res, next) => {
  const allProducts = await getAllProductsModel();
  const sales = req.body;
    for (let i = 0; i < sales.length; i += 1) {
    if (!sales[i].productId) {
      return res.status(BAD_REQUEST).json({ message: '"productId" is required' });
    }
    if (!allProducts.some((product) => product.id === sales[i].productId)) {
      return res.status(NOT_FOUND).json({ message: 'Product not found' });
    }
  }
    return next();
};

module.exports = {
  validateQuantity,
  validateProductId,
};