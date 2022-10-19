const camelize = require('camelize');
const connection = require('../db/connection');

const columns = 'sale_id, product_id, quantity';

const registerNewSaleModel = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  await Promise.all(sales.map(async (sale, index) => {
    await connection
      .execute(`INSERT INTO StoreManager.sales_products (${columns}) VALUES (?, ?, ?)`,
        [insertId, sales[index].productId, sales[index].quantity]);
    }));
  const [result] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?',
    [insertId],
  );
  const newSale = {
    id: insertId,
    itemsSold: camelize(result),
  };
  return newSale;
};

const getAllSalesModel = async () => {
  const [result] = await connection.execute(`SELECT StoreManager.sales_products.sale_id,
StoreManager.sales.date,
StoreManager.sales_products.product_id,
StoreManager.sales_products.quantity
FROM StoreManager.sales_products
INNER JOIN StoreManager.sales 
ON StoreManager.sales.id = StoreManager.sales_products.sale_id
ORDER BY sale_id, product_id;`);
  return camelize(result);
};

const getSalesByIdModel = async (id) => {
  const [result] = await connection.execute(`SELECT StoreManager.sales.date,
StoreManager.sales_products.product_id,
StoreManager.sales_products.quantity
FROM StoreManager.sales_products
INNER JOIN StoreManager.sales 
ON StoreManager.sales.id = StoreManager.sales_products.sale_id
WHERE sale_id = ?
ORDER BY sale_id, product_id;`, [id]);
  return camelize(result);
};

module.exports = {
  registerNewSaleModel,
  getAllSalesModel,
  getSalesByIdModel,
};
