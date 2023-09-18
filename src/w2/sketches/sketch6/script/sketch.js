// html의 head와 body의 관계
function setup() {
  let canvas;
  canvas = createCanvas(800, 400);
  let canvasParent;
  canvasParent = select('#canvasGoesHere');
  canvas.parent(canvasParent);
  background(255);
}

function draw() {
  background(255);
  circle(mouseX, mouseY, 100);
}
