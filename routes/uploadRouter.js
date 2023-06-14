const express = require('express');
const router = express.Router();
const {
  exec
} = require('child_process');
const {
  addExpense,
  getNextId
} = require('../helperFunctions.js');

router.post('/', (req, res) => {
  const usr = req.body.employee[0].toUpperCase() + req.body.employee.slice(1, );
  const nextId = getNextId(usr);
  const expenseValue = req.body.expenseValue;
  const expenseDate = req.body.expenseDate;
  const expenseNotes = req.body.expenseNotes;
  console.log(`EXPENSE POST REQUEST`);
  console.log(`VAL: ${expenseValue}`);
  console.log(`DAT: ${expenseDate}`);
  console.log(`NOT: ${expenseNotes}`);
  console.log(`EMP: ${usr}`);
  if (req.files) {
    const {
      image
    } = req.files;
    const imageName = `${process.cwd()}/public/images/receipts/${usr}/${nextId}${image.name.slice(image.name.lastIndexOf('.'),)}`;
    addExpense(expenseValue, expenseDate, expenseNotes, usr, image.name.slice(image.name.lastIndexOf('.') + 1, ));
    console.log(imageName);
    image.mv(imageName, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      exec(`convert ${imageName} -resize 45% -quality 40% ${imageName}`);
    });
  } else {
    addExpense(expenseValue, expenseDate, expenseNotes, usr, "none");
  }
  res.redirect('back');
});

module.exports = router;
