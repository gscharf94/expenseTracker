const CANVAS_WIDTH = window.innerWidth / 3;
const CANVAS_HEIGHT = 150;

let graphData = parseJSON(GRAPH_DATA);
console.log(graphData);

function drawGraphs() {
  for (const user in graphData) {
    console.log(`drawing canvas for user: ${user}`);
    let normalized = normalizeData(graphData[user]);
    drawGraph(`${user}Canvas`, normalized);
  }
}

console.log(normalizeData(graphData["Cesar"]));
console.log(normalizeData(graphData["Thiago"]));

function setCanvasDimensions(width, height) {
  let elements = document.querySelectorAll(".employeeCanvas");
  for (const element of elements) {
    element.width = width;
    element.height = height;
  }
}

function parseJSON(txt) {
  return JSON.parse(txt.replace(/&quot;/g, '"').replace(/\n/g, ""));
}

function findAbsoluteMax(arr) {
  return arr.reduce((val, next) => {
    if (Math.abs(next) > Math.abs(val)) {
      return next;
    } else {
      return val;
    }
  });
}

function drawGraph(canvasID, data) {
  const LINE_WIDTH = 1;

  let canvasElement = document.getElementById(canvasID);
  let canvas = canvasElement.getContext("2d");

  let center1 = { x: 0, y: Math.floor(CANVAS_HEIGHT / 2) };
  let center2 = { x: CANVAS_WIDTH, y: Math.floor(CANVAS_HEIGHT / 2) };

  drawLine(canvas, center1, center2, "white", 1);

  for (let i = 0; i < data.length; i++) {
    if (i == data.length - 1) {
      console.log("should happen once");
      continue;
    } else {
      let pos1 = { x: i, y: data[i] * -1 };
      let pos2 = { x: i + 1, y: data[i + 1] * -1 };

      let color;
      if (pos1.y > pos2.y) {
        color = "green";
      } else {
        color = "red";
      }

      drawLine(canvas, pos1, pos2, color, LINE_WIDTH);
      if (pos1.y > Math.floor(CANVAS_HEIGHT / 2)) {
        drawLine(
          canvas,
          pos1,
          { x: pos1.x, y: Math.floor(CANVAS_HEIGHT / 2) - 1 },
          "red",
          1
        );
      } else {
        drawLine(
          canvas,
          pos1,
          { x: pos1.x, y: Math.floor(CANVAS_HEIGHT / 2) + 1 },
          "green",
          1
        );
      }
    }
  }
}

function drawLine(canvas, pos1, pos2, color, width) {
  canvas.lineWidth = width;
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.moveTo(pos1.x, pos1.y);
  canvas.lineTo(pos2.x, pos2.y);
  canvas.stroke();
}

function interpolateEntriesRandomly(arr) {
  let swapIndex = Math.floor(Math.random() * arr.length);
  let nextIndex;
  if (swapIndex == 0) {
    nextIndex = 1;
  } else if (swapIndex == arr.length - 1) {
    nextIndex = arr.length - 2;
  } else {
    let coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip == 0) {
      nextIndex = swapIndex + 1;
    } else {
      nextIndex = swapIndex - 1;
    }
  }
  let average = (arr[swapIndex] + arr[nextIndex]) / 2;

  if (swapIndex > nextIndex) {
    let firstHalf = arr.slice(0, nextIndex + 1);
    let secondHalf = arr.slice(swapIndex);
    firstHalf.push(average);
    arr = firstHalf.concat(secondHalf);
  } else {
    let firstHalf = arr.slice(0, swapIndex + 1);
    let secondHalf = arr.slice(nextIndex);
    firstHalf.push(average);
    arr = firstHalf.concat(secondHalf);
  }
  return arr;
}

function averageEntriesRandomly(arr) {
  let swapIndex = Math.floor(Math.random() * arr.length);
  let nextIndex;
  if (swapIndex == 0) {
    nextIndex = 1;
  } else if (swapIndex == arr.length - 1) {
    nextIndex = arr.length - 2;
  } else {
    let coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip == 0) {
      nextIndex = swapIndex + 1;
    } else {
      nextIndex = swapIndex - 1;
    }
  }
  let average = (arr[swapIndex] + arr[nextIndex]) / 2;
  arr[swapIndex] = average;
  let firstHalf = arr.slice(0, nextIndex);
  let secondHalf = arr.slice(nextIndex + 1);
  arr = firstHalf.concat(secondHalf);
  return arr;
}

function scaleEntries(arr) {
  let diff = Math.abs(Math.floor(arr.length - CANVAS_WIDTH));
  if (diff == 0) {
    console.log(`diff = 0`);
    return;
  }

  if (CANVAS_WIDTH > arr.length) {
    for (let i = 0; i < diff; i++) {
      arr = interpolateEntriesRandomly(arr);
    }
  } else {
    for (let i = 0; i < diff; i++) {
      arr = averageEntriesRandomly(arr);
    }
  }
  return arr;
}

// canvas height right now is 100 pixels
// so we're gonna make it 80
function normalizeYAxis(arr) {
  return arr.map((val) => {
    return (
      (val / findAbsoluteMax(arr)) * Math.floor((CANVAS_HEIGHT / 2) * 0.95)
    );
  });
}

function normalizeXAxis(arr) {
  return scaleEntries(arr);
}

function offsetData(arr) {
  return arr.map((val) => {
    return val - Math.floor(CANVAS_HEIGHT / 2);
  });
}

function normalizeData(arr) {
  let yNormalized = [...normalizeYAxis(arr)];
  let xNormalized = [...normalizeXAxis(yNormalized)];
  let offset = [...offsetData(xNormalized)];
  console.log(offset);
  return offset;
}

function resetInputs() {
  let depositValue = document.getElementById("depositValue");
  let depositNotes = document.getElementById("depositNotes");
  let depositDate = document.getElementById("depositDate");
  let employeeSelect = document.getElementById("selectEmployee");

  let inputs = [depositValue, depositNotes, depositDate, employeeSelect];

  for (const input of inputs) {
    input.value = "";
  }
}

function determineColor(text) {
  if (text[0] == "-") {
    return "red";
  } else {
    return "green";
  }
}

function colorHeaders() {
  let headers = document.querySelectorAll(".employeeBalanceHeader");
  for (const header of headers) {
    let color = determineColor(header.textContent.trim());
    if (color == "red") {
      header.style.color = "red";
    } else {
      header.style.color = "green";
    }
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
  let depositSubmit = document.getElementById("depositSubmit");
  depositSubmit.addEventListener("click", validateDepositInputs);
  colorHeaders();
  setCanvasDimensions(CANVAS_WIDTH, CANVAS_HEIGHT);
  drawGraphs();
}

init();
