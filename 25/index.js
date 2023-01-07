let rows = 30;
let step;
let uprising = 0.01;

// I asked ChatGPT to give me 4 colours representing the palette
// of The Hunger Games.
const tributeGold = [248, 222, 126, 155];
const district12Ash = [166, 123, 91, 155];
const capitolCoral = [255, 111, 105, 155];
const muttBlack = [30, 30, 30, 155];
const colors = [district12Ash, muttBlack, capitolCoral];
let specialColor = tributeGold;

function setup() {
  createCanvas(350, 350);
  frameRate(10);
  step = width / rows;
}

function draw() {
  clear();
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const centerOfCell = createVector(x + step / 2, y + step / 2);
      const color = randomColorFromList();
      fill(color);
      noStroke();
      circle(centerOfCell.x, centerOfCell.y, step * 2);
    }
  }

  if (uprising < 1) {
    // tune this number to change the speed of the uprising
    uprising *= 1.07;
  } else {
    uprising = 0.01;
    // change the special color
    const randomIndex = floor(random() * colors.length);
    const oldSpecialColor = specialColor;
    const newSpecialColor = colors[randomIndex];
    colors.splice(randomIndex, 1);
    colors.push(oldSpecialColor);
    specialColor = newSpecialColor;
  }
}

function randomColorFromList() {
  if (random() < uprising) {
    return specialColor;
  }
  const randomIndex = floor(random() * colors.length);
  return colors[randomIndex];
}
