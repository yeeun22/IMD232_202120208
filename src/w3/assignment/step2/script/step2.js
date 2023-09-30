let pos;
let vel;
let acc;
let radius = 50;

function setup() {
  setCanvasContainer('canvasHere', 3, 2, true);
  background(255);
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  acc = createVector(0);
}

function draw() {
  background(255);

  // circle
  stroke(0);
  fill(100);
  acc = p5.Vector.random2D();
  acc.mult(0.5);
  vel.add(acc);
  vel.limit(3);
  pos.add(vel);
  infiniteEdge();
  ellipse(pos.x, pos.y, 2 * radius);

  function infiniteEdge() {
    if (pos.x < 0 + radius) {
      pos.x = width - radius;
    } else if (pos.x > width - radius) {
      pos.x = 0 + radius;
    }
    if (pos.y < 0 + radius) {
      pos.y = height - radius;
    } else if (pos.y > height - radius) {
      pos.y = 0 + radius;
    }
  }

  // line
  let mouse = createVector(mouseX, mouseY);

  strokeWeight(1);
  stroke(0);
  line(pos.x, pos.y, mouse.x, mouse.y);
  mouse.sub();

  stroke('red');
  line(pos.x, pos.y, pos.x + vel.x * 10, pos.y + vel.y * 100);

  stroke('blue');
  line(pos.x, pos.y, pos.x + acc.x * 10, pos.y + acc.y * 50);
}
