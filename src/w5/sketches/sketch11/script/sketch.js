let angle;
let angleVel;
// 얼마나 크게 이동하냐
let amplitude = [100, 50];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);

  // 시작 학도의 차이
  angle = createVector(0, TAU / 8);
  angleVel = createVector(periodToAngleVel(120), periodToAngleVel(120));
}

function draw() {
  // background(255);

  angle.add(angleVel);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
  ellipse(
    width / 2 + sin(angle.x) * amplitude[0],
    height / 2 + sin(angle.y) * amplitude[1],
    10
  );

  //   console.log(sin(angle));
}

// 얼마나 빨리 진동하냐 (주기)
function periodToAngleVel(periodAsFrame) {
  return TAU / periodAsFrame;
}
