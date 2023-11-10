function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  background(255);
}

function draw() {
  background(255);

  // 난수표 중에 5000번 난수표 참고해서 랜덤값 뽑아줘 (컴퓨터에서 랜덤은 반복가능한 랜덤임. 완전 랜덤은 아니다.)
  // randomSeed(5000);

  // random()에 값을 안 넣으면 0~1사이 값 추출함.
  ellipse(width / 2 + random(100, 200), height / 2, 50);
  ellipse(width / 2 + random() * 100 + 100, height / 2 + 100, 50);
}
