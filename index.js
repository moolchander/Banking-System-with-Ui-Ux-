var accountNumbers = [];
var names = [];
var pins = [];
var balances = [];
var currentUser = -1;

function goHome() {
  document.getElementById("landingPage").style.display = "flex";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
}

function openRegister() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("registerPage").style.display = "flex";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
  clearRegisterErrors();
}

function openLogin() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
  document.getElementById("dashboard").style.display = "none";
  clearLogin();
}

function clearRegisterErrors() {
  document.getElementById("accountError").innerHTML = "";
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("pinError").innerHTML = "";
  document.getElementById("registerMessage").innerHTML = "";
}

function createAccount() {
  clearRegisterErrors();
  var accNo = document.getElementById("newAccNo").value;
  var name = document.getElementById("newName").value;
  var pin = document.getElementById("newPin").value;
  var balance = 0;

  if (accNo == "") {
    document.getElementById("accountError").innerHTML = "Please enter account number.";
    return;
  }

  if (name == "") {
    document.getElementById("nameError").innerHTML = "Please enter your name.";
    return;
  }

  if (pin == "") {
    document.getElementById("pinError").innerHTML = "Please enter PIN.";
    return;
  }

  if (accountNumbers.indexOf(accNo) != -1) {
    document.getElementById("accountError").innerHTML = "Account number already exists.";
    return;
  }

  accountNumbers.push(accNo);
  names.push(name);
  pins.push(pin);
  balances.push(balance);

  document.getElementById("registerMessage").innerHTML = "Account created successfully.";
  document.getElementById("newAccNo").value = "";
  document.getElementById("newName").value = "";
  document.getElementById("newPin").value = "";
}

function clearLogin() {
  document.getElementById("loginAccountError").innerHTML = "";
  document.getElementById("loginPinError").innerHTML = "";
  document.getElementById("loginMessage").innerHTML = "";
  document.getElementById("loginMessage").style.color = "";
}

function login() {
  clearLogin();
  var accNo = document.getElementById("loginAccNo").value;
  var pin = document.getElementById("loginPin").value;
  var index = accountNumbers.indexOf(accNo);

  if (index == -1) {
    document.getElementById("loginMessage").style.color = "#b91c1c";
    document.getElementById("loginMessage").innerHTML = "Invalid account number or PIN.";
    return;
  }

  if (pins[index] != pin) {
    document.getElementById("loginMessage").style.color = "#b91c1c";
    document.getElementById("loginMessage").innerHTML = "Invalid account number or PIN.";
    return;
  }

  currentUser = index;
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  openDashboardSection("main");
  document.getElementById("welcomeName").innerHTML = names[currentUser];
  document.getElementById("currentBalance").innerHTML = balances[currentUser];
  document.getElementById("loginMessage").style.color = "#047857";
  document.getElementById("loginMessage").innerHTML = "Login successful.";
}

function logout() {
  currentUser = -1;
  goHome();
}

function openDashboardSection(section) {
  document.getElementById("dashboardMain").style.display = "none";
  document.getElementById("depositSection").style.display = "none";
  document.getElementById("withdrawSection").style.display = "none";
  document.getElementById("transferSection").style.display = "none";
  document.getElementById("depositError").innerHTML = "";
  document.getElementById("withdrawError").innerHTML = "";
  document.getElementById("transferError").innerHTML = "";
  document.getElementById("depositMessage").innerHTML = "";
  document.getElementById("withdrawMessage").innerHTML = "";
  document.getElementById("transferMessage").innerHTML = "";

  if (section == "deposit") {
    document.getElementById("depositSection").style.display = "block";
  } else if (section == "withdraw") {
    document.getElementById("withdrawSection").style.display = "block";
  } else if (section == "transfer") {
    document.getElementById("transferSection").style.display = "block";
  } else {
    document.getElementById("dashboardMain").style.display = "block";
  }
}

function deposit() {
  document.getElementById("depositError").innerHTML = "";
  document.getElementById("depositMessage").innerHTML = "";
  var amount = Number(document.getElementById("depositAmount").value);

  if (isNaN(amount)) {
    document.getElementById("depositError").innerHTML = "Please enter numbers only.";
    return;
  }

  if (amount <= 0) {
    document.getElementById("depositError").innerHTML = "Enter a valid amount.";
    return;
  }

  balances[currentUser] = balances[currentUser] + amount;
  document.getElementById("currentBalance").innerHTML = balances[currentUser];

  document.getElementById("depositAmount").value = "";
  document.getElementById("depositMessage").innerHTML = "Deposit completed successfully.";
}

function withdraw() {
  document.getElementById("withdrawError").innerHTML = "";
  document.getElementById("withdrawMessage").innerHTML = "";
  var amount = Number(document.getElementById("withdrawAmount").value);

  if (isNaN(amount)) {
    document.getElementById("withdrawError").innerHTML = "Please enter numbers only.";
    return;
  }

  if (amount <= 0) {
    document.getElementById("withdrawError").innerHTML = "Enter a valid amount.";
    return;
  }

  if (amount > balances[currentUser]) {
    document.getElementById("withdrawError").innerHTML = "Insufficient balance.";
    return;
  }

  balances[currentUser] = balances[currentUser] - amount;
  document.getElementById("currentBalance").innerHTML = balances[currentUser];
  document.getElementById("withdrawAmount").value = "";
  document.getElementById("withdrawMessage").innerHTML = "Withdrawal completed successfully.";
}

function transferMoney() {
  document.getElementById("transferError").innerHTML = "";
  document.getElementById("transferMessage").innerHTML = "";
  var receiver = document.getElementById("receiverAccount").value;
  var amount = Number(document.getElementById("transferAmount").value);
  var receiverIndex = accountNumbers.indexOf(receiver);

  if (receiverIndex == -1) {
    document.getElementById("transferError").innerHTML = "Receiver account does not exist.";
    return;
  }

  if (receiverIndex == currentUser) {
    document.getElementById("transferError").innerHTML = "You cannot transfer to your own account.";
    return;
  }

  if (isNaN(amount)) {
    document.getElementById("transferError").innerHTML = "Please enter numbers only.";
    return;
  }

  if (amount <= 0) {
    document.getElementById("transferError").innerHTML = "Enter a valid amount.";
    return;
  }

  if (amount > balances[currentUser]) {
    document.getElementById("transferError").innerHTML = "Insufficient balance.";
    return;
  }

  balances[currentUser] = balances[currentUser] - amount;
  balances[receiverIndex] = balances[receiverIndex] + amount;
  document.getElementById("currentBalance").innerHTML = balances[currentUser];
  document.getElementById("receiverAccount").value = "";
  document.getElementById("transferAmount").value = "";
  document.getElementById("transferMessage").innerHTML = "Transfer completed successfully.";
}

