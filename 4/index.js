addEventListener("DOMContentLoaded", start);

class Rocket {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.backgroundColor = "black";
  }

  draw() {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// assume there will only be one rocket
let rocket;
let canvas;
let ctx;

function start() {
  enableNotesToggle();
  initCanvas();
  registerKeyPresses();
  // window.addEventListener("resize", resizeCanvas, false);
}

function registerKeyPresses() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        rocket.y -= 10;
        break;
      case "ArrowDown":
        rocket.y += 10;
        break;
      case "ArrowLeft":
        rocket.x -= 10;
        break;
      case "ArrowRight":
        rocket.x += 10;
        break;
      default:
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rocket.draw();
  });
}

function initCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  [width, height] = resizeCanvas();
  // TODO: use width height to centralise rocket
  rocket = new Rocket(100, 100, 30, 30);
  rocket.draw();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return [window.innerWidth, window.innerHeight];
}

function enableNotesToggle() {
  const collapseToggle = document.querySelector("#collapse-toggle");
  const collapsible = document.querySelector(".collapsible");

  collapseToggle.addEventListener("click", () => {
    collapsible.classList.toggle("is-not-collapsed");
  });
}
