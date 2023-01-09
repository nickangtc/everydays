// code copied from https://openprocessing.org/sketch/1787506
// I only made minor modifications so I can learn how it works

let colors = [
  "#fab14a",
  "#1c3aa1",
  "#2c6a43",
  "#f70640",
  "#f78e2c",
  "#fdd903",
  "#cae509",
  "#63be93",
  "#81cfe5",
  "#299dbf",
  "#a4459f",
  "#f654a9",
  "#f0f6f8",
];

function setup() {
  createCanvas(350, 350);
  background(0);
  drawFlower(width * 0.5, height * 0.5, width * 0.4);
  frameRate(1);
  // noLoop();
}

function draw() {
  clear();
  background(0);
  drawFlower(width * 0.5, height * 0.5, width * 0.4);
}

function drawFlower(x, y, s) {
  let ang = random(TAU);
  let num = int(random(8, 15));
  let len = s * 0.3;
  let aa = TAU / num;

  push();
  translate(x, y);
  rotate(ang);
  // petal color
  fill(random(colors));

  for (let i = 0; i < TAU; i += aa) {
    let theta = aa * 0.5;
    let px1 = len * cos(theta);
    let py1 = len * sin(theta);
    let px2 = len * cos(-theta);
    let py2 = len * sin(-theta);
    let str = random(1.8, 2.2);
    strokeWeight(random(0.5, 1.5));
    rotate(aa);
    beginShape();
    vertex(0, 0);
    vertex(px1, py1);
    bezierVertex(px1 * str, py1 * str, px2 * str, py2 * str, px2, py2);
    vertex(0, 0);
    endShape();
  }

  // center of flower
  let ss = s * 0.3;
  strokeWeight(random(0.5, 1.5));
  fill(random(colors));
  ellipse(0, 0, ss, ss);
  pop();
}
