class TextParticle {
  constructor(x, y, dir, speed, rad, text) {
    this.pos = createVector(x, y);
    this.vel = createVector(speed, 0);
    this.vel.rotate(dir);
    this.acc = createVector();
    this.mass = 0.1;
    this.rad = rad;
    this.text = text;
    this.lifeSpan = random(100, 150);
    this.life = this.lifeSpan;
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    // acc.mult(10);
    this.acc.add(acc);
  }

  update(particles) {
    this.separate(particles);
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life--;
  }

  edgeContain() {
    const elastic = 0.1;
    if (this.pos.x < this.rad) {
      this.pos.x = this.rad;
      this.vel.x = -1 * this.vel.x;
    } else if (this.pos.x > width - this.rad) {
      this.pos.x = width - this.rad;
      this.vel.x = -1 * this.vel.x;
    }
    if (this.pos.y < this.rad) {
      this.pos.y = this.rad;
      this.vel.y = -elastic * this.vel.y;
    }
  }

  separate(particles) {
    const steer = createVector(0, 0);
    let count = 0;
    particles.forEach((each) => {
      if (this !== each) {
        const desiredDist = this.rad + each.rad;
        let dist = p5.Vector.dist(this.pos, each.pos);
        if (dist < desiredDist) {
          const forceDirection = p5.Vector.sub(this.pos, each.pos);
          forceDirection.setMag(0.1);

          this.applyForce(forceDirection);
          each.applyForce(forceDirection.mult(-1));
        }
      }
    });
  }

  display() {
    stroke('black');
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.rad * 2);
    noStroke();
    text(this.text, 0, 0);
    pop();
  }
}
