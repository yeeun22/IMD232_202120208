let moverA;
let moverB;
let gravity;
let wind;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  moverA = new MoverWithMass(width / 3, height / 2, 5);
  moverB = new MoverWithMass((2 * width) / 3, height / 2, 1);
  gravity = createVector(0, 0.1);
  wind = createVector(0.5, 0);
}

function draw() {
  background(255);
  moverA.applyForce(gravity);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverA.applyForce(wind);
  }
  moverA.display();
  moverA.displayVector();
  moverA.update();
  moverA.checkEdges();

  moverB.applyForce(gravity);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverB.applyForce(wind);
  }
  moverB.display();
  moverB.displayVector();
  moverB.update();
  moverB.checkEdges();
}
