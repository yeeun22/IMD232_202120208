// let x;
// let y;
let position;
// let velocityX = 3;
// let velocityY = -3;
let velocity;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  // x = width / 2;
  // y = height / 2;
  // 캔버스가 생성된 후 width,height가 생김 + createVector는 set up 밑에서만 가능
  position = createVector(width / 2, height / 2);
  velocity = createVector(3, 5);
}

function draw() {
  background('white');

  // x += velocityX;
  // y += velocityY;
  position.add(velocity);
  ellipse(position.x, position.y, 50);
  if (position.x < 0 || position.x > width) {
    velocity.x *= -1;
  }
  if (position.y < 0 || position.y > height) {
    velocity.y *= -1;
  }
}
