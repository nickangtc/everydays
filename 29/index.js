const colors = [
  "#F2F2F2",
  "#E6E6E6",
  "#CCCCCC",
  "#999999",
  "#666666",
  "#333333",
];

function setup() {
  createCanvas(350, 350);
  noLoop();
  rectMode(CENTER);
  angleMode(DEGREES);
  blendMode(DIFFERENCE);
}

function draw() {
  noStroke();

  for (let i = 0; i < 10; i++) {
    const x = i * 40;
    const y = i * 20;
    const rectW = random(20, 40);
    const rectH = random(30, 80);
    const color = random(colors);

    push();
    translate(width / 4, 0);
    rotate(i * 4);
    fill(color);
    if (random() < 0.3) {
      circle(x, y, rectW * 1.5);
    } else {
      rect(x, y, rectW, rectH);
    }
    pop();
  }

  fill(random(colors));
  // let it by a rare chance touch some of the shapes
  ellipse(0, height, random(width * 0.8, width * 1.8));
}
