addEventListener("DOMContentLoaded", start);

let canvas;
let ctx;

function start() {
  enableNotesToggle();

  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  canvas.addEventListener("touchstart", handleTouchStart);
}

// handles multiple simultaneous touches on mobile
function handleTouchStart(ev) {
  ev.preventDefault();

  const { touches } = ev;
  for (let i = 0; i < touches.length; i++) {
    const touch = touches.item(i);
    const [pageX, pageY] = [touch.pageX, touch.pageY];
    const [canvasX, canvasY] = getCanvasCoordinates(pageX, pageY);
    drawCircle(canvasX, canvasY);
    drawBleed(canvasX, canvasY);
  }
}

function drawCircle(x, y) {
  const radius = randomNum(4, 7);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(x, y, radius * 2.5, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawBleed(x, y) {
  const bottomY = canvas.height;

  const color = randomColor();
  const radius = randomNum(2, 4);
  let currentY = y;
  const interval = setInterval(() => {
    currentY += 2;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, currentY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    if (currentY >= bottomY) {
      clearInterval(interval);
      console.log("stopped drawing bleed");
    }
  }, randomNum(80, 200));
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  const colors = ["#F5624D", "#CC231E", "#34A65F", "#0F8A5F", "#235E6F"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getCanvasCoordinates(touchPageX, touchPageY) {
  const canvasRect = canvas.getBoundingClientRect();
  const canvasX = touchPageX - canvasRect.left - window.scrollX;
  const canvasY = touchPageY - canvasRect.top - window.scrollY;
  return [canvasX, canvasY];
}

/**
 * Utils
 */
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
