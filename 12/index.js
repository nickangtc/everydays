addEventListener("DOMContentLoaded", start);

let canvas;
let ctx;

function start() {
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
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawBleed(x, y) {
  const bottomY = canvas.height;

  const color = randomColor();
  const radius = randomNum(2, 4);
  const delay = randomNum(10, 50);
  const step = 1;
  let currentY = y;
  // const delay = 10;
  const interval = setInterval(() => {
    currentY += step;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, currentY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    if (currentY >= bottomY) {
      clearInterval(interval);
      console.log("stopped drawing bleed");
      drawAccumulation(color, delay, step);
    }
  }, delay);
}

function drawAccumulation(color, delay, step) {
  console.log("started drawing accumulation");
  const fullHeight = canvas.height;
  const arbitraryLongerDelay = delay * 3;
  const alpha = "20";
  let y = fullHeight;

  const interval = setInterval(() => {
    ctx.beginPath();
    ctx.fillStyle = color + alpha;
    ctx.fillRect(0, y, canvas.width, step);
    ctx.closePath();
    if (y <= 0) {
      clearInterval(interval);
      console.log("stopped drawing accumulation");
    }
    y -= step;
  }, arbitraryLongerDelay);
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
