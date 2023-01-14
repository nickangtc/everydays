const rows = 6;
const cells = rows * rows;

let walker;
let walkerIndex = 0;
let cellBoundaries;

function gridCellBoundaries(width, height) {
  const cb = [];
  for (let y = 0; y < height; y += height / rows) {
    for (let x = 0; x < width; x += width / rows) {
      cb.push({
        x1: x,
        x2: x + width / rows,
        y1: y,
        y2: y + height / rows,
      });
    }
  }
  return cb;
}

class PerlinWalker {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.tx = random(100, 1000);
    this.ty = random(10000, 20000);
    this.ts = 10;
  }

  move() {
    this.x = map(noise(this.tx), 0, 1, this.x1, this.x2);
    this.y = map(noise(this.ty), 0, 1, this.y1, this.y2);
    this.tx += 0.03;
    this.ty -= 0.032;
  }

  display() {
    const minWeight = 1.5;
    const maxWeight = 5;
    const weight = map(noise(this.ts), 0, 1, minWeight, maxWeight);

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

  cellBoundaries = gridCellBoundaries(width, height);
  console.log("cellBoundaries:", cellBoundaries);

  walker = new PerlinWalker(
    cellBoundaries[walkerIndex].x1,
    cellBoundaries[walkerIndex].y1,
    cellBoundaries[walkerIndex].x2,
    cellBoundaries[walkerIndex].y2
  );
}

function draw() {
  if (frameCount % 80 === 0) {
    console.log("end of walker", walkerIndex);
    walker = null;
    walkerIndex++;
  }

  if (walkerIndex >= cells) {
    noLoop();
    return;
  }

  if (!walker) {
    walker = new PerlinWalker(
      cellBoundaries[walkerIndex].x1,
      cellBoundaries[walkerIndex].y1,
      cellBoundaries[walkerIndex].x2,
      cellBoundaries[walkerIndex].y2
    );
  }
  walker.move();
  walker.display();
}
