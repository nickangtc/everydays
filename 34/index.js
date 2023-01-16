const numDrops = 3;
const drips = [];

class Drip {
  constructor(x, y, startAngle, spread) {
    this.x = x;
    this.y = y;
    this.spread = spread;

    this.angle = startAngle;
    this.width = this.computeWidth();
  }

  computeWidth() {
    return map(sin(this.angle), -1, 1, 0, this.spread);
  }

  update() {
    const w = this.computeWidth();
    const alpha = map(w, 0, this.spread, 255, 0);

    fill(0, 0, 0, alpha);
    ellipse(this.x, this.y, w, w);

    this.angle += 0.02;
  }
}

function setup() {
  createCanvas(350, 350);
  frameRate(30);
  noStroke();

  for (let i = 1; i < numDrops + 1; i++) {
    const drip = new Drip(width / 2, height / 2, (HALF_PI * i) / 2, width);
    drips.push(drip);
  }
}

function draw() {
  clear();

  drips.forEach((drip) => {
    drip.update();
  });
}
