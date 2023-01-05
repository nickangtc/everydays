class Parameter {
  constructor(value) {
    this.value = value;
  }
}

const fr = 5;
let preloadedImg;
let barBlendModes;
let wholePictureBlendModes;
let probabilityToGlitch = new Parameter();
let shiftMin = new Parameter();
let shiftMax = new Parameter();

function getVariableNameAsStringHack(nameObject) {
  for (let varName in nameObject) {
    return varName;
  }
}

function slider(parameter, label, defaultValue, min, max, step) {
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = min;
  slider.max = max;
  slider.step = step;
  slider.value = defaultValue;
  slider.id = label;

  const sliderLabel = document.createElement("label");
  sliderLabel.textContent = label;
  sliderLabel.htmlFor = label;

  const sliderDebugText = document.createElement("span");
  sliderDebugText.id = `${label}DebugText`;
  sliderDebugText.textContent = defaultValue;

  const sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider-container");
  sliderContainer.appendChild(sliderLabel);
  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(sliderDebugText);

  const debugView = document.querySelector("#debugView");
  debugView.appendChild(sliderContainer);

  parameter.value = defaultValue;

  slider.addEventListener("input", (event) => {
    parameter.value = event.target.value;
    sliderDebugText.textContent = event.target.value;
  });

  return defaultValue;
}

function setup() {
  createCanvas(400, 400);
  frameRate(fr);
  image(preloadedImg, 0, 0, 400, 400, 0, 0, 400, 400, COVER);
  barBlendModes = [BLEND, BLEND, BLEND, OVERLAY];
  wholePictureBlendModes = [LIGHTEST, SOFT_LIGHT, OVERLAY];

  slider(probabilityToGlitch, "probabilityToGlitch", 0.05, 0, 0.5, 0.001);
  slider(shiftMin, "shift minimum", 3, 0, 5, 1);
  slider(shiftMax, "shift maximum", 10, 6, 30, 1);
}

function preload() {
  loadImage("./futuristic-world-stable-diffusion.jpeg", (img) => {
    preloadedImg = img;
  });
}

function draw() {
  clear();
  image(preloadedImg, 0, 0, 400, 400, 0, 0, 400, 400, COVER);

  const shouldGlitchImage = random(0, 1.0) < probabilityToGlitch.value * 20;
  if (shouldGlitchImage) {
    const shiftDirection = random(0, 1.0) < 0.5 ? -1 : 1;
    const shiftX = random(shiftMin.value, shiftMax.value);
    const shiftY = random(shiftMin.value, shiftMax.value);
    blendMode(random(wholePictureBlendModes));
    image(preloadedImg, shiftX * shiftDirection, shiftY * shiftDirection);
  }

  for (let y = 0; y < height; y++) {
    const shouldGlitchRow = random(0, 1.0) < probabilityToGlitch.value;
    if (!shouldGlitchRow) continue;

    const shiftDirection = random(0, 1.0) < 0.5 ? -1 : 1;
    const shiftHeight = random(1, 10);
    const shift = random(2, 20);
    const rowAsImage = preloadedImg.get(0, y, width, shiftHeight);
    blendMode(random(barBlendModes));
    image(rowAsImage, shift * shiftDirection, y);
  }
}
