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

const addNewProductModel = async (product) => {
  await connection.execute('INSERT INTO StoreManager.products (name) VALUES (?)', [product]);
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name = ?', [product]);
  return result;
};

module.exports = {
  getAllProductsModel,
  getProductByIdModel,
  addNewProductModel,
};