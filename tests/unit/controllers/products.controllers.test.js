const chai = require("chai");
const sinon = require("sinon");
const app = require("../../../src/server");
const sinonChai = require("sinon-chai");

const mockAllProducts = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const mockProduct = [{ id: 1, name: "Martelo de Thor" }];

const { expect } = chai;

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');

const {
  getAllProductsController,
  getProductByIdController,
} = require("../../../src/controllers/products.controller");

describe("test products controllers", async function () {
  it("1 - tests if getAllProductsController function return a status type 200 and json with all products", async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, "getAllProductsService").resolves({ type: 200, message: mockAllProducts });
    await getAllProductsController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllProducts);
    expect(productsService.getAllProductsService.called).to.be.equal(true);
    sinon.restore();
  });
  it("2 - tests if getProductByIdController function return a status type 200 and the product", async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "getProductByIdService")
      .resolves({ type: 200, message: mockProduct[0] });
    await getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProduct[0]);
    sinon.restore();
  });
  it("3 - tests if getProductByIdController function return a status type 404 and an error 'Product not found'", async function () {
    const req = { params: { id: 999 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "getProductByIdService")
      .resolves({ type: 404, message: "Product not found" });
    await getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" })
    sinon.restore();
  })
});