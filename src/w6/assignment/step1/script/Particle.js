class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    // this.vel.rotate((TAU / 360) * random(-150, -30));
    this.acc = createVector(0, 0);
    this.rad = 8;
    this.color = color(random(360), 100, 50);
    this.rotation = 0;
    this.rotationSpeed = random(-1, 1);
  }

  applyForce(force) {
    let forceG = p5.Vector.div(force, this.rad);
    this.acc.set(forceG);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.rotation += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);
    rectMode(CENTER);
    noStroke();
    fill(this.color);
    rect(0, 0, this.rad * 2);
    pop();
  }

  isDead() {
    return this.pos.y > height + this.rad;
  }
}
