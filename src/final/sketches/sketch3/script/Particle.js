class Particle {
  constructor(x, y, mass, rad, lifeSpan) {
    this.pos = createVector(x, y);
    // this.vel = createVector(0, 0);
    this.vel = createVector(1, 0);
    this.vel.rotate((TAU / 360) * random(-120, -60));
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;
    this.lifeSpan = lifeSpan;
    this.life = this.lifeSpan;
  }

  applyForce(force) {
    //f = ma
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life--;
  }

  display() {
    tint(255, 255, 0, 255 * this.getNormalizedLife());
    fill(255); // 텍스트 채우기 색상 설정
    // text 대신 fill과 text를 사용하여 '지' 또는 '글' 표시
    text(this.character, this.pos.x, this.pos.y);
  }

  getNormalizedLife() {
    return this.life / this.lifeSpan;
  }

  isDead() {
    return this.life < 0;
  }
}
