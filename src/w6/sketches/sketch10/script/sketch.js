let particles = [];
let num = 100;
let g;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(360, 0, 100);

  for (let a = 0; a < num; a++) {
    particles.push(new Particle(width / 2, height / 2));
  }

  g = createVector(0, 1);
}
function draw() {
  background(360, 0, 100);

  for (let a = 0; a < num; a++) {
    particles[a].applyForce(g);
    particles[a].update();
    particles[a].display();
  }
  for (let a = particles.length - 1; a >= 0; a--) {
    if (particles[a].isDead()) {
      particles.splice(a, 1);
    }
  }

  function mousePressed() {}
}
