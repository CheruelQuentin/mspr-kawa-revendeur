const axios = require('axios');

async function allCustomer() {
  return (await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers')).data;
}

module.exports = {
  allCustomer
};