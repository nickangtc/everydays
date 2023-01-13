let img;
let rWeightSlider;
let gWeightSlider;
let bWeightSlider;

// thank you https://play.ertdfgcvb.xyz/ for the density string!
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

function preload() {
  img = loadImage("./guy-profile-90x90.jpg");
}

function setup() {
  noCanvas();
  frameRate(2);

  rWeightSlider = createSlider(0, 1, 0.2126, 0.0001);
  gWeightSlider = createSlider(0, 1, 0.7152, 0.0001);
  bWeightSlider = createSlider(0, 1, 0.0722, 0.0001);

  // put things in the right place in the DOM
  const sliders = document.querySelector("#sliders");

  const rLabel = createP("Weight of reds: ");
  rWeightSlider.parent(rLabel);

  const gLabel = createP("Weight of greens: ");
  gWeightSlider.parent(gLabel);

  const bLabel = createP("Weight of blues: ");
  bWeightSlider.parent(bLabel);

  rLabel.parent(sliders);
  gLabel.parent(sliders);
  bLabel.parent(sliders);
}

function draw() {
  img.loadPixels();

  let asciiTextImage = "";

  for (let i = 0; i < img.height * 4; i += 4) {
    let row = "";
    for (let j = 0; j < img.width * 4; j += 4) {
      // store rgb in variables
      let r = img.pixels[i * img.height + j];
      let g = img.pixels[i * img.height + j + 1];
      let b = img.pixels[i * img.height + j + 2];

      // calculate weighted luminance
      let luminance =
        rWeightSlider.value() * r +
        gWeightSlider.value() * g +
        bWeightSlider.value() * b;
      let pixelChar = density.charAt(
        floor(map(luminance, 0, 255, 0, density.length))
      );

      if (pixelChar === " ") {
        pixelChar = "&nbsp;";
      }
      row += pixelChar;
    }
    asciiTextImage += row + "<br>";
  }

  document.querySelector("main").innerHTML = asciiTextImage;
}
