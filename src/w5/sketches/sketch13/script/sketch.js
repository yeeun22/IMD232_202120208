let x, y;
const rad = 50;
let isHover = false;
let isDragging = false;
let deltaX, deltaY;

let movableObj;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(0, 0, 100);

  x = width / 2;
  y = height / 2;

  movableObj = new MovableObj(width / 4, height / 4, 50);
}

function draw() {
  background(0, 0, 100);
  display();
  movableObj.display();
}

function chkHover(mX, mY) {
  // 원의 반지름에서 마우스까지의 거리가 반지름보다 작으면 이에 해당됨
  const distSq = (x - mX) ** 2 + (y - mY) ** 2;
  return distSq <= rad ** 2;
}

function display() {
  noStroke();
  if (isHover) {
    fill(30, 80, 50);
  } else {
    fill(30, 60, 50);
  }
  ellipse(x, y, 2 * rad);
}

function mouseMoved() {
  isHover = chkHover(mouseX, mouseY);
  movableObj.mouseMoved(mouseX, mouseY);
}

function mousePressed() {
  if (isHover) {
    isDragging = true;
    deltaX = mouseX - x;
    deltaY = mouseY - y;
  }

  movableObj.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  if (isDragging) {
    x = mouseX - deltaX;
    y = mouseY - deltaY;
  }
  movableObj.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  isDragging = false;
  movableObj.mouseReleased();
}
