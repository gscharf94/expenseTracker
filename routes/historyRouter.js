const express = require('express');
const router = express.Router();
const {
  parseFile
} = require('../helperFunctions.js');


router.get('/:user', (req, res) => {
  const usr = req.params.user[0].toUpperCase() + req.params.user.slice(1, );
  const data = parseFile(usr);
  res.render('history', {
    data: JSON.stringify(data),
    user: usr,
  });
});

module.exports = router;
