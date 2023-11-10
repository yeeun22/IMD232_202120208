class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = rad;
    this.speedMx = speedMx;
    this.forceMx = forceMx;
  }

  // 중력
  applyForce(force) {
    // 외부에서 받은 힘을 나누기 (힘 / 질량)
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  // 이동 (가속도, 속도, 위치) => 매 프레임마다 업데이트 한다.
  update() {
    this.vel.add(this.acc);
    // speedMx가 있으니까 vel 자체에도 제한되어야 함
    this.vel.limit(this.speedMx);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  // 그려지는 거
  display() {
    // const headingAngle = atan2(this.vel.y, this.vel.x);
    // 위와 같은 역할의 함수
    const headingAngle = this.vel.heading();
    // Push - pop 하면 pop()이 왔을 시, translate, rotate가 초기화 됨
    push();
    translate(this.pos.x, this.pos.y);
    // 마우스를 향해 회전돌림
    rotate(headingAngle);
    fill(0);
    noStroke();
    // 도형 그리기 (펜툴같은 느낌)
    beginShape();
    vertex(this.rad, 0);
    // radians(-135) = (TAU/360)*(-135)
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    noFill();
    stroke('red');
    ellipse(0, 0, 2 * this.rad);
    pop();
  }

  // 타겟으로 향하는
  seek(target) {
    // 타겟에서 가기 위해서는 -> (타겟) - (현재 위치) = (현재 나의 위치에서 타겟으로 가는 거리 혹은 벡터)
    const desiredVelocity = p5.Vector.sub(target, this.pos);
    // 일정 속도(최고 속도)로 제한
    desiredVelocity.setMag(this.speedMx);
    // 타겟으로 가는 거리 - 속도 (=꺽어야 하는 방향과 거리)
    const steer = p5.Vector.sub(desiredVelocity, this.vel);
    // 꺽어야 하는 방향(거리)으로 가는 힘의 최대치 (바로 꺾이지 않고 천천히 돌아가도록 제한)
    steer.limit(this.forceMx);
    this.applyForce(steer);
  }
}
