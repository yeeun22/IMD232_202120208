let emitter;
let floatingForce;
let windForce;
let texture;

function preload() {
  texture = loadImage('data/texture.png');
}

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  emitter = new Emitter(width / 2, height - 50);
  floatingForce = createVector(0, -0.005);
  windForce = createVector();

  imageMode(CENTER);
  background(16);
}

function draw() {
  let windX = map(mouseX, 0, width - 1, -1, 1);
  windX *= 0.05;
  windForce.set(windX, 0);
  emitter.addParticle();
  emitter.applyForce(floatingForce);
  emitter.applyForce(windForce);
  emitter.update();

  background(16);

  emitter.display();
}
