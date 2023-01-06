addEventListener("DOMContentLoaded", doThingsWithDOM);

let cells = 10;
let step;
let showGrid = false;
let revealControls = false;
let leftToRightProbability = 0.5;

function setParametersFromURL() {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const userCellsVal = parseFloat(searchParams.get("cells"));
    const userLeftToRightVal = parseFloat(searchParams.get("leftToRight"));

    cells = userCellsVal >= 0 ? userCellsVal : cells;
    leftToRightProbability =
      userLeftToRightVal >= 0 ? userLeftToRightVal : leftToRightProbability;
  } catch (err) {
    console.error(
      "Something unexpected happened while parsing URL params. Ignoring URL params."
    );
  }
}

function setup() {
  setParametersFromURL();
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  clear();
  step = width / cells;

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const leftToRight = random() < leftToRightProbability;

      if (leftToRight) {
        line(x, y, x + step, y + step);
      } else {
        line(x + step, y, x, y + step);
      }

      // draw grid if toggled by user
      if (showGrid) {
        stroke(255, 0, 0);
        noFill();
        rect(x, y, step, step);
        stroke(0);
      }
    }
  }
}

/**
 * Non-p5, DOM related functions.
 */
function doThingsWithDOM() {
  const toggleGridButton = document.querySelector("#toggleGrid");
  toggleGridButton.addEventListener("click", toggleGrid);
}

function toggleGrid() {
  showGrid = !showGrid;
  redraw();
}
