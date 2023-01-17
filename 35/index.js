let rows;
let rowsSlider;

function setup() {
  createCanvas(320, 320);
  frameRate(5);

  rowsSlider = createSlider(2, 20, 3, 1);

  // put things in the right place in the DOM
  const main = document.querySelector("main");
  const rowsLabel = createP("Rows: ");
  rowsSlider.parent(rowsLabel);
  rowsLabel.parent(main);
}

function draw() {
  rows = rowsSlider.value();
  drawGrid(0, 0, width);
}

function drawGrid(x, y, w) {
  for (let i = y; i < w; i += w / rows) {
    for (let j = x; j < w; j += w / rows) {
      square(i, j, w / rows);

      if (w > 50) {
        drawGrid(i, j, w / rows);
      }
    }
  }
}
