let cells = [];

//rule
this.rule = [
  false, //111 = 7 (2진수)
  false, //110 = 6
  false, //101 = 5
  true, //100 = 4
  true, //011 = 3
  true, //010 = 2
  true, //001 = 1
  false, //000 = 0
];

// rule설정 (10진수를 8자리 2진수로)
function setRule(denaryNum) {
  let binaryString = denaryNum.toString(2);
  while (binaryString.length < 8) {
    binaryString = '0' + binaryString;
  }
  for (let idx = 0; idx < 8; idx++) {
    rule[idx] = binaryString[idx] === '1';
  }
}

// 칸 갯수 (colum, row)
const colNum = 51,
  rowNum = 1;

// 칸의 넓이와 높이 변수 생성
let w, h;

let currentGen = 0;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  //반복표 (같은 랜덤값이 나옴)
  randomSeed(1);

  // 칸의 넓이와 높이 값 계산
  w = width / colNum;
  h = w;

  // 셀 넣기 (계산 + display하기 위한 값 넣어줌)
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      // const state = random() < 0.5;
      //자리 선정하지 않고 랜덤으로 해도 됨
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

  // 모든 셀들에 대해 규칙을 바꿔주는
  setRule(182);

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

  // 담을 변수 생성 (임시바구니)
  const newGen = [];

  // 마지막으로 생성된 줄 기준) 첫번째 줄만 계산하면 됨 (다음 줄은 계산 ㄴㄴ)
  for (let col = 0; col < colNum; col++) {
    const idx = colNum * currentGen + col; // 첫번째 줄 계산해서 Idx에 넣음
    cells[idx].calcNextState(); // 첫번째 줄 cell들 다음 상태 계산 (on-off)
    newGen.push(cells[idx].createNextGen()); // 다음 세대 생성하고 newGen에 넣기
  }

  // 새로 생긴 (new세대) 세대 cells array에 넣기
  newGen.forEach((eachNewGen) => {
    cells.push(eachNewGen);
  });

  // 친구 만들기 (다 추가하고 나서 친구 만들어줘야 함)
  newGen.forEach((eachNewGen) => {
    eachNewGen.addFriends(cells);
  });

  // // 업데이트 (위에서 계산했던 값 현 상태에 넣기)
  // cells.forEach((eachCell) => {
  //   eachCell.updateState();
  // });

  currentGen++;

  //시각화
  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
