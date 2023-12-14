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
  let pos = createVector(random(width), height / 2);
  particles.push(new Particle(pos, character));
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
  constructor(pos, character) {
    this.pos = pos;
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.character = character;
    this.lifeSpan = random(500, 720);
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
    this.vel.mult(0.98); // 0.97은 입자가 천천히 느려지도록 하는 계수입니다.
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life--;
  }

  display() {
    fill('black');
    const fontSize = 30;
    textSize(fontSize);
    text(this.character, this.pos.x, this.pos.y);
  }

  isDead() {
    return this.life < 0;
  }
}
