class MovableObj {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = rad;
    this.isHover = false;
    this.isDragging = false;
    this.movingOffset = createVector();
  }

  chkIsHover(x, y) {
    const distSq = (this.pos.x - x) ** 2 + (this.pos.y - y) ** 2;
    this.isHover = distSq <= rad ** 2;
  }

  display() {
    noStroke();
    if (this.isHover) {
      fill(90, 80, 50);
    } else {
      fill(90, 60, 50);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  mouseMoved(mX, mY) {
    this.chkIsHover(mX, mY);
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.movingOffset.set(mX - this.pos.x, mY - this.pos.y);
    }
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
      this.pos.set(mX - this.movingOffset.x, mY - this.movingOffset.y);
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
