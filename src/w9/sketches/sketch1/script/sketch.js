// let Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite;

// 안에서 일어나는 일들을 계산
let Engine = Matter.Engine;
// 그림 그려주는 역할
let Render = Matter.Render;
// draw 역할 (자동 루프)
let Runner = Matter.Runner;
// 물체 만드는 역할 (다각형인 물체 만드는)
let Bodies = Matter.Bodies;
let Composite = Matter.Composite;

// 필수과정 1: 엔진 만들기
let engine = Engine.create();
// let engine = Matter.Engine.create(); (똑같다.)

// // (수정) 위치를 지정한 곳에 위치시기는 법 => 해당하는 곳에 제일 밑에 위치시킴
let elem = document.querySelector('#canvas');
console.log(elem);
//

// 필수과정 2: 렌더러 만들기 => 눈에 보이게 그린다
let render = Render.create({
  element: elem,
  engine: engine,
  // // (수정) => 콘솔 options 통해 내가 수정하고 싶은거 확인하고 수정하면 됨
  options: {
    width: elem.clientWidth,
    height: (elem.clientWidth / 4) * 3,
  },
});
console.log(render);

// 옵션과정 1: 물체 만들기
let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(450, 50, 80, 80);
// // isStatics: true -> 고정된
let ground = Bodies.rectangle(400, 610, 400, 20, { isStatic: true });
console.log(ground);

// 옵션과정 2: 물체를 세계에 추가하기
// Composite.add(engine.world, [boxA, boxB, ground]);
Composite.add(engine.world, boxA);
Composite.add(engine.world, boxB);
Composite.add(engine.world, ground);

// 필수과정 3: 그림그리기
Render.run(render);

// 필수과정 4: 자동으로 계속 동작하게 해주는 장치 만들기
let runner = Runner.create();

// 필수과정 5: 자동 뺑뺑이에게 엔진을 등록해서 ㄱㄱㄱ
Runner.run(runner, engine);
