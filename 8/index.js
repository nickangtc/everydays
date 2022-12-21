addEventListener("DOMContentLoaded", start);

let canvas;
let ctx;

function start() {
  enableNotesToggle();

  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  drawGuidingCircles();
  canvas.addEventListener("touchstart", handleTouchStart);
}

function drawGuidingCircles() {
  ctx.beginPath();
  ctx.arc(175, 100, 20, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(120, 200, 20, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(230, 300, 20, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

// handles multiple simultaneous touches on mobile
function handleTouchStart(ev) {
  ev.preventDefault();

  const { touches } = ev;
  for (let i = 0; i < touches.length; i++) {
    const touch = touches.item(i);
    const [pageX, pageY] = [touch.pageX, touch.pageY];
    const [canvasX, canvasY] = getCanvasCoordinates(pageX, pageY);
    new Radical(canvasX, canvasY);
  }
}

class Radical {
  constructor(x, y) {
    this.ogX = x;
    this.ogY = y;
    this.x = x;
    this.y = y;
    this.radius = randomNum(3, 8);
    this.color = "black";
    this.isSuperRadical = false;
    this.draw();
    this.interval = setInterval(() => this.redraw(), 200);
  }

  redraw() {
    this.erase();
    const [x, y] = this.nextCoord();
    this.draw(x, y);
    this.x = x;
    this.y = y;

    // upgrade to super radical if far from original position
    this.checkSuperRadical();
  }

  checkSuperRadical() {
    const xDiff = Math.abs(this.x - this.ogX);
    const yDiff = Math.abs(this.y - this.ogY);
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    if (distance >= 15) {
      this.makeSuperRadical();
    } else if (this.isSuperRadical && distance < 15) {
      this.makeNormal();
    }
  }

  makeSuperRadical() {
    if (this.isSuperRadical) return;
    clearInterval(this.interval);
    this.interval = setInterval(() => this.redraw(), 50);
    this.color = randomColor();
    this.isSuperRadical = true;
  }

  makeNormal() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.redraw(), 300);
    this.color = "black";
    this.isSuperRadical = false;
  }

  nextCoord() {
    return [this.x + randomNum(-1, 1), this.y + randomNum(-1, 1)];
  }

  erase() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
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
