const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');

const mockAllProducts = [
  {id:1,name:'Martelo de Thor'},
  {id:2,name:'Traje de encolhimento'},
  {id:3,name:'Escudo do Capitão América'},
];

const mockProduct = [
  { id: 1, name: 'Martelo de Thor' },
];

const { expect } = chai;

const {
  getAllProductsModel,
  getProductByIdModel,
  addNewProductModel,
  updateProductByIdModel,
  deleteProductByIdModel,
} = require("../../../src/models/products.model");
describe('test product models', function () {
  it('1 - tests if getAllProductsModel function returns all products', async function () {
    sinon.stub(connection, 'execute').resolves([mockAllProducts]);
    await getAllProductsModel();
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  })
  it('2 - tests if getAllProductByIdModel function returns product by id', async function () {
    sinon.stub(connection, 'execute').resolves([mockProduct]);
    await getProductByIdModel(1);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  })
  it('3 -', async function () {
    await addNewProductModel;
    
  })
  /*it('4 -', async function () {
    await updateProductByIdModel;
  });
  it('5 -', async function () {
    await deleteProductByIdModel;
  });*/
})