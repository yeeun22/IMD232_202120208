let x;
let y;
let velocityX = 3;
let velocityY = -3;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background('white');
  // 속도 개념
  x += velocityX;
  y += velocityY;
  ellipse(x, y, 50);

  // if (x < 0) {
  //   velocityX *= -1;
  // } else if (x > width) {
  //   velocityX *= -1;
  // }
  // if (y < 0) {
  //   velocityY *= -1;
  // } else if (y > height) {
  //   velocityY *= -1;
  // }

  if (x < 0 || x > width) {
    velocityX *= -1;
  }
  if (y < 0 || y > height) {
    velocityY *= -1;
  }
}
