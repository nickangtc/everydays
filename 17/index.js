const fr = 1;
const step = 0.01;

function setup() {
  createCanvas(400, 400);
}

/**
 * one thing I'm still unsure of is why this doesn't get refreshed
 * i guess it's because the `noise` function is deterministic
 * so every run of `draw` just uses the same values it gives
 */
function draw() {
  frameRate(fr);

  loadPixels();

  let xoff = 0;
  for (let y = 0; y < height; y++) {
    xoff += step;
    let yoff = 0;
    for (let x = 0; x < width; x++) {
      yoff += step;
      const brightness = noise(xoff, yoff) * 255;
      set(x, y, brightness);
    }
  }

  updatePixels();
}
