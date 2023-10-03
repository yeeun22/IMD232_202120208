let pos;
let vel;
let acc;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('salmon');
  pos = createVector(random(width), random(height));
  vel = createVector(0, 0);
  acc = createVector(0, 0);
  //   acc = p5.Vector.random2D();
  //   acc.mult(0.1);

  console.log('pos', pos);
  console.log('vel', vel);
  console.log('acc', acc);
  console.log('velMag', vel.mag());
  console.log('accMag', acc.mag());
}

function draw() {
  background('salmon');
  update();
  checkEdges();
  display();

  console.log('accMag', acc.mag());
  console.log('velMag', vel.mag());
}

function update() {
  acc = p5.Vector.random2D();
  acc.mult(1);
  vel.add(acc);
  vel.limit(10);
  pos.add(vel);
}

function checkEdges() {
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }
  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
}

function display() {
  noStroke();
  fill('cornsilk');
  ellipse(pos.x, pos.y, 50);
}
