let pos;
let vel;
let acc;
let radius = 25;

function setup() {
  setCanvasContainer('canvasHere', 3, 2, true);
  background(255);
  // createVector 값이 안들어가도 됨 (하지만 값이 없으면 x,y값 없는 것으로 인식)
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  acc = createVector(0);
  console.log(pos);
  console.log(vel);
  ellipse(pos.x, pos.y, 50);
}

function draw() {
  background(255);
  acc = p5.Vector.random2D();
  acc.mult(0.5);
  vel.add(acc);
  vel.limit(5);
  pos.add(vel);
  //   if (pos.x<0) {
  // vel.x *= -1;
  //   } else if (pos.x > width) {
  //     vel.x *= -1;
  //   }

  // if (pos.x - radius < 0 || pos.x + radius > width) {
  //   vel.x *= -1;
  // }
  // if (pos.y - radius < 0 || pos.y + radius > height) {
  //   vel.y *= -1;
  // }
  infiniteEdge();
  ellipse(pos.x, pos.y, 2 * radius);

  function infiniteEdge() {
    if (pos.x < 0) {
      pos.x = width;
    } else if (pos.x > width) {
      pos.x = 0;
    }
    if (pos.y < 0) {
      pos.y = width;
    } else if (pos.y > height) {
      pos.y = 0;
    }
  }
}
