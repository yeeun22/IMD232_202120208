let traffic;

let debug = true;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  colorMode(HSL, 360, 100, 100, 100);

  traffic = new Traffic();

  for (let n = 0; n < 30; n++) {
    traffic.addVehicle(random(width), random(height));
  }

  background(0, 100, 100);
}

function draw() {
  background(0, 100, 100);
  traffic.run();
}

// 포함된 함수: 클릭하고 움직일 때 작동함
function mouseDragged() {
  traffic.addVehicle(mouseX, mouseY);
}
