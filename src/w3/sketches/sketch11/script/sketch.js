let center;
let mouse;
let centerToMouse;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('pink');
  center = createVector(width / 2, height / 2);
  mouse = createVector();
  centerToMouse = createVector();
}

function draw() {
  background('pink');
  mouse.set(mouseX, mouseY);
  centerToMouse = p5.Vector.sub(mouse, center);

  strokeWeight(2);
  stroke('white');
  translate(center.x, center.y);
  line(0, 0, centerToMouse.x, centerToMouse.y);

  //   normalize() = 벡터를 정규화하여 단위 길이를 1로 만들어줌
  centerToMouse.normalize();
  centerToMouse.mult(50);
  strokeWeight(4);
  stroke('black');
  line(0, 0, centerToMouse.x, centerToMouse.y);
  //   mag() = 벡터크키 계산
  console.log(centerToMouse.mag());
}
