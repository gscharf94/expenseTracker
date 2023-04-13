const express = require('express');
const router = express.Router();
const {getSum, formatCurrency} = require('../helperFunctions.js');

router.get('/', (req, res) => {
  const sum = getSum();
	res.render('index', {balance: formatCurrency(sum)});
});

module.exports = router;