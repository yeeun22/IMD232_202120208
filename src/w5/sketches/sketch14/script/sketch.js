let gravity;
let bob;
let spring;
function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);

  gravity = createVector(0, 0.5);
  bob = new Bob(width / 2, height / 2, 50, 50);
  spring = new Spring(width / 2, 10, height / 2, 0.5);
}

function draw() {
  background(255);
  if (bob.isDragging == false) {
    spring.spring(bob);
    const gravityAsForce = p5.Vector.mult(gravity, bob.mass);
    bob.applyForce(gravityAsForce);
    bob.update();
  }
  bob.display();
  spring.display(bob);
}

function mouseMoved() {
  bob.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  bob.mousePressed(mouseX, mouseY);
}
function mouseDragged() {
  bob.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  bob.mouseReleased(mouseX, mouseY);
}
