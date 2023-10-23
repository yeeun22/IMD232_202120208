let emitter;
let gravity;

let particles = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100);
  background(360, 0, 100);
}

function draw() {
  background(360, 0, 100);
  particles.push(new Particle(random(width), -20, random(360), 100, 50));

  // Looping through backwards to delete
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.run();
    // particle.rotate();
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
  console.log(particles.length);
}
