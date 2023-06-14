const express = require('express');
const router = express.Router();
const {
  parseFile
} = require('../helperFunctions.js');

router.get('/', (req, res) => {
  const logins = {
    'admin': 'fiber1',
    'cesar': 'cesar123',
    'thiago': 'thiago123',
    'johanna': 'banana',
  };
  res.render('login', {
    loginJSON: JSON.stringify(logins)
  });
});

module.exports = router;
