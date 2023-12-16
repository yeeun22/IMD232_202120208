let particles = [];
let floatingForce;
let windForce;
let characters = ['지', '글'];
const fontSize = 30;

function preload() {
  // 이전 코드와 동일
}

function setup() {
  // 캔버스 세팅
  setCanvasContainer('canvas', 297, 420, true);

  //프레임 수
  //   frameRate(20);

  //
  textAlign(CENTER, CENTER);

  floatingForce = createVector(0, -0.1);
  windForce = createVector();
}

function draw() {
  // 바람 설ㅓㅇ
  let windX = map(mouseX, 0, width - 1, -1, 1) * 0.05;
  windForce.set(windX, 0);

  // 일정 간격으로 입자 추가
  if (frameCount % 10 === 0) {
    addParticle(characters[floor(random(characters.length))]);
  }

  applyForceToParticles(floatingForce);
  applyForceToParticles(windForce);
  handleParticleCollisions();
  updateParticles();

  background('white');
  displayParticles();
}

function addParticle(character) {
  let pos = createVector(width / 2, height - 10); // 캔버스의 중앙으로 위치 수정
  particles.push(new Particle(pos, character));
}

function applyForceToParticles(force) {
  for (let particle of particles) {
    particle.applyForce(force);
  }
}

// 충돌 시 멀어지게 하는 거 적용
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
  constructor(pos, character) {
    this.pos = pos;
    this.vel = createVector(1, 0);
    this.vel.rotate((TAU / 360) * random(-120, -60));
    this.acc = createVector(0, 0);
    this.character = character;
    this.lifeSpan = random(1000, 1500);
    this.life = this.lifeSpan;
  }

  applyForce(force) {
    this.acc.add(force.copy());
  }

  // 충돌 시 서로 멀어지는
  handleCollision(other) {
    const distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    const minDistance = fontSize;

    if (distance < minDistance) {
      const forceDirection = p5.Vector.sub(this.pos, other.pos);
      forceDirection.setMag(0.1);

      this.applyForce(forceDirection);
      other.applyForce(forceDirection.mult(-5));
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(0.98); // 0.97은 입자가 천천히 느려지도록 하는 계
    this.pos.add(this.vel);
    this.acc.mult(0);

    // 캔버스의 가장자리에 닿으면 튕기도록 처리
    if (this.pos.x > width - 10) {
      this.pos.x = width - 10;
      this.vel.x *= -1;
    } else if (this.pos.x < 10) {
      this.pos.x = 10;
      this.vel.x *= -1;
    }

    if (this.pos.y > height - 10) {
      this.pos.y = height - 10;
      this.vel.y *= -1;
    } else if (this.pos.y < 10) {
      this.pos.y = 10;
      this.vel.y *= -1;
    }

    this.life--;
  }

  display() {
    fill('black');
    textSize(fontSize);
    text(this.character, this.pos.x, this.pos.y);
  }

  // 수명이 끝나면 죽는거
  isDead() {
    return this.life < 0;
  }
}
