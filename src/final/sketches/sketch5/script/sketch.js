let particles = [];
let floatingForce;
let windForce;
let characters = ['지', '글'];

function preload() {
  // 이전 코드와 동일
}

function setup() {
  // 캔버스 세팅
  setCanvasContainer('canvas', 297, 420, true);

  textAlign(CENTER, CENTER);

  floatingForce = createVector(0, -0.05);
  windForce = createVector();
}

function draw() {
  let windX = map(mouseX, 0, width - 1, -1, 1) * 0.05;
  windForce.set(windX, 0);

  addParticle();

  applyForceToParticles(floatingForce);
  applyForceToParticles(windForce);
  // handleParticleCollisions();
  updateParticles();

  background('white');
  displayParticles();
}

function addParticle() {
  //생성 위치
  let pos = createVector(random(width), height - 10);
  particles.push(new Particle(pos));
}

function applyForceToParticles(force) {
  for (let particle of particles) {
    particle.applyForce(force);
  }
}

function handleParticleCollisions() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      particles[i].handleCollision(particles[j]);
    }
  }
}

function updateParticles() {
  particles = particles.filter((particle) => !particle.isDead());
  for (let particle of particles) {
    particle.update();
  }
}

function displayParticles() {
  for (let particle of particles) {
    particle.display();
  }
}

class Particle {
  constructor(pos) {
    this.pos = pos;
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.lifeSpan = random(40, 70);
    this.life = this.lifeSpan;
  }

  applyForce(force) {
    this.acc.add(force.copy());
  }

  handleCollision(other) {
    const distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    const minDistance = 20;

    if (distance < minDistance) {
      const forceDirection = p5.Vector.sub(this.pos, other.pos);
      forceDirection.setMag(0.1);

      this.applyForce(forceDirection);
      other.applyForce(forceDirection.mult(-1));
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(0.98); // 0.97은 입자가 천천히 느려지도록 하는 계수
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life--;
  }

  display() {
    for (let particle of particles) {
      // 현재 수명 비율 계산
      let lifeRatio = particle.life / particle.lifeSpan;

      // 빨간색에서 노란색으로
      let col = lerpColor(color('yellow'), color('red'), 1 - lifeRatio);

      // 알파 값을 직접 설정
      col.setAlpha(map(lifeRatio, 0, 1, 0, 255));

      // 수명 기간에 따라 크기 변화
      // let radius = map(lifeRatio, 0, 1, 20, 50);
      let radius = 40;

      //본격 그리기
      fill(col);
      noStroke();

      ellipse(particle.pos.x, particle.pos.y, radius);
    }
  }

  // 수명이 끝나면 죽는
  isDead() {
    return this.life < 0;
  }
}
