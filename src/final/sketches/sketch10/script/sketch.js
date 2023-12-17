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

let m;
let mc;
let boxSize = 8;

function createTexts() {
  // '지'1 추가
  const zi1 = new MatterRect(
    fixedWidth / 2 - 10,
    fixedHeight + 20,
    boxSize,
    boxSize,
    {},
    '지'
  );
  let Aangle = random(TAU * 0.5, TAU);
  let Aspeed = random(0.1, 0.5);
  let AvecX = cos(Aangle) * Aspeed;
  let AvecY = sin(Aangle) * Aspeed;
  Body.setVelocity(zi1.body, { x: AvecX, y: AvecY });
  texts.push(zi1);

  // '지'2 추가
  const zi2 = new MatterRect(
    fixedWidth / 2 + 10,
    fixedHeight + 20,
    boxSize,
    boxSize,
    {},
    '지'
  );
  let Bangle = random(TAU * 0.5, TAU);
  let Bspeed = random(0.1, 0.5);
  let BvecX = cos(Bangle) * Bspeed;
  let BvecY = sin(Bangle) * Bspeed;
  Body.setVelocity(zi2.body, { x: BvecX, y: BvecY });
  texts.push(zi2);

  // '글'1 추가
  const gle1 = new MatterRect(
    fixedWidth / 2 - 20,
    fixedHeight + 20,
    boxSize,
    boxSize,
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
    fixedWidth / 2 + 20,
    fixedHeight + 20,
    boxSize,
    boxSize,
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
  //마우스 인터랙션
  // m = Mouse.create(document.querySelector('.p5Canvas'));
  // m.pixelRatio = pixelDensity();
  // mc = MouseConstraint.create(matterEngine, {
  //   mouse: m,
  // });
  // Composite.add(matterEngine.world, mc);

  // matter 중력
  matterEngine.gravity.y = -0.01;

  Runner.run(matterRunner, matterEngine);
  background('white');
}

function draw() {
  background('white');
  // 생성주기 관리
  if (random() < 0.05) {
    createTexts();
  }
  texts.forEach((eachText) => {
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
