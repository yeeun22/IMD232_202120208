let mover;
let movers = [];
let mVec;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  //   mover = new Mover(width / 2, height / 2, 10, 20, 'slateblue');
  colorMode(HSL, 360, 100, 100, 100);
  for (let a = 0; a < 100; a++) {
    movers.push(
      new Mover(
        random(width),
        random(height),
        10,
        25,
        color(random(360), 100, 50, 25)
      )
    );
  }

  mVec = new createVector(0, 0);

  background(255);
}

function draw() {
  mVec.set(mouseX, mouseY);
  //   const force = p5.Vector.sub(mVec, mover.pos);
  //   force.setMag(0.5);
  //   if (isMouseInsideCanvas()) {
  //     mover.applyForce(force);
  //     mover.update();
  //   }

  movers.forEach((eachMover) => {
    const force = p5.Vector.sub(mVec, eachMover.pos);
    force.setMag(0.5);
    if (isMouseInsideCanvas()) {
      eachMover.applyForce(force);
      eachMover.update();
    }
  });

  background(255);

  //   mover.display();
  //   mover.displayVectors();

  movers.forEach((eachMover) => {
    eachMover.display();
    // eachMover.displayVectors();
  });
}
