const connection = require('../db/connection');

const getAllProductsModel = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
  return result;
};

const getProductByIdModel = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAllProductsModel,
  getProductByIdModel,
};