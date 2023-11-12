// 1. 엔진만들기
// 2. 물체만들기
// 3. 물제를 엔진에 추가
// 4. 러너만들기
// 5. 러너에 엔진 등록해서 뺑뺑이

// console.log(Matter);
const { Engine, Bodies, Composite, Runner } = Matter;

// console.log(Engine);
// 1. 엔진 생성
const matterEngine = Engine.create();

// console.log(Runner);
// 4. 러너 생성 (자동으로 계속 동작하게 해주는 장치 만들기)
const matterRunner = Runner.create();

console.log(Composite);

const matterRects = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  rectMode(CENTER);

  matterRects.push(new MatterRect(width / 2, 50, random(8, 16), random(8, 16)));
  matterRects.push(
    new MatterRect(width / 4, height - 50, width / 2, 50, { isStatic: true })
  );
  matterRects.push(
    new MatterRect((width / 4) * 3, height - 200, width / 2, 50, {
      isStatic: true,
      angle: radians(-15),
    })
  );

  background('white');

  // 5. 러너에 엔진 등록해서 뺑뺑이
  Runner.run(matterRunner, matterEngine);
}

function draw() {
  background('white');

  //   matterRects.forEach((each) => {
  //     each.display();
  //   });
  for (let idx = matterRects.length - 1; idx >= 0; idx--) {
    matterRects[idx].display();
    if (matterRects[idx].isDead()) {
      // 물리적으로 계산하고 있는 개체 또한 삭제해야 함
      matterRects[idx].remove();
      matterRects.splice(idx, 1);
    }
  }
  // splice 되었는지 확인
  console.log('matterRects.length', matterRects.length);
  // 물리적으로 계산하고 있는 개체 확인
  console.log('world.bodies.length', matterEngine.world.bodies.length);
}

function mouseDragged() {
  matterRects.push(
    new MatterRect(mouseX, mouseY, random(8, 16), random(8, 16))
  );
}
