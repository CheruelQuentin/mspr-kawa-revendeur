const axios = require('axios')

async function allProduct() {
    return (await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products')).data
}

async function allStocks(){
    const products = (await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products')).data
    const stocks = products.map(product => { { return { name: product.name, quantity: product.stock } }})
    return stocks
}


module.exports = {
    allProduct, allStocks
}