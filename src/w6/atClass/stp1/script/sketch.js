// 비가 한 위치에서 뿜어나오도록 하는 class
class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.balls = [];
  }

  createBall() {
    this.balls.push(
      new Ball(
        this.emittingPos.x,
        this.emittingPos.y,
        random(1, 5),
        random(360),
        100,
        50
      )
    );
  }

  applyGravity(gravity) {
    this.balls.forEach((each) => {
      const scaledG = p5.Vector.mult(gravity, each.mass);
      each.applyForce(scaledG);
    });
  }

  applyForce(force) {
    this.balls.forEach((each) => {
      each.applyForce(force);
    });
  }

  update() {
    this.balls.forEach((each) => {
      each.update();
    });
  }

  display() {
    this.balls.forEach((each) => {
      each.display();
    });
  }
}

class Ball {
  constructor(posX, posY, mass, h, s, v) {
    this.pos = createVector(posX, posY);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = this.mass * 5;
    this.color = color(h, s, v);
  }

  // 외부에서 힘이 들어와야 함 => (force)
  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    // // 차이점 :
    // const calcedAcc = force.div(this.mass) - 은 force의 값이 바뀜 (이미 나눠진 값으로 바뀜)
    // const calcedAcc = p5.Vector.div(force, this.mass) - force는 그대로인 상태에서 복사해 따로 값을 가지게 됨
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    // // 속도에 제한 두고 싶을 때
    // this.vel.limit(5)
    this.pos.add(this.vel);
    this.acc.mult(0);

    // // acc를 0으로 초기화 하는 방법은 많다.
    // this.acc.set(0,0);
    // this.acc.setMag(0,0); -> setMag길이를 안에 있는 값으로 변환
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }
}

let emitter;
let balls = [];
let gravity;
let wind;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);

  colorMode(HSL, 360, 100, 100);

  emitter = new Emitter(width / 2, 0);

  for (let n = 0; n < 10; n++) {
    balls.push(new Ball(random(width), 0, random(1, 20), random(360), 100, 50));
  }

  gravity = createVector(0, 0.1);
  wind = createVector(0.5, 0);
}

function draw() {
  background(255);
  //   balls.forEach(function(){});
  balls.forEach((each) => {
    // gracity.mult(); => 중력은 항상 값이 같아야 하는데 바뀜 (중력을 바로 넣으면 안됨, 중력 나누기 질량을 해야 진정한 중력)
    const scaledG = p5.Vector.mult(gravity, each.mass);
    each.applyForce(scaledG);
    each.applyForce(wind);
    each.update();
    each.display();
  });
  emitter.createBall();
  emitter.applyGravity(gravity);
  emitter.applyForce(wind);
  emitter.update();
  emitter.display();
}

function mousePressed() {
  // 위에는 []안에 볼을 집어 넣었다면, 이 함수는 0번 자리에 넣은 볼을 다시 바꾸는 것
  for (let n = 0; ball.length < 10; n++) {
    balls[n] = new Ball(random(width), 0, random(1, 20), random(360), 100, 50);
  }
}
