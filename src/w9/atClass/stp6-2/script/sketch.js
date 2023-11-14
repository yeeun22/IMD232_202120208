// var Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Composites = Matter.Composites,
//   Common = Matter.Common,
//   MouseConstraint = Matter.MouseConstraint,
//   Mouse = Matter.Mouse,
//   Composite = Matter.Composite,
//   Vertices = Matter.Vertices,
//   Bodies = Matter.Bodies;

//위의 함수를 좀 더 간편하게
const {
  Engine,
  Render,
  Runner,
  Composites,
  Common,
  MouseConstraint,
  Mouse,
  Composite,
  Vertices,
  Bodies,
} = Matter;

// provide concave decomposition support library
Common.setDecomp(decomp);

// create engine
const engine = Engine.create(),
  world = engine.world;

// create runner
const runner = Runner.create();

const oWidth = 800;
const oHeight = 600;

let mouse;

const walls = [];
let stack;

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);

  //walls에 추가
  walls.push(Bodies.rectangle(400, 0, 800, 50, { isStatic: true }));
  walls.push(Bodies.rectangle(400, 600, 800, 50, { isStatic: true }));
  walls.push(Bodies.rectangle(800, 300, 50, 600, { isStatic: true }));
  walls.push(Bodies.rectangle(0, 300, 50, 600, { isStatic: true }));

  // add bodies
  Composite.add(world, walls);

  let arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50'),
    chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
    star = Vertices.fromPath(
      '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'
    ),
    horseShoe = Vertices.fromPath(
      '35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7'
    );

  stack = Composites.stack(50, 50, 6, 4, 10, 10, function (x, y) {
    return Bodies.fromVertices(
      x,
      y,
      Common.choose([arrow, chevron, star, horseShoe])
    );
  });

  //세계에 추가
  Composite.add(world, stack);

  // add mouse control
  mouse = Mouse.create(canvas.elt); // 캔버스가 있는 요소를 반환해줌
  mouse.pixelRatio = (pixelDensity() * width) / oWidth; // !!!중요중요!!!
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });

  Composite.add(world, mouseConstraint);

  console.log('walls', walls);
  console.log('stack', stack);

  background('white');
  Runner.run(runner, engine);
}
function draw() {
  mouse.pixelRatio = (pixelDensity() * width) / oWidth; // !!!중요중요!!!
  background('white');

  stroke(0);
  noFill();
  walls.forEach((eachWall) => {
    beginShape();
    eachWall.vertices.forEach((eachVertex) => {
      vertex(
        (eachVertex.x / oWidth) * width,
        (eachVertex.y / oHeight) * height
      );
    });
    endShape(CLOSE);
  });

  stack.bodies.forEach((eachBody) => {
    // beginShape();
    // eachBody.vertices.forEach((eachVertex) => {
    //   vertex(
    //     (eachVertex.x / oWidth) * width,
    //     (eachVertex.y / oHeight) * height
    //   );
    // });
    // endShape(CLOSE);

    noStroke();
    fill('cornflowerblue');
    eachBody.parts.forEach((eachPart, idx) => {
      if (idx === 0) return;
      beginShape();
      eachPart.vertices.forEach((eachVertex) => {
        vertex(
          (eachVertex.x / oWidth) * width,
          (eachVertex.y / oHeight) * height
        );
      });
      endShape(CLOSE);
    });
  });
}
