let cells = [];

const colNum = 10,
  rowNum = colNum;
let w, h;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background('white');

  w = width / colNum;
  h = height / rowNum;

  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      //   let state;
      //   if (random() < 0.5) {
      //     state = false;
      //   } else {
      //     state = true;
      //   }
      // 간지나게 줄여서
      //   let state = random() < 0.5 ? false : true;
      let state = random() < 0.5;
      cells.push(new Cell(x, y, w, h, state));
    }
  }
}
function draw() {
  background('white');
  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
