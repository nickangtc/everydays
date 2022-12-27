FRAMERATE = 10;

HEIGHT = 400;
WIDTH = 400;

BAR_WIDTH = 2;
BAR_HEIGHT = 50;

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  frameRate(FRAMERATE);

  for (let i = 0; i < 20; i++) {
    const randomlyGeneratedGaussianNumber = randomGaussian();
    const x = map(randomlyGeneratedGaussianNumber, -4, 4, 0, WIDTH);
    const y = (i * HEIGHT) / 25;

    noStroke();
    fill("#0000001A");
    rect(x, y, BAR_WIDTH, BAR_HEIGHT);
  }
}
