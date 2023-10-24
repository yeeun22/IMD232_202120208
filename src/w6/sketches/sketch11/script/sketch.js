let particles = [];
let emitter;
const gravity = 0.1;
const particleMass = 10;
const particleRadius = 5;

function setup() {
  setCanvasContainer('canvas', 400, 400, true);
  frameRate(60);
  background(220);
  emitter = new Emitter();
}

function draw() {
  background(220);

  // 파티클 업데이트 및 그리기
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.applyForce(createVector(0, particleMass * gravity)); // 중력 적용
    particle.update();
    particle.show();

    // 파티클 생명주기 감소
    particle.lifespan--;

    if (particle.isOffScreen() || particle.lifespan <= 0) {
      particles.splice(i, 1);
    }
  }

  // 현재 파티클의 개수를 콘솔에 출력
  console.log('현재 파티클의 갯수: ' + particles.length);
}

function mousePressed() {
  emitter.emit(100, mouseX, mouseY);
}
