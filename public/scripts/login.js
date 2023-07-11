function parseJSON(txt) {
  return JSON.parse(txt.replace(/&quot;/g, '"'));
}

const logins = parseJSON(LOGIN_JSON);

function addEvents() {
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");

  let inputs = [usernameInput, passwordInput];

  for (const input of inputs) {
    input.addEventListener("keydown", (ev) => {
      if (ev.key == "Enter") {
        checkCredentials();
      }
    });
  }
}

function checkCredentials() {
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const username = usernameInput.value;
  const password = passwordInput.value;

  let errorMessage = `ERROR:\n\n`;
  if (username == "") {
    errorMessage += "Please enter a username.\n";
  }
  if (password == "") {
    errorMessage += "Please enter a password.\n";
  }
  if (username == "" || password == "") {
    alert(errorMessage);
    return;
  }

  let correctCredentials = false;
  for (const login in logins) {
    if (login == username && logins[login] == password) {
      correctCredentials = true;
      break;
    }
  }

  if (correctCredentials) {
    window.location.replace(`http://burrowreport.com/main/${username}`);
    // window.location.replace(`http://10.0.0.234:3000/main/${username}`);
  } else {
    alert("incorrect login");
  }
}

function init() {
  addEvents();
}

init();
