let preloadedImg;
let pixd;
let barBlendModes;
let wholePictureBlendModes;
const probabilityToGlitch = 0.005;

function setup() {
  frameRate(10);
  createCanvas(400, 400);
  image(preloadedImg, 0, 0, 400, 400, 0, 0, 400, 400, COVER);
  pixd = pixelDensity();
  barBlendModes = [BLEND, BURN, OVERLAY];
  wholePictureBlendModes = [LIGHTEST, SOFT_LIGHT, OVERLAY];
}

function preload() {
  loadImage("./aiony-haust-3TLl_97HNJo-unsplash.jpg", (img) => {
    preloadedImg = img;
  });
}

function draw() {
  clear();
  image(preloadedImg, 0, 0, 400, 400, 0, 0, 400, 400, COVER);

  // very low probability whole image shift and overlay to create a glitch effect
  const shouldGlitchImage = random(0, 1.0) < probabilityToGlitch * 20;
  if (shouldGlitchImage) {
    const shiftDirection = random(0, 1.0) < 0.5 ? -1 : 1;
    const shiftX = random(3, 10);
    const shiftY = random(3, 10);
    blendMode(random(wholePictureBlendModes));
    image(preloadedImg, shiftX * shiftDirection, shiftY * shiftDirection);
  }

  for (let y = 0; y < height; y++) {
    const shouldGlitchRow = random(0, 1.0) < probabilityToGlitch;
    if (!shouldGlitchRow) continue;

    const shiftDirection = random(0, 1.0) < 0.5 ? -1 : 1;
    const shiftHeight = random(1, 10);
    const shift = random(2, 20);
    const rowAsImage = preloadedImg.get(0, y, width, shiftHeight);
    blendMode(random(barBlendModes));
    image(rowAsImage, shift * shiftDirection, y);
  }
}
