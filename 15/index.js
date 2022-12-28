let fr = 1;

const HEIGHT = 400;
const WIDTH = 400;

const BAR_WIDTH = 2;
const BAR_HEIGHT = 50;

function setup() {
  frameRate(fr);
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  clear();
  splash();
}

function splash() {
  const long = [6, 20];
  const medium = [3, 5];
  const short = [1, 3];
  const color = randomBasicColor();

  // concentrated splash
  for (let i = 0; i < 400; i++) {
    const x = map(randomGaussian(), -2, 2, 100, 130);
    const y = map(randomGaussian(), -2, 2, 100, 140);

    noStroke();
    fill(color);
    ellipse(x, y, randomNumBetween(...long), randomNumBetween(...long));
  }

  // spread-out splash around the concentrated splash
  for (let i = 0; i < 300; i++) {
    const x = map(randomGaussian(), -2, 2, 80, 150);
    const y = map(randomGaussian(), -2, 2, 80, 160);

    noStroke();
    fill(color);
    ellipse(x, y, randomNumBetween(...medium), randomNumBetween(...medium));
  }

  // very spread-out splash around the spread-out splash
  for (let i = 0; i < 700; i++) {
    const x = map(randomGaussian(), -2, 2, 60, 170);
    const y = map(randomGaussian(), -2, 2, 60, 200);

    noStroke();
    fill(color);
    ellipse(x, y, randomNumBetween(...short), randomNumBetween(...short));
  }
}

function randomNumBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomBasicColor() {
  const colors = ["red", "blue", "green", "orange", "purple", "black", "gray"];
  return colors[Math.floor(Math.random() * colors.length)];
}
