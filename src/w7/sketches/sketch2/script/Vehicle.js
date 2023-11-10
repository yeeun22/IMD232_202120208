class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = rad;
    this.speedMx = speedMx;
    this.forceMx = forceMx;
    this.color = color;
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.speedMx);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    // const headingAngle = atan2(this.vel.y, this.vel.x);
    const headingAngle = this.vel.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(headingAngle);
    fill(0);
    noStroke();
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    noFill();
    stroke(this.color);
    ellipse(0, 0, 2 * this.rad);
    pop();
  }

  seek(target) {
    const steer = p5.Vector.sub(target, this.pos);
    steer.setMag(this.speedMx);
    // const steer = p5.Vector.sub(desiredVelocity, this.vel);
    // 어차피 desiredVelocity에서 this.vel 빼는 거니까
    // desiredVelocity.sub(this.vel)하면됨
    // 그럼 굳이 2개의 변수 쓸 필요 x
    // 여기서는 desiredVelocity를 steer로 해서 하나로 쓴 것
    steer.sub(this.vel);
    steer.limit(this.forceMx);
    this.applyForce(steer);
  }

  flee(target) {
    const steer = p5.Vector.sub(target, this.pos);
    // -1 곱하면 180도 회전이 됨 (그럼 쫓아오던 거에서 도망치는 걸로 바뀜)
    steer.mult(-1);
    steer.setMag(this.speedMx);
    steer.sub(this.vel);
    steer.limit(this.forceMx);
    this.applyForce(steer);
  }

  borderInfinite() {
    if (this.pos.x < -this.rad) {
      this.pos.x = width + this.rad;
    } else if (this.pos.x > width + this.rad) {
      this.pos.x = -this.rad;
    }
    if (this.pos.y < -this.rad) {
      this.pos.y = height + this.rad;
    } else if (this.pos.y > height + this.rad) {
      this.pos.y = -this.rad;
    }
  }
}
