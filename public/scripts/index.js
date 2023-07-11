function resetInputs() {
  let expenseValue = document.getElementById("expenseValue");
  let depositValue = document.getElementById("depositValue");
  let fileInput = document.getElementById("uploadFile");
  let expenseNotes = document.getElementById("expenseNotes");
  let depositNotes = document.getElementById("depositNotes");
  let expenseDate = document.getElementById("expenseDate");
  let depositDate = document.getElementById("depositDate");

  let inputs = [
    expenseValue,
    depositValue,
    fileInput,
    expenseNotes,
    depositNotes,
    expenseDate,
    depositDate,
  ];
  for (const input of inputs) {
    input.value = "";
  }
}

function determineColor(elementId) {
  let txt = document.getElementById(elementId).value.trim();
  if (txt[0] == "-") {
    return "red";
  } else {
    return "green";
  }
}

function colorHeader() {
  let element = document.getElementById("balance");
  let val = element.textContent.trim();
  if (val[0] == "-") {
    element.style.color = "red";
  } else {
    element.style.color = "green";
  }
}

function validateDollarInput(inputId) {
  let input = document.getElementById(inputId);
  let val = input.value;
  if (val == "") {
    return false;
  }
  let periodCounter = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i] == ".") {
      periodCounter++;
      if (periodCounter > 1) {
        return false;
      }
      continue;
    }
    if (isNaN(val[i]) == true) {
      return false;
    }
  }
  if (periodCounter == 1) {
    let [dollars, cents] = val.split(".");
    if (cents.length > 2) {
      return false;
    }
  }
  return true;
}

function validateDateInput(inputId) {
  let input = document.getElementById(inputId);
  let val = input.value;
  if (val == "") {
    return false;
  }

  return true;
}

function validateNotesInput(inputId) {
  let input = document.getElementById(inputId);
  let val = input.value;
  if (val == "") {
    return false;
  }

  return true;
}

function validateExpenseInputs(e) {
  if (!validateDollarInput("expenseValue")) {
    e.preventDefault();
    alert("dollar value is incorrect");
  }
  if (!validateDateInput("expenseDate")) {
    e.preventDefault();
    alert("no date input");
  }
  if (!validateNotesInput("expenseNotes")) {
    e.preventDefault();
    alert("no notes input");
  }
}

function validateDepositInputs(e) {
  if (!validateDollarInput("depositValue")) {
    e.preventDefault();
    alert("dollar value is incorrect");
  }
  if (!validateDateInput("depositDate")) {
    e.preventDefault();
    alert("no date input");
  }
  if (!validateNotesInput("depositNotes")) {
    e.preventDefault();
    alert("no notes input");
  }
}

function init() {
  console.log("i love johanna");
  resetInputs();
  let expenseSubmit = document.getElementById("expenseSubmit");
  expenseSubmit.addEventListener("click", validateExpenseInputs);

  let hiddenEmployee = document.getElementById("employee");
  hiddenEmployee.value = user;

  colorHeader();
}

init();
