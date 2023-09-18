let posX;
let posY;
let posXAdd = 3;
let posYAdd = -2;

function setup() {
  setCanvasContainer('canvasHere', 3, 2, true);
  background(255);
  posX = width / 2;
  posY = height / 2;
  ellipse(posX, posY, 50);
}

function draw() {
  background(255);
  //   계산을 먼저 하고 반영하는 것이 좋음
  posX += posXAdd;
  posY += posYAdd;
  ellipse(posX, posY, 50);
}
