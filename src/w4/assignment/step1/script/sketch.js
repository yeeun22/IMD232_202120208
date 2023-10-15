const bodies = [];
const bodyNum = 30;
const G = 0.01;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  for (let a = 0 + 1; a < bodyNum + 1; a++) {
    bodies.push(a);
  }
  reset();
  background(255);
}

function draw() {
  background(255);
  for (let a = 0; a < bodies.length; a++) {
    for (let j = 0; j < bodies.length; j++) {
      if (a !== j) {
        let forceForJ = bodies[a].attract(bodies[j]);
        bodies[j].applyForce(forceForJ);
      }
    }
    bodies[a].update();
    bodies[a].display();
  }
  // bodies.forEach((each) => {});
  // bodies.forEach((each) => {});
}

function mousePressed() {
  reset();
}

function reset() {
  for (let a = 0; a < bodies.length; a++) {
    bodies[a] = new Body(random(width), random(height), random(16, 100));
  }
}
