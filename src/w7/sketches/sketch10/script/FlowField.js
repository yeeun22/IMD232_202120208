class Flowfiled {
  constructor(resolution, noiseVel) {
    // resolution -> 타일의 크고 작음
    this.resolution = resolution;
    // 얼마나 많은 타일들이 가로로 존재할 것인가 (가로 / 타일 크기)
    // round : 반올림, ceil : 올림해서 정수로 바꿔줌
    this.columnNum = ceil(width / this.resolution);
    this.rowNum = ceil(height / this.resolution);
    //이중 어레이 (= 어레이 안에 여러 개의 값이 있는데, 그 각각의 값에도 어레이 존재)
    this.field = new Array(this.columnNum);
    for (let colIdx = 0; colIdx < this.columnNum; colIdx++) {
      this.field[colIdx] = new Array(this.rowNum);
    }
    // 위의 식 풀이
    // this.filed = [this.columnNum][this.rowNum];

    // noiseVel은 noise 정도를 뜻한다. ( )
    this.noiseVel = noiseVel;
    this.init();
  }

  init() {
    noiseSeed(random(1000));
    let noiseX = 0;
    for (let colIdx = 0; colIdx < this.columnNum; colIdx++) {
      let noiseY = 0;
      for (let rowIdx = 0; rowIdx < this.rowNum; rowIdx++) {
        // //밑에 과정 풀이
        // const angle = map(noise(noiseX, noiseY), 0, 1, 0, TAU);
        // const vector = createVector(1, 0);
        // vector.rotate(angle);
        // this.field[colIdx][rowIdx] = vector;

        const angle = map(noise(noiseX, noiseY), 0, 1, 0, TAU);
        // fromAngle : 특정각도를 가진 길이 1짜리 벡터를 만들어 줌
        this.field[colIdx][rowIdx] = p5.Vector.fromAngle(angle);
        noiseY += this.noiseVel;
      }
      noiseX += this.noiseVel;
    }
  }

  display() {
    for (let colIdx = 0; colIdx < this.columnNum; colIdx++) {
      for (let rowIdx = 0; rowIdx < this.rowNum; rowIdx++) {
        const vector = this.field[colIdx][rowIdx];
        const s = this.resolution;
        const x = s * colIdx + s * 0.5;
        const y = s * rowIdx + s * 0.5;
        const angle = vector.heading();
        push();
        translate(x, y);
        rotate(angle);
        noFill();
        stroke(0);
        line(-this.resolution * 0.4, 0, this.resolution * 0.4, 0);
        pop();
      }
    }
  }

  lookup(pos) {
    // constrain : 일정 숫자 범위 내에서 제한
    const colIdx = constrain(
      floor(pos.x / this.resolution),
      0,
      this.columnNum - 1
    );
    const rowIdx = constrain(
      floor(pos.y / this.resolution),
      0,
      this.rowNum - 1
    );
    return this.field[colIdx][rowIdx];
  }
}
