// let aMover;
let movers = [];
const moversNum = 100;
let mVec;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);

  //   aMover = new Mover(width / 2, height / 2, 10, 25, 'cornflowerblue');
  colorMode(HSL, 360, 100, 100, 100);
  for (let a = 0; a < moversNum; a++) {
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

  mVec = createVector();
}

function draw() {
  mVec.set(mouseX, mouseY);

  //   const dirVec = p5.Vector.sub(mVec, aMover.pos);
  //   dirVec.setMag(0.5);
  //   aMover.applyForce(dirVec);
  //   aMover.update();
  for (let a = 0; a < movers.length; a++) {
    const dirVec = p5.Vector.sub(mVec, movers[a].pos);
    dirVec.setMag(0.5);
    movers[a].applyForce(dirVec);
    movers[a].update();
  }

  background(255);

  //   aMover.display();
  //   aMover.displayVectors();

  //   for (let a = 0; a < movers.length; a++) {
  //     movers[a].display();
  //     movers[a].displayVectors();
  //   }
  // for를 forEach로
  movers.forEach(function (anyName) {
    anyName.display();
    anyName.displayVectors();
  });
}
