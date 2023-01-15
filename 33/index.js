const circleCount = 20;

let angle = 0;

function setup() {
  createCanvas(320, 320);
  frameRate(30);
}

function draw() {
  clear();

  for (let i = 0; i < circleCount + 1; i++) {
    const x = (width / circleCount) * i;
    const d = map(sin(angle + i / 10), -1, 1, 0, 10);

    for (let j = 1; j < 4 * PI; j++) {
      const y = map(sin(angle + i / 10 + j), -1, 1, 0, height);
      fill("#000");
      ellipse(x, y, d, d);
    }
  }
  angle += 0.02;
}
