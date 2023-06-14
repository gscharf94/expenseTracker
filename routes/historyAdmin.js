const express = require('express');
const router = express.Router();
const {
  parseFile
} = require('../helperFunctions.js');


router.get('/:user', (req, res) => {
  const data = parseFile(req.params.user);
  res.render('historyAdmin', {
    data: JSON.stringify(data),
    user: req.params.user,
  });
});

module.exports = router;
