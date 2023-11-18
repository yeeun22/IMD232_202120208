let cells = [];

// 칸 갯수 (colum, row)
const colNum = 51,
  rowNum = 1;

// 칸의 넓이와 높이 변수 생성
let w, h;

function setup() {
  setCanvasContainer('canvas', 51, 1, true);

  //반복표 (같은 랜덤값이 나옴)
  randomSeed(1);

  // 칸의 넓이와 높이 값 계산
  w = width / colNum;
  h = height / rowNum;

  // 셀 넣기 (계산 + display하기 위한 값 넣어줌)
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      // const state = random() < 0.5;
      let state = false;
      if (col === floor(colNum / 2)) {
        state = true;
      }
      const idx = colNum * row + col;
      const newCell = new Cell(x, y, w, h, state, idx);
      cells.push(newCell);
    }
  }

  // cell의 각 친구 정의해주기 (cell 다 생성되고 나서 넣어야 친구 만들 수 있음)
  cells.forEach((eachCell) => {
    eachCell.addFriends(cells);
  });

  console.log(cells);

  // 프레임 속도 (애니메이션 속도)
  frameRate(5);

  background('white');
  //루프 반복 그만!
}

function draw() {
  background('white');

  // 다음으로 오는 상태 계산 (다음 나의 상태는 on인지 off인지)
  cells.forEach((eachCell) => {
    eachCell.calcNextState();
  });

  // 업데이트 (위에서 계산했던 값 현 상태에 넣기)
  cells.forEach((eachCell) => {
    eachCell.updateState();
  });

  //시각화
  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
