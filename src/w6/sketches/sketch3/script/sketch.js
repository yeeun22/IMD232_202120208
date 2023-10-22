let emitter;
let emitters = [];
let gravity = 0;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  emitter = new Emitter(width / 2, 20);

  gravity = createVector(0, 0.1);

  background(255);
}

function draw() {
  //Emitter클래스에서 this.particles.push(new Particle(this.pos.x, this.pos.y)); 가져옴 -> 계속 뿜어내는
  emitter.addParticle();
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].addParticle();
  }

  background(255);
  emitter.update(gravity);
  emitter.display();
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].update(gravity);
    emitters[i].display();
  }
  console.log(emitter.particles.length);
}

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}
