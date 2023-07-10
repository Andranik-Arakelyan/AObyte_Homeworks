const EMPTY = "";
const SPACE = " ";
const ITEM = " *";
const NEW_LINE = "\n";
const ERROR_COLOR = "rgb(255, 80, 80)";

function createTriangle(num) {
  let inner = EMPTY;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num - i - 1; j++) {
      inner += SPACE;
    }
    for (let k = num - i - 1; k < num; k++) {
      inner += ITEM;
    }
    inner += NEW_LINE;
  }
  return inner;
}

function rotateTriangle(num) {
  let inner = EMPTY;
  for (let i = num; i > 0; i--) {
    for (let j = i; j < num; j++) {
      inner += SPACE;
    }
    for (let k = num - i; k < num; k++) {
      inner += ITEM;
    }
    inner += NEW_LINE;
  }
  return inner;
}

const inputNode = document.getElementById("input");
const preNode = document.getElementById("triangle-container");
const reversedPreNode = document.getElementById("reverse-triangle");
const buttonNode = document.getElementById("rotate");

buttonNode.addEventListener("click", () => {
  reversedPreNode.innerText = rotateTriangle(inputNode.value);
});

inputNode.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (inputNode.value < 1) {
      inputNode.value = "";
      inputNode.placeholder = "Please input positive number";
      inputNode.style.backgroundColor = ERROR_COLOR;
    } else {
      preNode.innerText = createTriangle(inputNode.value);
      reversedPreNode.innerText = "";
      inputNode.style.backgroundColor = "transparent";

      buttonNode.style.display = "block";
    }
  }
});
