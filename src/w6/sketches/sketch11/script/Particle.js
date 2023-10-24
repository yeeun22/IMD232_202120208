class Particle {
  constructor(x, y, velocity) {
    this.position = createVector(x, y);
    this.velocity = velocity;
    this.lifespan = 60;
  }

  applyForce(force) {
    // 질량에 비례하는 가속도 적용 (뉴턴의 2번째 법칙 F = ma)
    this.velocity.add(force.div(particleMass));
  }

  update() {
    this.position.add(this.velocity);
  }

  show() {
    let alpha = map(this.lifespan, 0, 60, 0, 255); // 생명주기에 따라 투명도 조절
    fill(0, alpha);
    noStroke();
    ellipse(this.position.x, this.position.y, particleRadius * 2);
  }

  isOffScreen() {
    return (
      this.position.x < 0 || this.position.x > width || this.position.y > height
    );
  }
}
