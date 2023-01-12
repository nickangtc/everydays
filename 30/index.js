let cells;
let cellsSlider;

function setup() {
  createCanvas(350, 350);
  frameRate(10);
  cellsSlider = createSlider(1, 12, 5, 1);

  // put things in the right place in the DOM
  const main = document.querySelector("main");
  const tilesLabel = createP("Tiles: ");
  cellsSlider.parent(tilesLabel);
  tilesLabel.parent(main);
}

function draw() {
  background("#00b4d8");
  cells = cellsSlider.value();
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      const cellW = width / cells;
      const cellH = height / cells;
      const x = i * cellW;
      const y = j * cellH;

      // cell content
      // quadrant circle on all four corners
      const tlc = { x, y };
      const trc = { x: x + cellW, y };
      const blc = { x, y: y + cellH };
      const brc = { x: x + cellW, y: y + cellH };

      // draw circle
      const circleSize = cellW;
      noFill();
      fill("#caf0f8");
      ellipse(tlc.x, tlc.y, circleSize, circleSize);
      ellipse(trc.x, trc.y, circleSize, circleSize);
      ellipse(blc.x, blc.y, circleSize, circleSize);
      ellipse(brc.x, brc.y, circleSize, circleSize);

      // draw square inside circle
      const squareSize = circleSize / 1.5;
      fill("#90e0ef");
      rect(
        tlc.x - squareSize / 2,
        tlc.y - squareSize / 2,
        squareSize,
        squareSize
      );
      rect(
        trc.x - squareSize / 2,
        trc.y - squareSize / 2,
        squareSize,
        squareSize
      );
      rect(
        blc.x - squareSize / 2,
        blc.y - squareSize / 2,
        squareSize,
        squareSize
      );
      rect(
        brc.x - squareSize / 2,
        brc.y - squareSize / 2,
        squareSize,
        squareSize
      );
    }
  }
}
