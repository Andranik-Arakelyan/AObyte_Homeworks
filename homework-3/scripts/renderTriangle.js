function createTriangle(num) {
  let inner = "";
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num - i - 1; j++) {
      inner += " ";
    }
    for (let k = num - i - 1; k < num; k++) {
      inner += " *";
    }
    inner += "\n";
  }
  return inner;
}

function rotateTriangle(num) {
  let inner = "";
  for (let i = num; i > 0; i--) {
    for (let j = i; j < num; j++) {
      inner += " ";
    }
    for (let k = num - i; k < num; k++) {
      inner += " *";
    }
    inner += "\n";
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
    preNode.innerText = createTriangle(inputNode.value);
    reversedPreNode.innerText = "";

    buttonNode.style.display = "block";
  }
});
