let angle = 0;
let angleVel;
let amplitude = 50;
let period = 120;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);

  angleVel = periodToAngleVel(period);
}

function draw() {
  background(255);

  angle += angleVel;
  line(0, height / 2, width, height / 2);
  ellipse(width / 2, height / 2 + sin(angle) * amplitude, 50);

  //   console.log(sin(angle));
}

function periodToAngleVel(periodAsFrame) {
  return TAU / periodAsFrame;
}
