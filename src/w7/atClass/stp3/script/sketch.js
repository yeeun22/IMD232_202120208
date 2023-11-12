let traffic;
// 화면 밖 + 일정값 (=infiniteOffset) 보다 나갔을 때 다시 나타나도록 하는 변수
let infiniteOffset = 80;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background('white');
  traffic = new Traffic();
  for (let n = 0; n < 10; n++) {
    traffic.addVehicle(random(width), random(height));
  }
}

function draw() {
  background('white');
  traffic.run();
}

function mouseDragged() {
  traffic.addVehicle(mouseX, mouseY);
}
