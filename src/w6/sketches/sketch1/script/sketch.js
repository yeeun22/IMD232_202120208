let particle;
let gravity = 0;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  particle = new Particle(width / 2, 20);
  gravity = createVector(0, 0.1);

  background(255);
}

function draw() {
  // console.log(particle.isDead());
  if (particle.isDead()) {
    // 만약 죽으면 다시 만들어라.
    particle = new Particle(width / 2, 20);
  }
  particle.applyForce(gravity);
  particle.update();
  background(255);
  particle.display();
}
