let vehicleA;
let vehicleB;
let mVec;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  colorMode(HSL, 360, 100, 100);

  vehicleA = new Vehicle(
    width / 2,
    height / 2,
    1,
    20,
    10,
    0.1,
    color(0, 100, 50)
  );

  vehicleB = new Vehicle(
    width / 2,
    height / 2,
    1,
    20,
    10,
    0.1,
    color(120, 100, 50)
  );
  mVec = createVector();

  background(255);
}

function draw() {
  mVec.set(mouseX, mouseY);

  // 쫓아오는 거랑 도망가는 거 구분만 하면 됨
  vehicleA.seek(mVec);
  vehicleB.flee(mVec);
  vehicleA.update();
  vehicleB.update();
  // 화면에 가두는 거
  vehicleA.borderInfinite();
  vehicleB.borderInfinite();
  background(255);
  vehicleA.display();
  vehicleB.display();
}
