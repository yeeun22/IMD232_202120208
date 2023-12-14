let emitter;
let floatingForce;
let windForce;
let texture;

let characters = ['지', '글'];
let currentCharacterIndex = 0;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  emitter = new Emitter(width / 2, height - 50);
  floatingForce = createVector(0, -0.005);
  windForce = createVector();

  textAlign(CENTER, CENTER); // 텍스트 정렬 설정
  textSize(30); // 텍스트 크기 설정
  background('white');
}

function draw() {
  let windX = map(mouseX, 0, width - 1, -1, 1);
  windX *= 0.05;
  windForce.set(windX, 0);
  emitter.addParticle(characters[currentCharacterIndex]);
  emitter.applyForce(floatingForce);
  emitter.applyForce(windForce);
  emitter.update();

  background('white');

  emitter.display();
}
