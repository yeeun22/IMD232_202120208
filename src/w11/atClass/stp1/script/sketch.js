let cam;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  cam = createCapture(VIDEO);
  cam.hide();
  console.log(cam);
}

function draw() {
  background('white');
  image(cam, 0, 0, width, (cam.height / cam.width) * width);
}
