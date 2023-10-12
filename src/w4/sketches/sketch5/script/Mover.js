class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = mass ** 0.5 * 10;
  }

  applyForce(force) {
    let forceDividedByMass = createVector(force.x, force.y);
    forceDividedByMass.div(this.mass);
    this.acc.add(forceDividedByMass);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  contactEdge() {
    if (this.pos.y >= height - 1 - this.rad - 1) {
      return true;
    } else {
      return false;
    }
  }

  checkEdges() {
    const bounce = -0.9;
    if (this.pos.x < 0 + this.rad) {
      this.pos.x -= 0 + this.rad;
      this.pos.x *= -1;
      this.pos.x += 0 + this.rad;
      this.vel.x *= bounce;
    } else if (this.pos.x > width - this.rad) {
      this.pos.x -= width - 1 - this.rad;
      this.pos.x *= -1;
      this.pos.x += width - 1 - this.rad;
      this.vel.x *= bounce;
    }
    if (this.pos.y < 0) {
      this.pos.y -= 0;
      this.pos.y *= -1;
      this.pos.y += 0;
      this.vel.y *= bounce;
    } else if (this.pos.y > height - 1 - this.rad) {
      this.pos.y -= height - 1 - this.rad;
      this.pos.y *= -1;
      this.pos.y += height - 1 - this.rad;
      this.vel.y *= bounce;
    }
  }

  display() {
    stroke('black');
    strokeWeight(1);
    fill(200);
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  displayVector() {
    stroke('red');
    strokeWeight(2);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('blue');
    strokeWeight(2);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.acc.x * 100,
      this.pos.y + this.acc.y * 100
    );
  }
}
