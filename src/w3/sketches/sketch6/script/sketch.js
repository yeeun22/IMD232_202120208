let pos = [];
let vel = [3, 5];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  pos[(width / 2, height / 2)];
}

function draw() {
  background('white');
  position.add(velocity);
  ellipse(position.x, position.y, 50);
  if (position.x < 0 || position.x > width) {
    velocity.x *= -1;
  }
  if (position.y < 0 || position.y > height) {
    velocity.y *= -1;
  }
}
