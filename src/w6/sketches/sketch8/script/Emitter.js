class Emitter {
  constructor() {
    this.particles = [];
    this.pos = createVector();
  }

  addParticle() {
    this.particles.push(new Particle(random(width), -30));
  }

  update(gravity) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      // splice해도 어차피 앞에 다 실행된 것들임.
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  display() {
    push();
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].display();
    }
    pop(CLOSE);
  }
}
