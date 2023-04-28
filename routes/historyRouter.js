const express = require('express');
const router = express.Router();
const {parseFile} = require('../helperFunctions.js');


router.get('/', (req, res) => {
  const data = parseFile();
  res.render('history', {data: data});
});

module.exports = router;