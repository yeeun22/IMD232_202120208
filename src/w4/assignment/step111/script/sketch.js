let bodies = [];
let bodyNum = 35;

let G = 0.01;

let showVector = false;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  reset();
}

function draw() {
  background(255);

  for (let i = 0; i < bodyNum; i++) {
    for (let j = 0; j < bodyNum; j++) {
      if (i !== j) {
        let forceForJ = bodies[i].attract(bodies[j]);
        bodies[j].applyForce(forceForJ);
      }
    }
    bodies[i].update();
    bodies[i].display();
    if (showVector) {
      bodies[i].displayVectors();
    }
  }
}

function mousePressed() {
  if (isMouseInsideCanvas()) {
    reset();
  }
}

function reset() {
  for (let i = 0; i < bodyNum; i++) {
    bodies[i] = new Body(random(width), random(height), random(16, 100));
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    showVector = !showVector;
  }
}
