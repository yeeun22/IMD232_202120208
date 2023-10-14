let mover;
let gravity;
let wind;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  mover = new Mover(width / 2, height / 2, 25);
  gravity = createVector(0, 0.5);
  // wind = createVector(0.5, 0);
}

function draw() {
  background(255);

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(mover.mass);

  mover.applyForce(gravityA);
  // // 바람
  // if (mouseIsPressed && isMouseInsideCanvas()) {
  //   mover.applyForce(wind);
  // }
  mover.display();
  // mover.displayVector();
  if (mover.contactEdge()) {
    let c = 0.3;
    // let friction = createVector(mover.vel.x, mover.vel.y);
    let friction = mover.vel.copy();
    friction.mult(-1);
    friction.mult(c);
    mover.applyForce(friction);
  }
  mover.update();
  mover.checkEdges();
}

function mouseMoved() {
  mover.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  mover.mousePressed(mouseX, mouseY);
}
function mouseDragged() {
  mover.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  mover.mouseReleased(mouseX, mouseY);
}
