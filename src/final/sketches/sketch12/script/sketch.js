let canvasContainer = document.querySelector('#canvas');
const fixedWidth = 210;
const fixedHeight = 297;
const aspectRatio = fixedWidth / fixedHeight;
//캔버스 너비 / 매터세계의 너비
let ratio;

const {
  Engine,
  Bodies,
  Composite,
  Runner,
  Body,
  Vector,
  Mouse,
  MouseConstraint,
} = Matter;

const matterEngine = Engine.create();
const matterRunner = Runner.create();

// 담을 통 만들기
const walls = [];
const texts = [];
const fires = [];

let m;
let mc;
let textBoxSize = 8;
let fireSize = 6;

function preload() {
  // 배경 이미지 미리 로드
  bgImage = loadImage('./png/인미디_그래픽.png');
}

// 불
function createFires() {
  const fire1 = new MatterCircle(fixedWidth / 2, fixedHeight, fireSize);
  fires.push(fire1);
}

// 텍스트
function createTexts() {
  // '지'1 추가
  const zi1 = new MatterRect(
    fixedWidth / 2 - 40,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '지'
  );
  let Aangle = random(TAU * 0.7, TAU * 0.9);
  let Aspeed = random(0.1, 0.5);
  let AvecX = cos(Aangle) * Aspeed;
  let AvecY = sin(Aangle) * Aspeed;
  Body.setVelocity(zi1.body, { x: AvecX, y: AvecY });
  texts.push(zi1);

  // '지'2 추가
  const zi2 = new MatterRect(
    fixedWidth / 2 + 30,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '지'
  );
  let Bangle = random(TAU * 0.7, TAU * 0.9);
  let Bspeed = random(0.1, 0.5);
  let BvecX = cos(Bangle) * Bspeed;
  let BvecY = sin(Bangle) * Bspeed;
  Body.setVelocity(zi2.body, { x: BvecX, y: BvecY });
  texts.push(zi2);

  // '글'1 추가
  const gle1 = new MatterRect(
    fixedWidth / 2 - 30,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '글'
  );
  Aangle = random(TAU * 0.5, TAU);
  Aspeed = random(0.1, 0.5);
  AvecX = cos(Aangle) * Aspeed;
  AvecY = sin(Aangle) * Aspeed;
  Body.setVelocity(gle1.body, { x: AvecX, y: AvecY });
  texts.push(gle1);

  // '글'2 추가
  const gle2 = new MatterRect(
    fixedWidth / 2 + 40,
    (fixedHeight * 4) / 5,
    textBoxSize,
    textBoxSize,
    {},
    '글'
  );
  Bangle = random(TAU * 0.5, TAU);
  Bspeed = random(0.1, 0.5);
  BvecX = cos(Bangle) * Bspeed;
  BvecY = sin(Bangle) * Bspeed;
  Body.setVelocity(gle2.body, { x: BvecX, y: BvecY });
  texts.push(gle2);
}

function setup() {
  const canvas = createCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  canvas.parent(canvasContainer);
  ratio = width / fixedWidth;

  //이미지
  image(bgImage, 0, 0, width, height);

  rectMode(CENTER);

  // 벽 (위치x, 위치y, 넓이, 높이)
  // 위쪽
  walls.push(
    new MatterRect(fixedWidth / 2, -25, fixedWidth + 100, 50, {
      isStatic: true,
    })
  );

  // 왼쪽
  walls.push(
    new MatterRect(-25, fixedHeight / 2, 50, fixedHeight + 100, {
      isStatic: true,
    })
  );

  // 오른쪽
  walls.push(
    new MatterRect(fixedWidth + 25, fixedHeight / 2, 50, fixedHeight + 100, {
      isStatic: true,
    })
  );

  // 중간
  walls.push(
    new MatterRect(
      fixedWidth / 2,
      (fixedHeight * 4) / 5 + 10,
      fixedWidth + 100,
      5,
      {
        isStatic: true,
      }
    )
  );

  //마우스 인터랙션
  m = Mouse.create(document.querySelector('.p5Canvas'));
  m.pixelRatio = pixelDensity() * ratio;
  mc = MouseConstraint.create(matterEngine, {
    mouse: m,
  });
  Composite.add(matterEngine.world, mc);

  // matter 중력
  matterEngine.gravity.y = -0.015;

  Runner.run(matterRunner, matterEngine);

  background('white');
}

function draw() {
  background(255, 255, 255);

  //불 생성주기 관리
  if (random() < 0.2) {
    createFires();
  }

  // 텍스트 생성주기 관리
  if (random() < 0.03) {
    createTexts();
  }

  // 바람 설정
  const windForce = mc.mouse.position.x - fixedWidth / 2;
  let windVector = createVector(windForce * 0.000000006, 0);

  // 각 불에 적용
  fires.forEach((eachFire) => {
    // Body.applyForce(eachFire.body, eachFire.body.position, windVector);
    eachFire.display();
  });

  //이미지

  image(bgImage, 0, 0, width, height);
  // 각 텍스트에 적용
  texts.forEach((eachText) => {
    Body.applyForce(eachText.body, eachText.body.position, windVector);
    eachText.display();
  });
}

// 화면 리사이즈
function windowResized() {
  canvasContainer = document.querySelector('#canvas');
  resizeCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  ratio = width / fixedWidth;
}
