let cells = [];

// 칸 갯수 (colum, row)
const colNum = 50,
  rowNum = colNum;

let w, h;

// Game of life 패턴 중 block (4개의 멈춰있는 면)
let patternBlock = {
  width: 4,
  height: 4,
  trueBlockIdx: [5, 6, 9, 10],
};
// Game of life 패턴 중 blinker (움직이는 십자모형)
let patternBlinker = {
  width: 5,
  height: 5,
  trueBlockIdx: [11, 12, 13],
};
// Game of life 패턴 중 toad (움직이는 어떤 무형)
let patternToad = {
  width: 6,
  height: 6,
  trueBlockIdx: [14, 15, 16, 19, 20, 21],
};
// Game of life 패턴 중 glider (움직이는 어떤 무형)
let patternGlider = {
  width: 5,
  height: 5,
  trueBlockIdx: [7, 13, 16, 17, 18],
};
// Game of life 패턴 중 pulsar (움직이는 어떤 무형)
let patternPulsar = {
  width: 15,
  height: 15,
  trueBlockIdx: [
    18, 19, 20, 24, 25, 26, 46, 51, 53, 58, 61, 66, 68, 73, 76, 81, 83, 88, 93,
    94, 95, 99, 100, 101, 123, 124, 125, 129, 130, 131, 136, 141, 143, 148, 151,
    156, 158, 163, 166, 171, 173, 178, 198, 199, 200, 204, 205, 206,
  ],
};

let addPattern = (x, y, pattern) => {
  for (let row = 0; row < pattern.height; row++) {
    for (let col = 0; col < pattern.width; col++) {
      const colIdx = x + col;
      const rowIdx = y + row;
      const idx = colNum * rowIdx + colIdx;
      if (pattern.trueBlockIdx.includes(pattern.width * row + col)) {
        cells[idx].state = true;
      }
    }
  }
};

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  //반복표 (같은 랜덤값이 나옴)
  randomSeed(1);

  w = width / colNum;
  h = height / rowNum;

  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      // const state = random() < 0.5;
      const state = false;
      const idx = colNum * row + col;
      const newCell = new Cell(x, y, w, h, state, idx);
      cells.push(newCell);
    }
  }

  //addPattern함수를 이용해 지정된 위치에 패턴 추가
  addPattern(0, 0, patternBlock);
  addPattern(20, 10, patternBlock);
  addPattern(30, 10, patternBlinker);
  addPattern(10, 30, patternToad);
  addPattern(1, 10, patternGlider);
  addPattern(30, 30, patternPulsar);

  // 친구 정의 (cell 다 생성되고 나서 넣어야 친구 만들 수 있음)
  cells.forEach((eachCell) => {
    eachCell.addFriends(cells);
  });

  console.log(cells);

  // 프레임 속도 (애니메이션 속도)
  frameRate(1);

  background('white');
}

function draw() {
  background('white');

  cells.forEach((eachCell) => {
    eachCell.calcNextState();
  });

  cells.forEach((eachCell) => {
    eachCell.updateState();
  });

  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
