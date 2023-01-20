/**
 * Coded partially by ChatGPT
 */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let dotX = 160; // starting x position of dot
let dotY = 160; // starting y position of dot
let dotRadius = 5; // starting radius of dot
let dotGrowing = true; // flag to track if dot is growing or shrinking

function animate() {
  // clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw dot
  context.beginPath();
  context.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
  context.fillStyle = "black";
  context.fill();

  // update dot size
  if (dotGrowing) {
    dotRadius += 1;
    if (dotRadius >= 50) {
      dotGrowing = false;
      canvas.style.backgroundColor = "red";
    }
  } else {
    dotRadius -= 1;
    if (dotRadius <= 5) {
      dotGrowing = true;
      canvas.style.backgroundColor = "white";
    }
  }

  // get random numer between -1 and 1
  const xMove = Math.random() * 2 - 1;
  const yMove = Math.random() * 2 - 1;

  // move dot
  dotX += xMove;
  dotY += yMove;

  // animate dot
  requestAnimationFrame(animate);
}

animate();
