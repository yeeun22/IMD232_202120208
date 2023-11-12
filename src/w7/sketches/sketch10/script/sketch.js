let flowfield;
let mVec;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  flowfield = new Flowfiled(30, 0.05);
  mVec = createVector(0, 0);

  background(255);
}

function draw() {
  mVec.set(mouseX, mouseY);

  const lookupVec = flowfield.lookup(mVec);

  background(255);
  flowfield.display();

  push();
  translate(mVec.x, mVec.y);
  // heading : 벡터의 회전 각도 계산
  rotate(lookupVec.heading());
  noStroke();
  strokeWeight(4);
  stroke('red');
  line(-50, 0, 50, 0);
  pop();
}

function mousePressed() {
  flowfield.init();
}
