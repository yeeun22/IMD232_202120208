let mover;
let mVec;

function setup() {
  setCanvasContainer('canvasHere', 3, 2, true);

  mover = new Mover(width / 2, height / 2, 25);
  mVec = createVector();

  background('white');
}

function draw() {
  mover.createRandomAcc();
  mover.update();
  mover.edgeInfinite();

  mVec.set(mouseX, mouseY);
  let towardMouseVec = p5.Vector.sub(mVec, mover.pos);

  background('white');
  mover.display();
  mover.displayVectors();

  stroke('black');
  strokeWeight(1);
  line(0, 0, towardMouseVec.x, towardMouseVec.y);
}
