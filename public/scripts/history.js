console.log('hello world');
console.log(DATA_JSON);

function parseJSON(txt) {
    return JSON.parse(txt.replace(/&quot;/g, '"').replace(/\n/g, ""));
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

function populateTable(data) {
  let tableId = document.getElementById('mainTable');
  let html = `
    <tr>
      <th> # </th>
      <th> date </th>
      <th> value </th>
      <th> notes </th>
    </tr>
  `;
  let c = 0;
  for (let i = data.length - 1; i > -1; i--) {
    const id = data[i][0];
    const itemType = data[i][1];
    const value = data[i][2];
    const itemDate = data[i][3];
    const notes = data[i][4];
    if (c++ % 2 == 0) {
    html += `
      <tr>
        <td> ${id} </td>
        <td> ${itemDate} </td>
        <td class="${(itemType == "expense")?"expenseCell":"depositCell"}"> ${(itemType == "expense")?"-":""}${formatCurrency(value)} </td>
        <td class="notes">${notes}</td>
      </tr>
    `;
    } else {
    html += `
      <tr>
        <td class="grayRow"> ${id} </td>
        <td class="grayRow"> ${itemDate} </td>
        <td class="grayRow ${(itemType=="expense")?"expenseCell":"depositCell"}"> ${(itemType == "expense")?"-":""}${formatCurrency(value)} </td>
        <td class="notes grayRow">${notes}</td>
      </tr>
    `;

    }
  }

  tableId.innerHTML = html;
}

let data = parseJSON(DATA_JSON);
console.log(data);

populateTable(data);