function createTriangle(num) {
  for (let i = 0; i < num; i++) {
    let inner = "";
    for (let j = 0; j < num - i - 1; j++) {
      inner += " ";
    }
    for (let k = num - i - 1; k < num; k++) {
      inner += " *";
    }
    preNode.innerText += inner + "\n";
  }
}

function rotateTriangle(num) {
  for (let i = num; i > 0; i--) {
    let inner = "";
    for (let j = i; j < num; j++) {
      inner += " ";
    }
    for (let k = num - i; k < num; k++) {
      inner += " *";
    }
    reversedPreNode.innerText += inner + "\n";
  }
}

const inputNode = document.getElementById("input");
const preNode = document.getElementById("triangle-container");
const reversedPreNode = document.getElementById("reverse-triangle");
const buttonNode = document.getElementById("rotate");

buttonNode.addEventListener("click", () => {
  reversedPreNode.innerText = "";
  rotateTriangle(inputNode.value);
});

inputNode.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    preNode.innerText = "";
    reversedPreNode.innerText = "";
    createTriangle(inputNode.value);
    buttonNode.style.display = "block";
  }
});
