let noiseXA = 0;
let noiseXB = 0;
let noiseXAVel = 0.005;
let noiseXBVel = 1;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  background(255);
}

function draw() {
  background(255);

  // ellipse(width / 2 + random(100, 200), height / 2, 50);
  // ellipse(width / 2 + random() * 100 + 100, height / 2 + 100, 50);
  //   noise는 random과 달리 ()안에 최소, 최대값이 들어가지 않는다. -> 그래서 *100+100의 수식을 사용함
  ellipse(width / 2 + noise(noiseXA) * 100 + 100, height / 2, 50);
  ellipse(width / 2 + noise(noiseXB) * 100 + 100, height / 2 + 100, 50);
  noiseXA += noiseXAVel;
  noiseXB += noiseXBVel;
}
