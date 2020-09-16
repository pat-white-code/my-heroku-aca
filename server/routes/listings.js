const express = require('express');
const router = express.Router();
const controller = require('../controllers/listings');

router.post('/', controller.createListing);

module.exports = router;