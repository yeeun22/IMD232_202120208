class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(2, 0);
    this.vel.rotate((TAU / 360) * random(360));
    this.acc = createVector(0, 0);
    this.rad = 5;
    this.mass = 20;
    this.color = random(360);
    this.lifeSpan = 60;
  }

  applyForce(force) {
    this.acc = p5.Vector.div(force, this.mass);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifeSpan--;
  }

  display() {
    noStroke();
    fill(color(this.color, 100, 50, (255 / 60) * this.lifeSpan));
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return (
      this.lifeSpan < 0 ||
      this.pos.x < -20 ||
      this.pos.x > width + 20 ||
      this.pos.y < -20 ||
      this.pos.y > height + 20
    );
  }
}
