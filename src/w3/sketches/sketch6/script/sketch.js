let pos;
let vel = [3, 5];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  pos = [width / 2, height / 2];

  console.log('pos', pos);
  console.log('vel', vel);
}

function draw() {
  background('white');
  pos[0] += vel[0];
  pos[1] += vel[1];
  ellipse(pos[0], pos[1], 50);
  if (pos[0] < 0 || pos[0] > width) {
    vel[0] *= -1;
  }
  if (pos[1] < 0 || pos[1] > height) {
    vel[1] *= -1;
  }

  //   position.add(velocity);
  //   ellipse(position.x, position.y, 50);
  //   if (position.x < 0 || position.x > width) {
  //     velocity.x *= -1;
  //   }
  //   if (position.y < 0 || position.y > height) {
  //     velocity.y *= -1;
  //   }
}
