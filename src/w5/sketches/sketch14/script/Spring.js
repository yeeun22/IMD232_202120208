class Spring {
  // 고정된 스프링 위치 x, y, 평상시 길이, 상수
  constructor(x, y, length, k) {
    this.pos = createVector(x, y);
    this.restLength = length;
    // 상수(늘어나거나 줄어든 것에 비례해 적용할 상수)
    this.k = k;
  }

  spring(hangingObj) {
    // 벡터 점 끼리 거리 구할 수 있는 함수
    const dist = p5.Vector.dist(hangingObj.pos, this.pos);
    // 늘어난 길이와 기존 길이의 차이 (길면 양수)
    const distDelta = dist - this.restLength;
    // bob으로 향하는 벡터
    const towardBob = p5.Vector.sub(hangingObj.pos, this.pos);
    const force = towardBob.setMag(-1 * this.k * distDelta);
    hangingObj.applyForce(force);
  }

  display(hangingObj) {
    noStroke();
    fill(127);
    ellipse(this.pos.x, this.pos.y, 20);
    noFill();
    stroke('#00FF00');
    line(this.pos.x, this.pos.y, hangingObj.pos.x, hangingObj.pos.y);
  }
}
