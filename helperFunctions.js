const fs = require('fs');

function removeCommas(str) {
  return str.replace(/,/g, "");
}

function getFilePath(user) {
  return `./${user}Log.csv`;
}

function formatDateToDatabase(expenseDate) {
  let [year, month, day] = expenseDate.split("-");
  return `${month}/${day}/${year.slice(-2,)}`;
}

function addExpense(value, expenseDate, notes, user, imageType) {
  let id = getNextId(user);
  let output = `${id}, expense, ${value}, ${formatDateToDatabase(expenseDate)}, ${removeCommas(notes)},${imageType},\n`;
  fs.appendFileSync(getFilePath(user), output);
}

function addDeposit(value, depositDate, notes, user) {
  let id = getNextId(user);
  let output = `${id}, deposit, ${value}, ${formatDateToDatabase(depositDate)}, ${removeCommas(notes)},\n`;
  fs.appendFileSync(getFilePath(user), output);
}

function parseFile(username) {
  let text = fs.readFileSync(getFilePath(username), 'utf8');
  let data = [];
  for (const row of text.split("\n")) {
    if (row.split(",")[0] == "id" || row == "") {} else {
      let dataRow = [];
      dataRow.push(Number(row.split(",")[0]));
      dataRow.push(row.split(",")[1].trim());
      dataRow.push(Number(row.split(",")[2]));
      dataRow.push(row.split(",")[3].trim());
      dataRow.push(row.split(",")[4].trim());
      dataRow.push(row.split(",")[5].trim());
      data.push(dataRow);
    }
  }
  return data;
}

function getSum(user) {
  let data = parseFile(user);
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

function getNextId(user) {
  let data = parseFile(user);
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
    if (dollars[1] == "0" && cents[0] == "0" && cents[1] == "0") {
      return "$0.00";
    }
    positive = false;
    dollars = dollars.slice(1, );
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
  for (let i = dollars.length - 1; i > -1; i--) {
    dollarsTmp = dollars[i] + dollarsTmp;
    if (c % 3 == 0) {
      dollarsTmp = "," + dollarsTmp;
    }
    c++;
  }
  if (dollarsTmp[0] == ",") {
    dollarsTmp = dollarsTmp.slice(1, );
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
