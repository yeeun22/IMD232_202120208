let particles = [];
let floatingForce;
let windForce;
let characters = ['지', '글'];
let particleCreationRate = 10; // 초당 생성 속도
let maxParticles = 100; // 최대 입자 수

function preload() {
  // 이전 코드와 동일
}

function setup() {
  // 캔버스 세팅
  setCanvasContainer('canvas', 297, 420, true);

  textAlign(CENTER, CENTER);

  floatingForce = createVector(0, -0.05);
  windForce = createVector();

  // 음성 인식 초기화
  let recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onresult = function (event) {
    let result =
      event.results[event.results.length - 1][0].transcript.toLowerCase();
    handleVoiceCommand(result);
  };

  recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
  };

  // 음성 인식 시작
  recognition.start();
}

function draw() {
  // 바람 설정
  let windX = map(mouseX, 0, width - 1, -1, 1) * 0.05;
  windForce.set(windX, 0);

  // 일정 간격으로 입자 추가
  if (
    frameCount % particleCreationRate === 0 &&
    particles.length < maxParticles
  ) {
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

function handleVoiceCommand(command) {
  console.log('Voice command:', command);

  // 음성 명령에 따라 원의 생성 속도와 최대 입자 수 조절
  if (command.includes('faster')) {
    particleCreationRate += 5;
    if (particleCreationRate > 30) {
      particleCreationRate = 30; // 최대 생성 속도 제한
    }
  } else if (command.includes('slower')) {
    particleCreationRate -= 5;
    if (particleCreationRate < 5) {
      particleCreationRate = 5; // 최소 생성 속도 제한
    }
  } else if (command.includes('more particles')) {
    maxParticles += 10;
    if (maxParticles > 200) {
      maxParticles = 200; // 최대 입자 수 제한
    }
  } else if (command.includes('fewer particles')) {
    maxParticles -= 10;
    if (maxParticles < 50) {
      maxParticles = 50; // 최소 입자 수 제한
    }
  }
}

console.log(webkitSpeechRecognition);

let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;

recognition.onresult = function (event) {
  let result =
    event.results[event.results.length - 1][0].transcript.toLowerCase();
  handleVoiceCommand(result);
};

recognition.onerror = function (event) {
  console.error('Speech recognition error:', event.error);
};

// 사용자에게 물어보고 음성 인식 시작
setTimeout(() => {
  console.log('Start listening...');
  recognition.start();
}, 3000); // 3초 대기 후 음성 인식 시작

class Particle {
  constructor(pos) {
    this.pos = pos;
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.lifeSpan = random(70, 150);
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
      let col = lerpColor(color('red'), color('yellow'), 1 - lifeRatio);

      // 수명 기간에 따라 크기 변화
      let radius = map(lifeRatio, 0, 1, 10, 20);

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
