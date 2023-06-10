const express = require('express');
const router = express.Router();

const RevendeurController = require('../controllers/revendeur.controller');
router.get('/products', RevendeurController.allProducts);
router.get('/stocks', RevendeurController.allStocks);
router.get('/customers', RevendeurController.allCustomers);
router.post('/login', RevendeurController.login);

module.exports = router;
exports.revendeur = router;