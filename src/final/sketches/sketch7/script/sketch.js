let canvasContainer = document.querySelector('#canvas');
const aspectRatio = 210 / 297;

const textParticles = [];
const fireParticles = [];
let levitateForce;

function setup() {
  const canvas = createCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
  canvas.parent(canvasContainer);

  levitateForce = createVector(0, -0.005);

  background('white');
}

function draw() {
  if (random() < 0.01) {
    createTextParticle();
    createFireParticle();
  }

  background('white');

  fireParticles.forEach((eachParticle) => {
    eachParticle.applyForce(levitateForce);
    eachParticle.update(fireParticles);
    eachParticle.edgeContain();
    eachParticle.display();
  });

  textParticles.forEach((eachParticle) => {
    eachParticle.applyForce(levitateForce);
    eachParticle.update(textParticles);
    eachParticle.edgeContain();
    eachParticle.display();
  });
}

function createTextParticle() {
  textParticles.push(
    new TextParticle(
      width / 2,
      height,
      random(TAU / 2, TAU),
      random(2),
      20,
      '지'
    )
  );
  textParticles.push(
    new TextParticle(
      width / 2,
      height,
      random(TAU / 2, TAU),
      random(2),
      20,
      '글'
    )
  );
}

function createFireParticle() {
  fireParticles.push(
    new FireParticle(width / 2, height, random(TAU / 2, TAU), random(2), 20)
  );
}

function windowResized() {
  canvasContainer = document.querySelector('#canvas');
  resizeCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientWidth / aspectRatio
  );
}
