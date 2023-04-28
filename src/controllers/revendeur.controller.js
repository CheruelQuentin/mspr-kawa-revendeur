const Security = require('../security/verifyUser');
const Product = require('../services/productRevendeur.service');
const Customer = require('../services/customerRevendeur.service')
const Revendeur = require('../services/firebaseRevendeur.service')
const axios = require('axios')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function allProducts(req,res) {
    await Security.validateFirebaseIdToken(req, res,async() => {
        const products = await Product.allProduct()
        res.status(200).send(products)
    })
}
async function allCustomers(req,res) {
    await Security.validateFirebaseIdToken(req, res,async() => {
        const customers = await Customer.allCustomer()
        res.status(200).send(customers)
    })
}
async function allStocks(req,res) {
    await Security.validateFirebaseIdToken(req, res,async() => {
        const stocks = await Product.allStocks()
        console.log(stocks)
        res.status(200).send(stocks)
    })
}


async function login(req, res) {
    try {
        const { key } = req.body
        if (!key) return res.status(400).send("Key is required")
        const keyId = key.split(",")[0]
        const hash = await Revendeur.findHash(keyId)
        if (hash === undefined) {
            return res.status(404).send("Key not found.")
        }
        if (key && (await bcrypt.compare(key, hash))) {
            const token = jwt.sign({ key }, process.env.TOKEN_KEY)
            res.status(200).json(token)
            return
        }
        res.status(401).send("Invalid key")
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    allProducts, login, allCustomers, allStocks
}