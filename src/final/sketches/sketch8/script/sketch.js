let canvasContainer = document.querySelector('#canvas');
const aspectRatio = 210 / 297;

//파티클들 어레이 만들기
const textParticles = [];
const fireParticles = [];

// 올라가는 중력..?
let levitateForce;

function setup() {
  const canvas = createCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  canvas.parent(canvasContainer);

  levitateForce = createVector(0, -0.005);

  background('white');
}

function draw() {
  // 나오는 속도 조절
  if (random() < 0.1) {
    createTextParticle();
    createFireParticle();
  }

  background('white');

  // 불판
  push();
  strokeWeight(7);
  line(0, (height * 9) / 10, (width * 9) / 10, (height * 9) / 10);
  line((width * 1) / 10, (height * 8) / 10, width, (height * 8) / 10);

  line(0, (height * 9) / 10, (width * 1) / 10, (height * 8) / 10);
  line((width * 9) / 10, (height * 9) / 10, width, (height * 8) / 10);
  pop();

  // 불 (기능적용)
  fireParticles.forEach((eachParticle) => {
    eachParticle.applyForce(levitateForce);
    eachParticle.update(fireParticles);
    eachParticle.edgeContain();
    eachParticle.display();
  });

  // 지글 (기능 적용)
  for (let i = textParticles.length - 1; i >= 0; i--) {
    const eachParticle = textParticles[i];
    eachParticle.applyForce(levitateForce);
    eachParticle.update(textParticles);
    eachParticle.edgeContain();
    eachParticle.display();

    // 추가된 부분: 생명주기가 0이 되면 파티클 제거
    if (eachParticle.life <= 0) {
      textParticles.splice(i, 1);
    }
  }
}

// 지글 - 각각 파티클 만들기
function createTextParticle() {
  const rad = width / 20;
  textParticles.push(
    new TextParticle(
      width / 2,
      (height * 8) / 10,
      random((TAU * 2) / 3, (TAU * 1) / 3),
      random(2),
      rad,
      '지'
    )
  );
  textParticles.push(
    new TextParticle(
      width / 2,
      (height * 8) / 10,
      random((TAU * 2) / 3, (TAU * 1) / 3),
      random(2),
      rad,
      '글'
    )
  );
}

// 불 만들기
function createFireParticle() {
  //크기
  const rad = width / 40;
  //넣기
  fireParticles.push(
    new FireParticle(width / 2, height, random(TAU / 2, TAU), random(2), rad)
  );
}

// 화면 사이즈 조절
function windowResized() {
  canvasContainer = document.querySelector('#canvas');
  resizeCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
}
