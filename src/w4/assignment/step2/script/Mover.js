class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = mass ** 0.5 * 10;
    this.isHover = false;
    this.isDragging = false;
    this.draggingOffset = createVector();
  }

  applyForce(force) {
    let forceDividedByMass = createVector(force.x, force.y);
    forceDividedByMass.div(this.mass);
    this.acc.add(forceDividedByMass);
  }

  update() {
    if (this.isDragging) {
    } else {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }

  contactEdge() {
    if (this.pos.y >= height - 1 - this.rad - 1) {
      return true;
    } else {
      return false;
    }
  }

  checkEdges() {
    const bounce = -0.7;
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
    //
    if (this.pos.y > height - 1 - this.rad) {
      this.pos.y -= height - 1 - this.rad;
      this.pos.y *= -1;
      this.pos.y += height - 1 - this.rad;
      this.vel.y *= bounce;
    }
  }

  display() {
    stroke('black');
    strokeWeight(1);
    if (this.isHover) {
      fill(0);
    } else {
      fill(200);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.pos.x - mX) ** 2 + (this.pos.y - mY) ** 2 <= this.rad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.draggingOffset.set(mX - this.pos.x, mY - this.pos.y);
    }
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
      this.pos.set(mX - this.draggingOffset.x, mY - this.draggingOffset.y);
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
