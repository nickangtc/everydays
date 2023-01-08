class Walker {
  constructor() {
    this.x = random([0, width]);
    this.y = random([0, height]);
    this.tx = random(0, 100);
    this.ty = random(1, 100100);
    this.historyLength = 30;
    this.hx = [];
    this.hy = [];
  }

  move() {
    // stretch noise value (0, 1) to (0, width or height) to cover canvas
    this.x = map(noise(this.tx), 0, 1, 0, width);
    this.y = map(noise(this.ty), 0, 1, 0, height);
    this.tx += 0.008;
    this.ty -= 0.008;
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

/**
 * p5.js
 */
const walkers = [];
let bgBrightness = 255;

function setup() {
  walkers.push(new Walker());
  createCanvas(400, 400);
  background(255);
}

function draw() {
  clear();
  background(bgBrightness);

  if (frameCount % 40 === 0) {
    walkers.push(new Walker());
  }

  walkers.forEach((walker) => {
    walker.move();
    walker.display();
  });

  bgBrightness -= 0.1;
  if (bgBrightness <= 0) {
    noLoop();
  }
}
