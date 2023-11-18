console.log("loaded");

const currentElement = document.querySelector("#current");
const changelogElement = document.querySelector("#changelog");
const incrementButton = document.querySelector("#increment");
const decrementButton = document.querySelector("#decrement");
const rewindButton = document.querySelector("#rewind");

let current = 0;
let changelog = [];

function init() {
  update();

  incrementButton.addEventListener("click", increment);
  decrementButton.addEventListener("click", decrement);
  rewindButton.addEventListener("click", rewind);

  addKeydownShortcuts();
}

function addKeydownShortcuts() {
  // listen to right arrow key
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      increment();
    }
  });

  // listen to left arrow key
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      decrement();
    }
  });

  // backspace will rewind
  document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
      rewind();
    }
  });
}

function increment() {
  current++;
  changelog.push("+1");
  update();
}

function decrement() {
  current--;
  changelog.push("-1");
  update();
}

function update() {
  currentElement.textContent = current;
  changelogElement.textContent = changelog.join(", ");
}

let interval = null;
function rewind() {
  if (changelog.length === 0) {
    return;
  }

  if (interval) {
    clearInterval(interval);
    rewindButton.textContent = "Rewind";
    interval = null;
    return;
  }

  rewindButton.textContent =
    "Rewinding... (you can fight it by in/decrementing)";
  interval = setInterval(() => {
    const change = changelog.shift();
    current -= parseInt(change);
    update();

    if (changelog.length === 0) {
      rewindButton.textContent = "Rewind";
      clearInterval(interval);
      interval = null;
      return;
    }
  }, 70);
}

init();
