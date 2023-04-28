const express = require('express');
const router = express.Router();
const {parseFile} = require('../helperFunctions.js');


router.get('/', (req, res) => {
  console.log(parseFile());
  res.render('history', {test: "hello world"});
});

module.exports = router;