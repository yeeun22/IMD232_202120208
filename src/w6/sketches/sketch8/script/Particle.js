class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    // this.vel.rotate((TAU / 360) * random(-150, -30));
    this.acc = createVector(0, 0);
    this.rad = 8;
    this.color = color(random(360), 100, 50);
  }

  applyForce(force) {
    this.acc.set(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return this.pos.y > height + this.rad;
  }
}
