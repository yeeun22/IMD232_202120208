let cv;
let mv;
let cvToMv;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  cv = createVector(width / 2, height / 2);
  mv = createVector();
  cvToMv = createVector();
}
function draw() {
  background(255);

  mv.set(mouseX, mouseY);
  cvToMv = mv.sub(cv);

  let mag = cvToMv.mag();
  //   console.log('mag', mag);
  noStroke();
  fill(0);
  rect(10, 10, mag, 10);

  translate(cv.x, cv.y);
  strokeWeight(2);
  stroke('cornflowerblue');
  line(0, 0, cvToMv.x, cvToMv.y);
}
