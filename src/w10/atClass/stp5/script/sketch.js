let cells = [];

//rule
rule = [
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

class Cell {
  constructor(x, y, w, h, state, idx) {
    x = x;
    y = y;
    w = w;
    h = h;
    state = state;
    nextState = state;
    idx = idx;
    friends = [];
    // rule = [
    //   false, //111 = 7 (2진수)
    //   false, //110 = 6
    //   false, //101 = 5
    //   true, //100 = 4
    //   true, //011 = 3
    //   true, //010 = 2
    //   true, //001 = 1
    //   false, //000 = 0
    // ];
  }

  // // rule설정 (10진수를 8자리 2진수로)
  // setRule(denaryNum) {
  //   let binaryString = denaryNum.toString(2);
  //   while (binaryString.length < 8) {
  //     binaryString = '0' + binaryString;
  //   }
  //   for (let idx = 0; idx < 8; idx++) {
  //     rule[idx] = binaryString[idx] === '1';
  //   }
  // }

  //친구 범위 설정 및 더하기
  function addFriends(cellArray) {
    const idxList = [
      idx - 1, //왼
      idx + 1, //오
    ];

    // 1. 나의 위치 계산 (행 필요함. )
    const myCol = idx % colNum;

    // 2-1. 왼쪽 귀퉁이일 때 (없는 부분 없앰 처리)
    if (myCol === 0) {
      idxList[0] = -1;
    }
    //2-2. 오른쪽 귀퉁이일 때
    else if (myCol === colNum - 1) {
      idxList[1] = -1;
    }

    // 3. friends에 친구 넣기
    idxList.forEach((eachIdx) => {
      friends.push(cells[eachIdx]);
    });
  }

  // 다음으로 오는 상태 계산 (다음 나의 상태는 on인지 off인지)
  calcNextState() {
    let binaryString = '';
    // friends [0] 여부 묻고 (있으면) -> 상태가 true면 1, false면 0을 더한다. (숫자가 아닌 텍스트로 입력)
    binaryString += friends[0]?.state ? '1' : '0'; // 나의 왼쪽
    binaryString += state ? '1' : '0'; // 나
    binaryString += friends[1]?.state ? '1' : '0'; // 나의 오른쪽

    // console.log('binary', binaryString); // binary - 2진수의, String - 줄

    //문자로 이루어진 2진수를 숫자 10진수로 변환
    const decimalNum = parseInt(binaryString, 2); // decimal - 10진수의
    // console.log('decimalNum', decimalNum);

    // (왜 그런지는 모르겠으나) 위에 rule array에 넣은 값은 순서가 반대로 되어있다. 그래서 그 순서에 맞도록 치환해야 함.
    const ruleIdx = rule.length - 1 - decimalNum; // 순서 계산 => (룰의 길이 -1) - 나의 계산된 숫자
    nextState = rule[ruleIdx]; // 다음으로 올 변수에 계산된 값 넣기
    // console.log('nextState', nextState);
  }

  // 업데이트 (위에서 계산했던 값 현 상태에 넣기)
  updateState() {
    state = nextState;
  }

  // update대신 (나를 갱신하는 것이 아닌 나의 다음 세대를 생성)
  createNextGen() {
    return new Cell( // 원래 Cell값 받아서 y위치랑 상태, 번호만 수정해서 새로운 Cell 생성
      x,
      y + h, // 다음 y 위치에 생성되어야 하므로
      w,
      h,
      nextState, // 갱신할(다음) 상태 받아오기
      idx + colNum // 다음 행 위치하니까 원래 idx + 열
    );
  }

  display() {
    push();
    translate(x, y);
    // if (state) {
    //   fill(32);
    // } else {
    //   fill(255);
    // }

    // 상태가 true면 32(on), false면 255로(off)
    fill(state ? 32 : 255);
    rect(0, 0, w, h);
    pop();
  }
}

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
