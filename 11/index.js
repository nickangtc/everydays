addEventListener("DOMContentLoaded", start);

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.tx = 0;
    this.ty = 10000;
    this.historyLength = 30;
    this.hx = [];
    this.hy = [];
  }

  move() {
    // stretch noise value (0, 1) to (0, width or height) to cover canvas
    this.x = map(noise(this.tx), 0, 1, 0, width);
    this.y = map(noise(this.ty), 0, 1, 0, height);
    this.tx += 0.008;
    this.ty += 0.008;
    this.record();
  }

  display() {
    const circleRadius = 6;
    fill("black");
    circle(this.x, this.y, circleRadius);
    for (let i = 0; i < this.historyLength; i++) {
      point(this.hx[i], this.hy[i]);
    }
  }

  record() {
    this.hx.push(this.x);
    this.hy.push(this.y);
    if (this.hx.length > this.historyLength) {
      this.hx.shift();
      this.hy.shift();
    }
  }
}

const width = 600;
const height = 600;
const walker = new Walker();

function start() {
  enableNotesToggle();
  // ... other code
}

/**
 * p5.js
 */
function setup() {
  createCanvas(width, height);
  background(255);
}

function draw() {
  clear();
  walker.move();
  walker.display();
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
