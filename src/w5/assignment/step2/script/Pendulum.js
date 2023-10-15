class Pendulum {
  // 진자의 각도 (angle),
  // 진자의 각도에 대한 속도 (angleVel),
  // 진자의 각도에 대한 가속도 (angleAcc),
  // 진자의 중심점 (pos),
  // 진자의 길이 (rad),
  // 진자의 반지름 (ballRad),
  constructor(x, y, rad, angle, ballRad) {
    this.angle = angle;
    this.angleVel = 0;
    this.angleAcc = 0;
    this.pos = createVector(x, y);
    this.rad = rad;
    this.ballPos = createVector(x, y);
    // this.ballPos.x = cos(this.angle)*this.rad + this.pos.x;/
    // this.ballPos.y = sin(this.angle)*this.rad + this.pos.y;s
    this.ballPos.add(cos(this.angle) * this.rad, sin(this.angle) * this.rad);
    this.ballRad = ballRad;
    // 클릭해서 이동시키려면 필요함 movingOffset
    this.movingOffset = createVector();
    this.isHover = false;
    this.isDragging = false;
  }

  applyForce(force) {
    // a(가속도) = sin(angle)*g(중력: 아래로 내리는 힘만 -> force.y)/r(반지름)
    this.angleAcc = (sin(this.angle - (TAU / 360) * 90) * -force.y) / this.rad;
  }

  update() {
    if (!this.isDragging) {
      this.angleVel *= 0.999;
      this.angleVel += this.angleAcc;
      this.angle += this.angleVel;
    }
    this.ballPos.set(
      cos(this.angle) * this.rad + this.pos.x,
      sin(this.angle) * this.rad + this.pos.y
    );
  }

  display() {
    noStroke();
    fill(127);
    // 꼭짓점
    ellipse(this.pos.x, this.pos.y, 20);
    if (this.isDragging) {
      fill('#ff0000');
    } else if (this.isHover) {
      fill(127);
    } else {
      fill(191);
    }
    // 진자볼
    ellipse(this.ballPos.x, this.ballPos.y, 2 * this.ballRad);
    // 이어주는 선
    stroke(0);
    noFill();
    line(this.pos.x, this.pos.y, this.ballPos.x, this.ballPos.y);
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.ballPos.x - mX) ** 2 + (this.ballPos.y - mY) ** 2 <=
      this.ballRad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.movingOffset.set(mX - this.ballPos.x, mY - this.ballPos.y);
    }
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
      const ballShouldBe = createVector(
        mX - this.movingOffset.x,
        mY - this.movingOffset.y
      );
      const angle = atan2(
        ballShouldBe.y - this.pos.y,
        ballShouldBe.x - this.pos.x
      );
      this.angle = angle;
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
