let mover;
let mVec;

function setup() {
  setCanvasContainer('canvasHere', 3, 2, true);

  mover = new Mover(width / 2, height / 2, 25);
  mVec = createVector();

  background('white');
}

function draw() {
  mVec.set(mouseX, mouseY);
  let towardMouseVec = p5.Vector.sub(mVec, mover.pos);
  towardMouseVec.setMag(0.1);
  // mover.createRandomAcc();
  mover.setAcc(towardMouseVec);
  mover.update();
  // mover.edgeInfinite();

  background('white');
  mover.display();
  mover.displayVectors();

  stroke(0);
  strokeWeight(1);
  line(0, 0, mouseX - mover.pos.x, mouseY - mover.pos.y);
}
