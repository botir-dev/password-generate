const upperCase = document.getElementById("UpperCase");
const lowerCase = document.getElementById("LowerCase");
const numbers = document.getElementById("Numbers");
const symbols = document.getElementById("Symbols");
const generateBtn = document.getElementById("generate");
const Form = document.getElementById("form");
const RangeInput = document.getElementById("range");
const CharacterLength = document.getElementById("characterLength");
const passwordSpan = document.getElementById("passwordSpan");
const Copy = document.getElementById("btn");

Copy.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordSpan.textContent);
});

let arr = [];
let password = [];
let valuesName = [];
let passLength = 4;

let lenObj = {
  symbols: 0,
  upperCase: 0,
  lowerCase: 0,
  numbers: 0,
};

const allowed = [
  ...Array.from({ length: 47 - 32 + 1 }, (_, i) => 32 + i), // 32-47
  ...Array.from({ length: 64 - 58 + 1 }, (_, i) => 58 + i), // 58-64
  ...Array.from({ length: 96 - 91 + 1 }, (_, i) => 91 + i), // 91-96
  ...Array.from({ length: 126 - 123 + 1 }, (_, i) => 123 + i), // 123-126
];

const funcObj = {
  upperCase: (val) => {
    for (let i = 0; i < val; i++) {
      let result = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
      password.push(String.fromCharCode(result));
    }
  },
  lowerCase: (val) => {
    for (let i = 0; i < val; i++) {
      let result = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
      password.push(String.fromCharCode(result));
    }
  },
  numbers: (val) => {
    for (let i = 0; i < val; i++) {
      let result = Math.floor(Math.random() * 10);
      password.push(result);
    }
  },
  symbols: (val) => {
    for (let i = 0; i < val; i++) {
      const randomIndex = Math.floor(Math.random() * allowed.length);
      let result = allowed[randomIndex];
      password.push(String.fromCharCode(result));
    }
  },
};

function FunctionForArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  let str = arr.join("");
  passwordSpan.innerText = str;
}

RangeInput.addEventListener("input", (e) => {
  CharacterLength.textContent = e.target.value;
  passLength = e.target.value;
});

Form.addEventListener("submit", (e) => {
  e.preventDefault();

  valuesName = [];
  password = [];
  const formData = new FormData(Form);
  if (formData.get("upperCase")) valuesName.push("upperCase");
  if (formData.get("lowerCase")) valuesName.push("lowerCase");
  if (formData.get("numbers")) valuesName.push("numbers");
  if (formData.get("symbols")) valuesName.push("symbols");

  let total = Math.floor(passLength / valuesName.length);
  let remainder = passLength % valuesName.length;

  valuesName.forEach((key) => {
    lenObj[key] = total;
  });

  while (remainder > 0) {
    const randomKey = valuesName[Math.floor(Math.random() * valuesName.length)];
    lenObj[randomKey] += 1;
    remainder--;
  }

  valuesName.forEach((key) => {
    funcObj[key](lenObj[key]);
  });

  FunctionForArray(password);
});
