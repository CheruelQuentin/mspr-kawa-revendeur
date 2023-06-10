const { allProduct, allStocks  } = require('../services/productRevendeur.service');
const { allCustomer } = require('../services/customerRevendeur.service');

test('should return all products', async () => {
  const products = await allProduct();
  expect(products.length).toBeGreaterThan(0);
});
test('should return all products with their stock quantities', async () => {
  const stocks = await allStocks();
  expect(stocks.length).toBeGreaterThan(0);
  stocks.forEach(stock => {
    expect(stock.name).toBeDefined();
    expect(stock.quantity).toBeDefined();
  });
});

test('should return all customers', async () => {
  const customers = await allCustomer();
  expect(customers.length).toBeGreaterThan(0);
});