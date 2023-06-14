const express = require('express');
const router = express.Router();
const {
  addDeposit
} = require('../helperFunctions.js');

router.post('/', (req, res) => {
  const depositValue = req.body.depositValue;
  const depositDate = req.body.depositDate;
  const depositNotes = req.body.depositNotes;
  const employeeValue = req.body.selectEmployee;
  console.log(`DEPOSIT POST REQUEST`);
  console.log(`VAL: ${depositValue}`);
  console.log(`DAT: ${depositDate}`);
  console.log(`NOT: ${depositNotes}`)
  console.log(`EMP: ${employeeValue}`);
  addDeposit(depositValue, depositDate, depositNotes, employeeValue);
  res.redirect('back');
});

module.exports = router;
