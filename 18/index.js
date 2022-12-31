const fr = 10;
const step = 0.007;
const zStep = 0.03;

function setup() {
  createCanvas(400, 400);
}

let zoff = 0;

function draw() {
  frameRate(fr);
  // background("#87ceeb");
  loadPixels();

  let xoff = 0;
  for (let y = 0; y < height; y++) {
    xoff += step;
    let yoff = 0;
    for (let x = 0; x < width; x++) {
      yoff += step;
      noiseDetail(5, 0.75);
      const brightness = noise(xoff, yoff, zoff) * 255;
      set(x, y, color(135, 206, 250, brightness));
    }
  }
  zoff += zStep;

  updatePixels();
}
