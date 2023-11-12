class MatterRect {
  constructor(x, y, w, h, options) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    // 3. 물제를 엔진에 추가
    Composite.add(matterEngine.world, this.body);
    // console.log(this.body);
  }

  display() {
    // 1. 엔진에 등록된 물체(body)의 위치 가져오기
    // 2. 물체의 각도 가져오기
    // 3. 푸시 (push)
    // 4. 위치로 트랜스레이트
    // 5. 각도로 회전
    // 6. 0, 0 지점에 가로, 세로 크기로 직사각형 (RectMode가 Center)
    // 7. 팝 (pop)
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rect(0, 0, this.w, this.h);
    pop();
  }

  isDead() {
    return this.body.position.y > height + 100;
  }

  // 물리적으로 계산하고 있는 개체 또한 삭제해야 함
  remove() {
    Composite.remove(matterEngine.world, this.body);
  }
}
