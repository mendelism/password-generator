// Assignment Code
const generateBtn = document.querySelector("#generate");
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lower = "abcdefghijklmnopqrstuvwxyz".split("");
const nums = "0123456789".split("");
const special = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~".split("");
const allTypes = ["length", upper, lower, nums, special];

let criteria = [];
let types = [];

// User criteria input
function setCriteria() {
  let pwLength = window.prompt("Choose a length between 8 and 128")

  if (typeof(parseInt(pwLength)) === "number" && pwLength >= 8 && pwLength <= 128) {
    criteria.push(pwLength);
    criteria.push(window.confirm("Include *UPPERCASE* characters? \n(select 'cancel' for no)"));
    criteria.push(window.confirm("Include *lowercase* characters? \n(select 'cancel' for no)"));
    criteria.push(window.confirm("Include *numbers*? \n(select 'cancel' for no)"));
    criteria.push(window.confirm("Include *special* characters? \n(select 'cancel' for no)"));
  } else { // If the user did not input a number between 8 and 128, alert and restart
    alert("Please input a number between 8 and 128");
    setCriteria();
  }
}

// Pull chosen character types to array matching criteria array
function pullTypes() {
  // Add chosen character arrays to an array
  for (let i = 1; i < criteria.length; i++) {
    if (criteria[i]) {
      types.push(allTypes[i]);
    }
  }
  //  Make sure at least one character type was confirmed
  if (types.length < 1) {
    alert("Please select at least one character type");
    generatePassword();
  }
}

// Generate password
function generatePassword() {
  setCriteria();
  pullTypes();
  let pass = ""
  // For chosen length, choose random character type from types array, then choose random character and concat to pass
  for (let i = 0; i < criteria[0]; i++) {
    let type = types[Math.random() * types.length | 0];
    let char = type[Math.random() * type.length | 0];
    pass = pass + char;
  }
  // Reset criteria and types arrays for new pass generation
  criteria = [];
  types = [];

  return pass;
}


// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
