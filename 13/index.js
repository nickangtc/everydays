// addEventListener("DOMContentLoaded", start);

// function start() {
//   // ... code
// }

/**
 * Everything below this depends on p5.js to work.
 */

const canvasW = 300;
const canvasH = 300;

class Walker {
  constructor() {
    this.x = 150;
    this.y = 150;
    this.gait = 1;
    this.circleRadius = 2;

    this.tx = 0;
    this.ty = 10000;
  }

  display() {
    fill("black");
    circle(this.x, this.y, this.circleRadius);
  }

  move() {
    const moveTowardMouse = random() < 0.7 ? true : false;

    const biasedDirectionX = mouseX - this.x;
    const biasedDirectionY = mouseY - this.y;

    let newX = this.x;
    let newY = this.y;

    if (moveTowardMouse && biasedDirectionX < 0) {
      // left
      newX = map(noise(this.tx), 0, 1, 0, canvasW / 2);
    } else if (moveTowardMouse && biasedDirectionX > 0) {
      // right
      newX = map(noise(this.tx), 0, 1, canvasW / 2, canvasW);
    } else {
      // let nature take its course
      newX = map(noise(this.tx), 0, 1, 0, canvasW);
    }

    if (moveTowardMouse && biasedDirectionY < 0) {
      // up
      newY = map(noise(this.ty), 0, 1, 0, canvasH / 2);
    } else if (moveTowardMouse && biasedDirectionY > 0) {
      // down
      newY = map(noise(this.ty), 0, 1, canvasH / 2, canvasH);
    } else {
      newY = map(noise(this.tx), 0, 1, 0, canvasH);
    }

    this.x = newX;
    this.y = newY;
    this.tx += 1;
    this.ty -= 1;
  }
}

const walker = new Walker();

function setup() {
  createCanvas(canvasW, canvasH);
  frameRate(30);
}

function draw() {
  // clear();
  walker.move();
  walker.display();
}
