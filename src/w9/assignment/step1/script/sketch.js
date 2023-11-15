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
  Body,
  Bodies,
  Constraint,
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

const walls = [];
let ropeA;
let ropeB;
let ropeC;

let mouse;

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);

  colorMode(HSL, 360, 100, 100, 100);

  //walls에 추가
  walls.push(Bodies.rectangle(400, 0, 800, 50, { isStatic: true }));
  walls.push(Bodies.rectangle(400, 600, 800, 50, { isStatic: true }));
  walls.push(Bodies.rectangle(800, 300, 50, 600, { isStatic: true }));
  walls.push(Bodies.rectangle(0, 300, 50, 600, { isStatic: true }));
  Composite.add(world, walls);

  // add bodies

  //모양
  let star = Vertices.fromPath(
    '0 0 5 0 5 18 23 13 26 22 8 28 19 43 11 50 0 34 -11 50 -19 43 -8 28 -26 22 -23 13 -5 18'
  );

  //ropeA
  let group = Body.nextGroup(true);

  ropeA = Composites.stack(oWidth / 4, 50, 8, 1, 10, 10, function (x, y) {
    return Bodies.fromVertices(x, y, Common.choose([star]), {
      collisionFilter: { group: group },
    });
  });

  Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.4,
    length: 2,
    render: { type: 'line' },
  });

  Composite.add(
    ropeA,
    Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -25, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  //ropeB
  group = Body.nextGroup(true);

  ropeB = Composites.stack(oWidth / 2, 50, 8, 1, 10, 10, function (x, y) {
    return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
  });

  Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });

  Composite.add(
    ropeB,
    Constraint.create({
      bodyB: ropeB.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  //ropeC
  group = Body.nextGroup(true);

  ropeC = Composites.stack((oWidth / 4) * 3, 50, 6, 1, 10, 10, function (x, y) {
    return Bodies.polygon(x, y, 3, 25, {
      collisionFilter: { group: group },
      chamfer: 5,
    });
  });

  Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 4 });
  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  Composite.add(world, [
    ropeA,
    ropeB,
    ropeC,
    Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

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

  background('white');
  Runner.run(runner, engine);
}
function draw() {
  mouse.pixelRatio = (pixelDensity() * width) / oWidth; // !!!중요중요!!!
  background(0, 0, 8);

  //   //walls
  //   walls.forEach((eachWall) => {
  //     beginShape();
  //     eachWall.vertices.forEach((eachVertex) => {
  //       vertex(
  //         (eachVertex.x / oWidth) * width,
  //         (eachVertex.y / oHeight) * height
  //       );
  //     });
  //     endShape(CLOSE);
  //   });
  //ropeA
  noStroke(0);
  fill(250, 100, 55);
  ropeA.bodies.forEach((eachBody) => {
    // beginShape();
    // eachBody.vertices.forEach((eachVertex) => {
    //   vertex(
    //     (eachVertex.x / oWidth) * width,
    //     (eachVertex.y / oHeight) * height
    //   );
    // });
    // endShape(CLOSE);
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

  //ropeB
  noStroke();
  fill(140, 100, 50);
  ropeB.bodies.forEach((eachBody) => {
    beginShape();
    eachBody.vertices.forEach((eachVertex) => {
      vertex(
        (eachVertex.x / oWidth) * width,
        (eachVertex.y / oHeight) * height
      );
    });
    endShape(CLOSE);
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

  //ropeC
  noStroke();
  fill(300, 100, 55);
  ropeC.bodies.forEach((eachBody) => {
    beginShape();
    eachBody.vertices.forEach((eachVertex) => {
      vertex(
        (eachVertex.x / oWidth) * width,
        (eachVertex.y / oHeight) * height
      );
    });
    endShape(CLOSE);
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
