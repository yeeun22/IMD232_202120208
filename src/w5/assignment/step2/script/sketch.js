let pendA;
let pendB;
let gravity;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  // (중심축 x, 중심축 y, rad(큰 원의 반지름 : 길이), angle, ballRad)
  pendA = new Pendulum(width / 2, 10, height / 3, (TAU / 360) * 45, 20);
  pendB = new Pendulum(0, 0, height / 3, (TAU / 360) * 30, 20);
  gravity = createVector(0, 0.4);

  background(255);
}

function draw() {
  background(255);

  pendA.applyForce(gravity);
  pendA.update();
  pendA.display();

  push();
  translate(pendA.ballPos.x, pendA.ballPos.y);
  pendB.applyForce(gravity);
  pendB.update();
  pendB.display();
  pop(CLOSE);
}

function mouseMoved() {
  pendA.mouseMoved(mouseX, mouseY);
  pendB.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  pendA.mousePressed(mouseX, mouseY);
  pendB.mousePressed(mouseX, mouseY);
}
function mouseDragged() {
  pendA.mouseDragged(mouseX, mouseY);
  pendB.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  pendA.mouseReleased();
  pendB.mouseReleased();
}
