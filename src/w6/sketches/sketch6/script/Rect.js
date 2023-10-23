class Rect {
  constructor(x, y, len, anglevel, h, s, v) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.len = len;
    this.angle = 0;
    this.anglevel = (TAU / 360) * random(1, 360);
    this.color = color(h, s, v);
  }

  display() {
    fill(this.color);
    noStroke();
    rect(this.pos.x, this.pos.y.len);
  }

  rotate() {
    angleVel = constrain(angleVel, -5, 3);
    angle += angleVel;
    // push();
    translate(width / 2, height / 2);
    rotate(angle);
    // pop();
  }

  isDead() {
    return (
      this.pos.x < -this.len ||
      this.pos.x > width + this.len ||
      this.pos.y > height + this.len
    );
  }
}
