let nGon = 5;
let rad = 200;
let x;
let y;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
}

function draw() {
  x = width / 2;
  y = height / 2;

  background(255);

  noFill();
  stroke(0);
  strokeWeight(1);
  ellipse(x, y, 2 * rad);
  noStroke();
  fill(0);
  for (let a = 0; a < nGon; a++) {
    const angle = (TAU / nGon) * a - (TAU / 360) * 90;
    const pointX = cos(angle) * rad + x;
    const pointY = sin(angle) * rad + y;
    ellipse(pointX, pointY, 10);
  }

  stroke('red');
  noFill();
  beginShape();
  for (let a = 0; a < nGon; a++) {
    const angle = (TAU / nGon) * a - (TAU / 360) * 90;
    const pointX = cos(angle) * rad + x;
    const pointY = sin(angle) * rad + y;
    vertex(pointX, pointY);
  }
  endShape(CLOSE);
}
