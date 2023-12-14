class Cell {
  constructor(x, y, w, h, isClick = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isClick = isClick;
    this.state = 'rock';

    this.nextState = this.state;
    this.neighbors = [];
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  calcNextState() {
    let enemyState;
    if (this.state === 'rock') {
      enemyState = 'paper';
    } else if (this.state === 'paper') {
      enemyState = 'scissors';
    } else if (this.state === 'scissors') {
      enemyState = 'rock';
    }

    const enemies = this.neighbors.filter(
      (eachNeighbor) => eachNeighbor?.state === enemyState
    );

    if (enemies.length > 2) {
      this.nextState = enemyState;
    } else {
      this.nextState = this.state;
    }
  }

  update() {
    this.state = this.nextState;
  }

  isHover(mx, my) {
    return (
      this.x < mx && this.x + this.w > mx && this.y < my && this.y + this.h > my
    );
  }

  display(mx, my) {
    push();
    translate(this.x, this.y);
    if (this.state === 'rock') {
      fill(color('hsl(160, 100%, 50%)'));
    } else if (this.state === 'paper') {
      fill(color('HSB(50, 55, 100)'));
    } else if (this.state === 'scissors') {
      fill('magenta');
    }
    rect(0, 0, this.w, this.h);
    pop();
  }
}
