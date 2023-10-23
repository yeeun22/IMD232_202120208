let emitter;
let gravity;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  emitter = new Emitter();

  gravity = createVector(0, 0.25);
  colorMode(HSL, 360, 100, 100);
  background(255);
  // frameRate(5);
}

function draw() {
  //Emitter클래스에서 this.particles.push(new Particle(this.pos.x, this.pos.y)); 가져옴 -> 계속 뿜어내는
  emitter.addParticle();

  background(255);
  emitter.update(gravity);
  emitter.display();
  console.log(emitter.particles.length);
}
