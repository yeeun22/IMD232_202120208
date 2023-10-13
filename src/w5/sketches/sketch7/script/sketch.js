let angle = 0;
// let angleVel = (TAU / 360) * 1;
// -> TAU는 프로세싱안에서만 가능
let angleVel;
let angleAcc;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  background(255);

  //   angleVel = (TAU / 360) * 1;
  angleVel = 0;
  angleAcc = (TAU / 360) * 0.01;
}

function draw() {
  background(255);

  angleVel += angleAcc;
  angleVel = constrain(angleVel, -5, 3);
  angle += angleVel;
  // //   회전하는 것을 넣을 때 push / pop 넣는 것을 추천
  //   push();
  //   pop();
  translate(width / 2, height / 2);
  rotate(angle);
  //   line(0, 0, 50, 0);
  //   line(0, 0, -50, 0);
  line(-50, 0, 50, 0);
  line(0, 50, 0, -50);
  ellipse(-50, 0, 10);
  ellipse(50, 0, 10);
  ellipse(0, -50, 10);
  ellipse(0, 50, 10);
}
