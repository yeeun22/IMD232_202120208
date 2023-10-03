// let pos;
// let vel;
// let acc;
// let r = 40;

class Ball {
  constructor(inputX, inputY) {
    this.pos = createVector(inputX, inputY);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
    this.acc = createVector(0, 0.1);
    this.r = 25;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(20);
    this.pos.add(this.vel);
  }
  infiniteEdge() {
    if (this.pos.x < 0) {
      this.pos.x += width;
    } else if (this.pos.x >= width) {
      this.pos.x -= width;
    }
    if (this.pos.y < 0) {
      this.pos.y += height;
    } else if (this.pos.y >= height) {
      this.pos.y -= height;
    }
  }
  display() {
    ellipse(this.pos.x, this.pos.y, 2 * this.r);
  }
}

let aBall;
let bBall;
let cBall;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');

  aBall = new Ball(width / 2, height / 2);
  bBall = new Ball(width / 3, height / 2);
  cBall = new Ball(width / 2, height / 3);
}

function draw() {
  background('white');
  aBall.update();
  aBall.infiniteEdge();
  aBall.display();

  bBall.update();
  bBall.infiniteEdge();
  bBall.display();

  cBall.update();
  cBall.infiniteEdge();
  cBall.display();
}
