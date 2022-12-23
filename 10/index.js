addEventListener("DOMContentLoaded", start);

function start() {
  enableNotesToggle();
  // ... other code
}

function setup() {
  createCanvas(600, 600);
  frameRate(30);
}

function draw() {
  drawText([mouseX, mouseY]);
}

function touchStarted() {
  // prevent default
  return false;
}

function drawText(x, y) {
  textSize(32);
  fill(0);
  text(getRandomSymbolCharacter(), mouseX, mouseY);
}

function getRandomSymbolCharacter() {
  const symbols = ["🥲", "🥲", "🥲", "🥲", "🥲", "🥲", "🤔"];
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function enableNotesToggle() {
  const collapseToggle = document.querySelector("#collapse-toggle");
  const collapsible = document.querySelector(".collapsible");

  collapseToggle.addEventListener("click", () => {
    collapsible.classList.toggle("is-not-collapsed");
  });
  // If we're on localhost, show the notes by default
  if (window.location.origin.includes("http://localhost")) {
    collapsible.classList.toggle("is-not-collapsed");
  }
}
