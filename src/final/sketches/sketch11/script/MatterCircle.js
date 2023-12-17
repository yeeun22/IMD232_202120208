class MatterCircle {
  constructor(x, y, r, options) {
    this.r = r;
    this.body = Bodies.circle(x, y, this.r, options);
    Composite.add(matterEngine.world, this.body);

    // 랜덤주기
    this.lifespan = random(300, 500);
  }

  display() {
    push();
    translate(ratio * this.body.position.x, ratio * this.body.position.y);
    // rotate(this.body.angle);
    // rect(0, 0, ratio * this.w, ratio * this.h);
    // pop();
    ellipse(0, 0, ratio * this.r);
    // 생명주기에 따라 alpha값 조절
    let alpha = map(this.lifespan, 0, 500, 0, 255);
    alpha = constrain(alpha, 0, 255);
    noStroke();
    fill(255, 0, 0, alpha);
    pop();

    // 생명 -1
    this.lifespan--;
    // 생명 <=0이면 없애기
    if (this.lifespan <= 0) {
      this.remove();
    }
  }

  remove() {
    Composite.remove(matterEngine.world, this.body);

    //생명주기 - 없애기
    const index = fires.indexOf(this);
    if (index !== -1) {
      fires.splice(index, 1);
    }
  }
}
