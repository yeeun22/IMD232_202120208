class Particle {
  constructor(x, y, mass, lifeSpan) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.vel.rotate((TAU / 360) * random(-150, -30));
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = this.mass ** 0.5 * 5;
    this.lifeSpan = lifeSpan;
    this.life = this.lifeSpan;
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life--;
  }

  display() {
    //lifeSpan - 초기에 받은 값, life - 현재 값
    // constrain(값, 최소값, 최대값);
    const normalizedLife = constrain(this.life / this.lifeSpan, 0, 1);
    stroke(0, 255 * normalizedLife);
    fill(127, 255 * normalizedLife);
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return this.life < 0;
  }
}
