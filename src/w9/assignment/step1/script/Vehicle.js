class Vehicle {
  //클래스를 지정한다.
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    // class 내부에서 사용할 객체의 초기값을 설정할 수 있다.
    //써먹을 변수들 목록
    this.pos = createVector(x, y);
    // 이 class의 pos는 Vehicle의 입력값에서 받은 x,y를 벡터 시킨 값 (위치)
    this.vel = p5.Vector.random2D();
    // 클래스 내부에 선언된 메소드 함수 + p5.js에 있는 길이 1의 랜덤된 방향으로 생성하는 함수 (속도)
    //: 이 class의 vel은 길이 1의 랜덤된 방향의 벡터이다.
    this.acc = createVector();
    // 앞으로 들어갈 이 class의 acc 값을 벡터로 변환시켜줌. (가속도값)
    this.mass = mass;
    // 이 class의 mass는 Vehicle의 입력값에서 받은 mass (질량값)
    this.rad = rad;
    //  이 class의 rad는 Vehicle의 입력값에서 받은 rad (반지름 값)
    this.speedMx = speedMx;
    // 이 class의 speedMx는 Vehicle의 입력값에서 받은 sppedMx (속도 최대값)
    this.forceMx = forceMx;
    // 이 class의 forceMx는 Vehicle의 입력값에서 받은 forceMx (힘의 최대값)
    this.neighborhooodRad = 50;
    // 이 class의 neighborhooodRad는 50 (친구로 간주되는 영역)
    this.color = color;
    // 이 class의 color는 Vehicle의 입력값에서 받은 color (color값)
  }

  cohesion(others) {
    // 친구들의 위치값 더하고 평균(친구들 수로 나눔)을 냄
    let cnt = 0;
    // 새로운 변수를 생성하고 그 이름을 지정한다. (cnt는 0, 카운트 값)
    const steer = createVector(0, 0);
    // 새로운 변수 생성. 벡터화
    others.forEach((each) => {
      // a(변수)의 0에서 others의 길이만큼 안의 내용을 반복하고 행위가 끝나면 a에 1을 더한다.
      if (each !== this) {
        // 나 자신 제외
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          // 친구들로 간주되는 사람들
          steer.add(each.pos);
          // 친구들의 위치 더해줌
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      // 내가 가야하는 평균치에 해당하는 위치 지점 도출
      steer.sub(this.pos);
      // 가야하는 길이 (방향)
      steer.setMag(this.speedMx);
      // 속도 최대값으로 길이 세팅
      steer.sub(this.vel);
      // 원래 속도를 뺸다.
      steer.limit(this.forceMx);
      // forceMx로 길이 제한
    }
    return steer;
  }

  align(others) {
    // 반경 안에 있는 친구들의 속도 각도를 더해 평균을 내고 그 평균값으로 위치의 방향 조정
    let cnt = 0;
    // 몇 번 더한지 카운트
    const steer = createVector(0, 0);
    others.forEach((each) => {
      // 다른 친구들 불러옴
      if (each !== this) {
        // 나는 제외
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        // 나와 친구의 거리 제곱
        if (distSq < this.neighborhooodRad ** 2) {
          // 나와 친구의 거리의 제곱이 neighborhooodRad의 제곱보다 작으면 = 친구!
          steer.add(each.vel);
          // 다른 친구들의 속도값 더함 (느린 친구들은 빨라지게 하는 기능 추가)
          //   steer.add(p5.Vector.normalize(each.vel));
          // 더하는 다른 방법
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      // 방향구함 (평균값)
      steer.setMag(this.speedMx);
      // 스피드 최대값으로 길이 세팅
      steer.sub(this.vel);
      // 원래 우리 속도를 뺀다
      steer.limit(this.forceMx);
      // 방향 길이 제한
    }
    return steer;
  }

  separate(others) {
    // 서로 멀어지기 위한 함수 (모든 vehicle들을 가져옴)
    let cnt = 0;
    const steer = createVector(0, 0);
    // 평균을 담기위한 변수 (벡터로)
    others.forEach((each) => {
      // 모든 others에 대해 적용할 것임 (반복문)
      if (each !== this) {
        //나 자신은 제외
        const dist = this.pos.dist(each.pos);
        // 나의 위치에서 다른 위치의 친구까지의 거리를 dist에 집어넣어줌
        if (dist > 0 && this.rad + each.rad > dist) {
          // 나의 반지름 + 친구의 반지름 < dist가 작으면 (부딪힌 경우)
          const distNormal = dist / (this.rad + each.rad);
          // (나의 반지름 + 친구 반지름) / dist => 가장 멀 때 1, 완전 겹쳤을 때 1이 나올 것
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          // 이 친구에서 나에게로 향하는 벡터
          towardMeVec.setMag(1 / distNormal);
          // 거리가 가까우면 큰 힘이 적용됨
          steer.add(towardMeVec);
          // steer 변수에 추가
          cnt++;
          //cnt에 1더하기
        }
      }
    });
    if (cnt > 0) {
      // 위의 계산을 한번이라도 했다면 실행 (방향의 길이 구하는 함수 : 속도 최대값)
      steer.div(cnt);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
      // 아무리 길어져도 forceMx보다는 길지마
    }
    return steer;
    // 반환
  }

  applyForce(force) {
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    //중력값 계산 (f=a*m 활용 > f/m = a), 여기서 p5.Vector는 앞에 있는 변수에 함수값을 리턴시켜줌
    this.acc.add(forceDivedByMass);
    //가속도에 계산된 중력값 더함
  }

  update() {
    this.vel.add(this.acc);
    //가속도에 속도 더함
    this.vel.limit(this.speedMx);
    //속도를 vehicle 통해 받은 스피트 최대값까지 제한
    this.pos.add(this.vel);
    // 속도를 위치값에 더함
    this.acc.mult(0);
    // 가속도를 0으로
  }

  borderInfinite() {
    // vehicle의 위치가 화면 + 일정값에서 벗어나면 반대쪽에서 다시 등장하도록 하는 함수
    if (this.pos.x < -infiniteOffset) {
      this.pos.x = width + infiniteOffset;
      // vehicle의 x 위치가 -일정값보다 작으면 반대쪽 캔버스 넓이 + 일정값 위치에 나타나도록
    } else if (this.pos.x > width + infiniteOffset) {
      this.pos.x = -infiniteOffset;
      // vehicle의 x 위치가 넚이 + 일정값보다 크면 반대쪽 캔버스 -일정값 위치에 나타나도록
    }
    if (this.pos.y < -infiniteOffset) {
      this.pos.y = height + infiniteOffset;
      // vehicle의 y 위치가 -일정값보다 작으면 반대쪽 캔버스 높이 + 일정값 위치에 나타나도록
    } else if (this.pos.y > height + infiniteOffset) {
      this.pos.y = -infiniteOffset;
      // vehicle의 y 위치가 높이 +일정값보다 크면 반대쪽 캔버스 -일정값 위치에 나타나도록
    }
  }

  display() {
    // Vehicle의 가시화
    push();
    // push - pop 사이에 벌어진 일들은 pop(CLOSE)가 되면 초기화된다.
    translate(this.pos.x, this.pos.y);
    // vehicle의 위치로 좌표값 이동
    rotate(this.vel.heading());
    // vehicle의 속도 방향으로 회전
    noStroke();
    // 획이 없는
    fill(this.color);
    // vehicle로부터 받은 color값으로 색상채움
    beginShape();
    //vertex순서대로 벡터값을 이어서 도형을 만듬
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
    // 친구 판별 반경 시각화
    pop();
  }
}
