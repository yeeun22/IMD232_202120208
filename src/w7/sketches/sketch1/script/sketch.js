let vehicle;
let mVec;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  vehicle = new Vehicle(width / 2, height / 2, 1, 20, 10, 0.1);
  mVec = createVector();

  background(255);
}

function draw() {
  // 마우스 벡터 (쓰기 위해 만든 변수 / set은 말그대로 값을 괄호 안에 값으로 적용)
  mVec.set(mouseX, mouseY);
  // 타겟으로 향하는 함수
  vehicle.seek(mVec);
  // vehicle 이동시켜 (매 프레임마다 업데이트, 가속도, 속도, 위치)
  vehicle.update();
  background(255);
  // vehicle 보여줘
  vehicle.display();
}
