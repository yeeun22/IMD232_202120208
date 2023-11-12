class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.mass = mass;
    this.rad = rad;
    this.speedMx = speedMx;
    this.forceMx = forceMx;
    // 친구로 인식하는 반경
    this.neighborhooodRad = 50;
    this.color = color;
  }

  //응집 => 위치 더하고 평균값 내주면 위치 나옴
  cohesion(others) {
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.pos);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      // 평균값 산출 (가야하는 위치 도출)
      steer.div(cnt);
      // 산출된 위치로 향하는 벡터 (평균 목표 위치 - 내위치 = 평균 목표 위치로 가는 벡터)
      steer.sub(this.pos);
      // 길이 제한
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  // 정렬 (반경 안에 있는 친구들 모으기)=> 반경 안에 있는 친구들의 속도 각도를 더해 평균을 내고 그 평균 방향으로 조정 => 같이 감
  align(others) {
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        // distSq = 거리 제곱
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        // 친구에 해당
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.vel);
          //   steer.add(p5.Vector.normalize(each.vel));
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  //서로 멀어지기 위한 함수
  separate(others) {
    let cnt = 0;
    // 친구들이 나로 향하는 벡터를 다 합친 변수(값)
    const steer = createVector(0, 0);
    others.forEach((each) => {
      // each는 내가 아닐 때
      if (each !== this) {
        // dist => 거리 뽑아줌
        const dist = this.pos.dist(each.pos);
        // 둘 사이의 거리가 0보다는 크고(터질 때를 대비), 두 원 사이의 길이가 반지름 합한 것보다 작을 때 (=접촉중)
        if (dist > 0 && this.rad + each.rad > dist) {
          // 닿았음을 기준으로-> 가장멀었을 때 1, 가장 가까울 때 0이라는 값 산출 (계산하기 쉽게)
          const distNormal = dist / (this.rad + each.rad);
          // 친구가 나한테 향하는 벡터 구하기 : ~로 향하는 벡터 (~로 에서 다른 것을 빼야함) => 나 - 친구 위치
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          // 거리가 가까울수록 더 큰 힘, 멀면 작은 힘
          towardMeVec.setMag(1 / distNormal);
          steer.add(towardMeVec);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      // 친구들이 나로 향하는 벡터를 더하고 평균값 산출 (방향)
      steer.div(cnt);
      // (방향을 구했으니) 최대값으로 길이 맞춤
      steer.setMag(this.speedMx);
      // 원래 가려고 했던 값을 뺌
      steer.sub(this.vel);
      // 최대 힘보다는 길어지지마라
      steer.limit(this.forceMx);
    }
    return steer;
  }

  applyForce(force) {
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    this.acc.add(forceDivedByMass);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.speedMx);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  borderInfinite() {
    if (this.pos.x < -infiniteOffset) {
      this.pos.x = width + infiniteOffset;
    } else if (this.pos.x > width + infiniteOffset) {
      this.pos.x = -infiniteOffset;
    }
    if (this.pos.y < -infiniteOffset) {
      this.pos.y = height + infiniteOffset;
    } else if (this.pos.y > height + infiniteOffset) {
      this.pos.y = -infiniteOffset;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop();
  }
}
