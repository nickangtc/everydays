addEventListener("DOMContentLoaded", start);

function start() {
  const uniqueCharsForm = document.querySelector("form#uniqueChars");
  uniqueCharsForm.addEventListener("submit", uniqueChars);

  const replaceNewLinesForm = document.querySelector("form#replaceNewLines");
  replaceNewLinesForm.addEventListener("submit", replaceNewLines);
}

function uniqueChars(ev) {
  ev.preventDefault();
  const input = document.querySelector("#uniqueCharsInput").value;
  const output = document.querySelector("#uniqueCharsOutput");

  const set = [...new Set(input.split(""))].join("");

  output.value = set;
  output.classList.toggle("highlight");
  setTimeout(() => output.classList.toggle("highlight"), 3000);
}

function replaceNewLines(ev) {
  ev.preventDefault();
  const input = document.querySelector("#replaceNewLinesInput").value;
  const output = document.querySelector("#replaceNewLinesOutput");

  const replaced = input.split("\n").join(", ");
  output.value = replaced;
}
