const fr = 40;
const numOfBalls = 30;

const balls = [];

function setup() {
  createCanvas(400, 400);
  frameRate(fr);
  generateBalls();
}

function draw() {
  clear();
  background("black");
  displayBalls();
}

function generateBalls() {
  for (let i = 0; i < numOfBalls; i++) {
    // make sure balls don't start on edge otherwise they vibrate and look weird
    balls.push({
      x: random(5, width - 5),
      y: random(5, height - 5),
      r: random(7, 11),
      c: randomColorArray(),
      xspeed: randomSpeed(),
      yspeed: randomSpeed(),
      trail: [],
    });
  }
}

function displayBalls() {
  balls.forEach((ball) => {
    ball.trail.unshift({ x: ball.x, y: ball.y });
    if (ball.trail.length > 8) {
      ball.trail.pop();
    }

    ball.x += ball.xspeed;
    ball.y += ball.yspeed;

    // bounce off walls
    if (ball.x > width - ball.r || ball.x < ball.r) {
      ball.xspeed *= -1;
    }
    if (ball.y > height - ball.r || ball.y < ball.r) {
      ball.yspeed *= -1;
    }

    displayTrail(ball);
  });
}

function displayTrail(ball) {
  ball.trail.forEach((t, i) => {
    // draw trail first
    strokeWeight(ball.r);
    stroke(color(...ball.c, 80 - i * 10));
    fill(color(...ball.c, 80 - i * 10));
    ellipse(t.x, t.y, (ball.r - i) * 2);

    // draw ball on top
    strokeWeight(ball.r / 2);
    stroke(color(...ball.c));
    fill("white");
    ellipse(ball.x, ball.y, ball.r * 2);
  });
}

function randomColorArray() {
  return random([
    [42, 157, 143],
    [233, 196, 106],
    [244, 162, 97],
    [231, 111, 81],
  ]);
}

function randomSpeed() {
  const flip = random([0, 1]);
  return flip ? random([3, 5]) : random([-3, -5]);
}
