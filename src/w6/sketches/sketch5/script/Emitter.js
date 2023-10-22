class Emitter {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    const randomLoc = p5.Vector.random2D();
    randomLoc.mult(random(0.5, 2));
    randomLoc.add(this.pos);
    this.particles.push(
      new Particle(randomLoc.x, randomLoc.y, 1, 15, random(120, 720))
    );
  }

  applyForce(force) {
    this.particles.forEach((eachParticle) => {
      eachParticle.applyForce(force);
    });
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const eachParticle = this.particles[i];
      eachParticle.update();
      if (eachParticle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  display() {
    this.particles.forEach((eachParticle) => {
      eachParticle.display();
    });
  }
}
