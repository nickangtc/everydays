let xoff = 0;
let yoff = 1000;
let x;
let y;
let radius = 10;

function setup() {
  frameRate(30);
  createCanvas(400, 400);
}

function draw() {
  noStroke();
  fill(0);
  ellipse(x, y, radius);

  x = map(noise(xoff), 0, 1, 0, width);
  y = map(noise(yoff), 0, 1, 0, height);

  xoff += 0.015;
  yoff -= 0.015;

  radius -= 0.03;
}
