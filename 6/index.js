addEventListener("DOMContentLoaded", start);

let canvas;
let ctx;
const christmasTreeColor = [
  randomChristmasHexColor(),
  randomChristmasHexColor(),
  randomChristmasHexColor(),
];
const lightsCoordinates = [];

function start() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  enableNotesToggle();
  enableResponsiveResizing(canvas);
  renderChristmasTree();
  updateLights();

  canvas.addEventListener("touchstart", handleStart);
  canvas.addEventListener("touchmove", handleMove);
}

// christmas tree drawing code copied from:
// https://girlthatlovestocode.com/html-canvas-christmas-tutorial-part-1-basics
function renderChristmasTree() {
  drawTriangle(30, 270, christmasTreeColor[0]);
  drawTriangle(30, 200, christmasTreeColor[1]);
  drawTriangle(30, 130, christmasTreeColor[2]);
}

function drawTriangle(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 100, y - 100);
  ctx.lineTo(x + 200, y);
  ctx.fill();
  ctx.fillStyle = "brown";
  ctx.fillRect(110, 270, 40, 100);
}

function randomChristmasHexColor() {
  const colors = ["#F5624D", "#CC231E", "#34A65F", "#0F8A5F", "#235E6F"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomLightColor() {
  const colors = ["yellow", "white", "green", "red"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function updateLights() {
  if (lightsCoordinates.length === 0) {
    let x;
    let y;
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      y = randomNumberBetween(60, 280);
      x = randomNumberBetween(90, 190);
      lightsCoordinates.push({ x, y });
    }
  } else {
    lightsCoordinates.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.fillStyle = randomLightColor();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    });
  }
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Canvas utils
 */
const ongoingTouches = [];

function handleStart(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
  }
}

function handleMove(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      updateLights();
      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
    } else {
      console.error("can't figure out which touch to continue");
    }
  }
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1; // not found
}

/**
 * General utils
 */
function enableNotesToggle() {
  const collapseToggle = document.querySelector("#collapse-toggle");
  const collapsible = document.querySelector(".collapsible");

  collapseToggle.addEventListener("click", () => {
    collapsible.classList.toggle("is-not-collapsed");
  });
}

function enableResponsiveResizing(element) {
  window.addEventListener("resize", () => resize(element));
  resize(element);
}

function resize(element) {
  const newWidth = `${document.querySelector("html").clientWidth - 40}` + "px";
  const newHeight =
    `${document.querySelector("html").clientHeight - 150}` + "px";
  element.style.width = newWidth;
  element.style.height = newHeight;
}
