function resetInputs() {
  let depositValue = document.getElementById('depositValue');
  let depositNotes = document.getElementById('depositNotes');
  let depositDate = document.getElementById('depositDate');
  let employeeSelect = document.getElementById('selectEmployee');

  let inputs = [
    depositValue, depositNotes,
    depositDate, employeeSelect,
  ]

  for (const input of inputs) {
    input.value = "";
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
  if (!validateDollarInput('expenseValue')) {
    e.preventDefault();
    alert('dollar value is incorrect');
  }
  if (!validateDateInput('expenseDate')) {
    e.preventDefault();
    alert('no date input');
  }
  if (!validateNotesInput('expenseNotes')) {
    e.preventDefault();
    alert('no notes input');
  }
}

function validateDepositInputs(e) {
  if (!validateDollarInput('depositValue')) {
    e.preventDefault();
    alert('dollar value is incorrect');
  }
  if (!validateDateInput('depositDate')) {
    e.preventDefault();
    alert('no date input');
  }
  if (!validateNotesInput('depositNotes')) {
    e.preventDefault();
    alert('no notes input');
  }
}

function colorHeaders() {

}

function init() {
  console.log('i love johanna');
  resetInputs();
  let depositSubmit = document.getElementById('depositSubmit');
  depositSubmit.addEventListener('click', validateDepositInputs);
}

init();
