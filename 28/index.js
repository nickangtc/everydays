let song;
let volumeSlider;
let rateSlider;
let panSlider;

function preload() {
  song = loadSound("./JsoundLAB-Abstract-Atmospheric-Loop.mp3");
}

function setup() {
  createCanvas(100, 100);
  background(0);
  // TODO add text here? show song name?
  song.loop();

  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  rateSlider = createSlider(0.5, 2, 1, 0.01);
  panSlider = createSlider(-1, 1, 0, 0.01);

  // put things in the right place in the DOM
  const main = document.querySelector("main");

  const volumeLabel = createP("Volume: ");
  volumeSlider.parent(volumeLabel);

  const rateLabel = createP("Rate: ");
  rateSlider.parent(rateLabel);

  const panLabel = createP("Pan (left/right ear): ");
  panSlider.parent(panLabel);

  volumeLabel.parent(main);
  rateLabel.parent(main);
  panLabel.parent(main);
}

function draw() {
  song.setVolume(volumeSlider.value());
  song.rate(rateSlider.value());
  song.pan(panSlider.value());
}
