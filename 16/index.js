const FR = 20;
const HEIGHT = 400;
const WIDTH = 400;

const MEAN = 0;
const SD = 2;
const count = {};

function setup() {
  frameRate(FR);
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  const num = roundToOneDecimal(randomGaussian(MEAN, SD));
  count[num] = count[num] ? count[num] + 1 : 1;

  noStroke();
  fill("black");

  Object.keys(count).forEach((num) => {
    const xloc = map(num, -5, 5, 0, WIDTH);
    const yloc = HEIGHT / 2;

    rect(xloc, yloc, 2, -Math.abs(num * 20));
  });
}

function roundToOneDecimal(num) {
  return Math.round(num * 10) / 10;
}
