class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.vel.rotate((TAU / 360) * random(-150, -30));
    this.acc = createVector(0, 0);
    this.rad = 8;
    //life span = 수명
    this.lifeSpan = 255;
  }

  applyForce(force) {
    this.acc.set(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    //(질문) : 어차피 set 하니까 굳이 mult할 필요가 없지 않나..?
    this.acc.mult(0);
    this.lifeSpan -= 2;
  }

  display() {
    // 투명도 (255->0으로 되면 자연스럽게 사라지는 것처럼 보이겠지)
    stroke(0, this.lifeSpan);
    fill(127, this.lifeSpan);
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    // return은 함수를 호출한 부분으로 데이터 전달(반환)
    return this.lifeSpan < 0;
  }
}
