function setup() {
  frameRate(30);
  createCanvas(400, 400);
}

function draw() {
  noFill();
  strokeWeight(0.1);
  stroke(0);
  let anchorPointsHeight = map(randomGaussian(), -2, 2, 0, height);
  let controlPointsHeight = map(randomGaussian(0, 2), -2, 2, 0, height);
  bezier(
    0,
    anchorPointsHeight,
    random(150, 200),
    400 - controlPointsHeight,
    random(250, 300),
    controlPointsHeight,
    width,
    anchorPointsHeight
  );
  rotate(PI / 2);
}
