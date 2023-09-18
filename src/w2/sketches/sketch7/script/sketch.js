function setup() {
  setCanvasContainer('canvasGoesHere', 800, 400, true);
  background('#ff7733');
}

function draw() {
  // background('#ff7733');
  circle(mouseX, mouseY, width * 0.05);
}
