const fs = require('fs');
const logFilePath = "./log.csv";

function removeCommas(str) {
  return str.replace(/,/g, "");
}

function formatDateToDatabase(expenseDate) {
  let [year, month, day] = expenseDate.split("-");
  return `${month}/${day}/${year.slice(-2,)}`;
}

function addExpense(value, expenseDate, notes) {
  let id = getNextId();
  let output = `${id}, expense, ${value}, ${formatDateToDatabase(expenseDate)}, ${removeCommas(notes)},\n`;
  fs.appendFileSync(logFilePath, output);
}

function addDeposit(value, depositDate, notes) {
  let id = getNextId();
  let output = `${id}, deposit, ${value}, ${formatDateToDatabase(expenseDate)}, ${removeCommas(notes)},\n`;
  fs.appendFileSync(logFilePath, output);
}

function parseFile() {
  let text = fs.readFileSync(logFilePath, 'utf8');
  let data = [];
  for (const row of text.split("\n")) {
    if (row.split(",")[0] == "id" || row == "") {
    } else {
      let dataRow = [];
      dataRow.push(Number(row.split(",")[0]));
      dataRow.push(row.split(",")[1].trim());
      dataRow.push(Number(row.split(",")[2]));
      dataRow.push(row.split(",")[3].trim());
      dataRow.push(row.split(",")[4].trim());
      data.push(dataRow);
    }
  }
  return data;
}

function getSum() {
  let data = parseFile();
  let sum = 0;
  for (const row of data) {
    if (row[1] == "expense") {
      sum = sum - row[2];
    } else {
      sum = sum + row[2];
    }
  }
  return sum;
}

function getNextId() {
  let data = parseFile();
  if (data.length == 0) {
    return 1;
  }
  let biggestNumber = 0;
  for (const row of data) {
    if (row[0] > biggestNumber) {
      biggestNumber = row[0];
    }
  }
  return biggestNumber + 1;
}

function formatCurrency(val) {
  let [dollars, cents] = String(val).split(".");
  let positive = null;
  if (dollars[0] == "-") {
    positive = false;
    dollars = dollars.slice(1,);
  } else {
    positive = true;
  }
  if (cents == "" || cents == undefined) {
    cents = "00";
  } else if (cents.length == 2) {

  } else if (cents.length > 2) {
    cents = cents.slice(0, 2);
  } else {
    cents = cents.padEnd(2, "0");
  }
  let dollarsTmp = "";
  let c = 1;
  for (let i = dollars.length -1; i > -1; i--) {
    dollarsTmp = dollars[i] + dollarsTmp;
    if (c%3 == 0) {
      dollarsTmp = "," + dollarsTmp;
    }
    c++;
  }
  if (dollarsTmp[0] == ",") {
    dollarsTmp = dollarsTmp.slice(1,);
  }
  return `${(positive) ? "" : "-"}$${dollarsTmp}.${cents}`;
}

module.exports = {
  getNextId,
  parseFile,
  addExpense,
  addDeposit,
  getSum,
  formatCurrency,
}