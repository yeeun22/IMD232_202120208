let dataPoint = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  frameRate(10);

  for (let i = 0; i < 50; i++) {
    dataPoint.push(0.5);
  }

  background(255);
  // 반복해도 똑같은 시퀀스가 나옴 (컴터안에 여러가지 랜덤값이 저장되어 있는데 그 표의 n번째 랜덤표를 가져온다 -> 일정한 값)
  // 랜덤하지만 너무 지나치게 랜덤하지 않도록 하는 것을 조정할 수 있음
  randomSeed(50);
}

function draw() {
  // dataPoint[dataPoint.length - 1] = map(mouseY, 0, height, 1, 0);
  //   // draw는 매프레임 새로 갱신되므로 계속 똑같은 값이 나올 수 밖에 없음 : 저장된 표의 제일 처음 값을 내니까.
  //   randomSeed(0);
  dataPoint[dataPoint.length - 1] = random();
  background(255);
  noStroke();
  fill(0);
  for (let i = 0; i < dataPoint.length; i++) {
    const x = (width / (dataPoint.length + 1)) * (i + 1);
    const y = map(dataPoint[i], 0, 1, height, 0);
    ellipse(x, y, 10);
  }
  stroke(0);
  noFill();
  beginShape();
  for (let i = 0; i < dataPoint.length; i++) {
    const x = (width / (dataPoint.length + 1)) * (i + 1);
    const y = map(dataPoint[i], 0, 1, height, 0);
    vertex(x, y);
  }
  endShape();
  for (let i = 0; i < dataPoint.length - 1; i++) {
    dataPoint[i] = dataPoint[i + 1];
  }
}
