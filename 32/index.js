let walker;

class PerlinWalker {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tx = random(100, 1000);
    this.ty = random(10000, 20000);
    // stroke weight
    // if the same starting weight, will be deterministic of when stroke stops
    this.ts = random([10, 30, 500]);
    this.end = false;
  }

  move() {
    this.x = map(noise(this.tx), 0, 1, 0, this.w);
    this.y = map(noise(this.ty), 0, 1, 0, this.h);
    this.tx += 0.007;
    this.ty -= 0.005;
  }

  display() {
    const minWeight = 1.5;
    const maxWeight = 5;
    const weight = map(noise(this.ts), 0, 1, minWeight, maxWeight);

    // small weight looks like a small dot, a good way to end a stroke
    if (weight < minWeight + 1.2) {
      this.end = true;
      return;
    }

    stroke("#000");
    strokeWeight(weight);
    point(this.x, this.y);

    this.ts += 0.011;
  }

  reachedEnd() {
    return this.end;
  }
}

function setup() {
  background(0);
  createCanvas(350, 350);
  frameRate(30);
  walker = new PerlinWalker(width / 2, height / 2, width, height);
}

function draw() {
  if (walker.reachedEnd()) {
    walker = null;
  }

  if (!walker) {
    walker = new PerlinWalker(10, 100, width, height);
  }

  walker.move();
  walker.display();
}
