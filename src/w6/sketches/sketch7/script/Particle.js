class Particle {
  constructor(x, y, h, s, l) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 2);
    this.acc = createVector(0, 0);
    this.len = 15;
    this.color = color(h, s, l);
  }

  run() {
    let gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    this.update();
    this.display();
  }

  update() {
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  rotate() {
    this.rotate(random(360));
  }

  display() {
    noStroke();
    strokeWeight(2);
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.len);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  isDead() {
    return (
      this.pos.x < -this.len ||
      this.pos.x > width + this.len ||
      this.pos.y > height + this.len
    );
  }
}
