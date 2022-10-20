const chai = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/db/connection");

const mockAllProducts = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const mockProduct = [{ id: 1, name: "Martelo de Thor" }];

const { expect } = chai;
// 

const {
  getAllProductsService,
  getProductByIdService,
} = require("../../../src/services/products.service");

describe("test product services", function () {
  it("1 - tests if getAllProductsService function returns a object with type 200 and message with all products", async function () {
    sinon.stub(connection, "execute").resolves([mockAllProducts]);
    const mysql = await getAllProductsService();
    expect(mysql.type).to.be.equal(200);
    expect(mysql.message).to.be.equal(mockAllProducts);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
  it("2 - tests if getAllProductByIdService function returns a object with type 200 and message with a product", async function () {
    sinon.stub(connection, "execute").resolves([mockProduct]);
    const mysql = await getProductByIdService(1);
    expect(mysql.type).to.be.equal(200);
    expect(mysql.message).to.be.equal(mockProduct[0]);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
  it("3 - test if getAllProductByIdService function returns a 404 error and 'Product not found' message if an empty array is returned", async function () {
    sinon.stub(connection, "execute").resolves([[]]);
    const mysql = await getProductByIdService(999);
    expect(mysql.type).to.be.equal(404);
    expect(mysql.message).to.be.equal("Product not found");
  });
});
