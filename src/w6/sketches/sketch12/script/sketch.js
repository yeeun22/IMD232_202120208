let particles = [];
let emitter;
let g;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(360, 0, 100);

  emitter = new Emitter();
  g = createVector(0, 1);
}
function draw() {
  background(360, 0, 100);

  for (let a = particles.length - 1; a >= 0; a--) {
    particles[a].applyForce(g);
    particles[a].update();
    particles[a].display();
    if (particles[a].isDead()) {
      particles.splice(a, 1);
    }
  }

  console.log('파티클 갯수', particles.length);
}

function mousePressed() {
  emitter.emit(100, mouseX, mouseY);
}
