const FR = 30;
const HEIGHT = 400;
const WIDTH = 400;
const BAR_THICKNESS = 2;
const STEP = 10;
const MEAN = 0;
const SD = 2;
const dict = {};

function setup() {
  frameRate(FR);
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  const num = roundToOneDecimal(randomGaussian(MEAN, SD));
  dict[num] = dict[num] ? dict[num] + 1 : 1;

  noStroke();
  fill("black");

  Object.keys(dict).forEach((key) => {
    const xloc = map(key, -5, 5, 0, WIDTH);
    const yloc = HEIGHT;

    // x, y, width, height
    // key, fixed, fixed, value
    rect(xloc, yloc, BAR_THICKNESS, -dict[key] * STEP);
  });
}

function roundToOneDecimal(num) {
  return Math.round(num * 10) / 10;
}
