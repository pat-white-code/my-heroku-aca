const express = require('express');
const router = express.Router();
const controller = require('../controllers/listings');

router.post('/', controller.createListing);

router.get('/', controller.getListings);

module.exports = router;