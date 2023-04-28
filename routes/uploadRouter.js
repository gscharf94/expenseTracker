const express = require('express');
const router = express.Router();
const exec = require('child_process');
const {addExpense, getNextId} = require('../helperFunctions.js');

router.post('/', (req, res) => {
  const nextId = getNextId();
  const expenseValue = req.body.expenseValue;
  const expenseDate = req.body.expenseDate;
  const expenseNotes = req.body.expenseNotes;
  console.log(`EXPENSE POST REQUEST`);
  console.log(`VAL: ${expenseValue}`);
  console.log(`DAT: ${expenseDate}`);
  console.log(`NOT: ${expenseNotes}`);
  addExpense(expenseValue, expenseDate, expenseNotes);
  if (req.files) {
    const {image} = req.files;
    const imageName = `${process.cwd()}/upload/${nextId}${image.name.slice(image.name.lastIndexOf('.'),)}`;
    image.mv(imageName, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
     exec(`convert ${imageName} -resize 25% -quality 5% ${imageName}`); 
    });
  }
	res.redirect('back');
});

module.exports = router;