const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../../src/server');
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

chai.use(chaiHttp);

const { getAllProductsModel, getProductByIdModel } = require('../../../src/models/products.model');
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
})