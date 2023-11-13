class Cell {
  constructor(x, y, w, h, state) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // on-off를 위한 상태
    this.state = state;
  }

  display() {
    push();
    translate(this.x, this.y);
    // // 켜지고 꺼켰을 때 색상
    // if (this.state) {
    //   fill(32);
    // } else {
    //   fill(255);
    // }
    // 간지나게 줄여서
    fill(this.state ? 32 : 255);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
