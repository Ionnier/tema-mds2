const express = require('express');
const barcodeController = require('./../controllers/barcodeController');
const authController = require('./../controllers/authController');
const cookieParser = require('cookie-parser');


const router = express.Router();

router.get('/:barcodeNumber', barcodeController.getProducts)
router.post('/', cookieParser(),  express.json(), authController.protect, barcodeController.postProduct)

module.exports = router