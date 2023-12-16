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

const walls = [];

const texts = [];

let m;
let mc;

function createTexts() {
  const zi = new MatterRect(
    fixedWidth / 2 - 40,
    fixedHeight + 40,
    8,
    8,
    {},
    '지'
  );
  let angle = random(TAU * 0.5, TAU);
  let speed = random(0.1, 0.5);
  let vecX = cos(angle) * speed;
  let vecY = sin(angle) * speed;
  Body.setVelocity(zi.body, { x: vecX, y: vecY });
  texts.push(zi);
  const gle = new MatterRect(
    fixedWidth / 2 + 40,
    fixedHeight + 40,
    8,
    8,
    {},
    '글'
  );
  angle = random(TAU * 0.5, TAU);
  speed = random(0.1, 0.5);
  vecX = cos(angle) * speed;
  vecY = sin(angle) * speed;
  Body.setVelocity(gle.body, { x: vecX, y: vecY });
  texts.push(gle);
}

function setup() {
  const canvas = createCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  canvas.parent(canvasContainer);
  ratio = width / fixedWidth;

  rectMode(CENTER);

  walls.push(
    new MatterRect(fixedWidth / 2, -25, fixedWidth + 100, 50, {
      isStatic: true,
    })
  );
  walls.push(
    new MatterRect(-25, fixedHeight / 2, 50, fixedHeight + 100, {
      isStatic: true,
    })
  );
  walls.push(
    new MatterRect(fixedWidth + 25, fixedHeight / 2, 50, fixedHeight + 100, {
      isStatic: true,
    })
  );

  // m = Mouse.create(document.querySelector('.p5Canvas'));
  // m.pixelRatio = pixelDensity();
  // mc = MouseConstraint.create(matterEngine, {
  //   mouse: m,
  // });
  // Composite.add(matterEngine.world, mc);

  matterEngine.gravity.y = -0.01;

  Runner.run(matterRunner, matterEngine);
  background('white');

  createTexts();

  console.log(texts[0]);
}

function draw() {
  background('white');
  if (random() < 0.05) {
    createTexts();
  }
  texts.forEach((eachText) => {
    eachText.display();
  });
}

function windowResized() {
  canvasContainer = document.querySelector('#canvas');
  resizeCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  ratio = width / fixedWidth;
}
