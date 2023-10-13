let bob;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);

  bob = new Bob(width / 2, height / 2, 50, 50);
}

function draw() {
  background(255);

  bob.display();
  bob.update();
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
