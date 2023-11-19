class Cell {
  constructor(x, y, w, h, state, idx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
    this.nextState = state;
    this.idx = idx;
    this.friends = [];
    // this.rule = [
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
  //     this.rule[idx] = binaryString[idx] === '1';
  //   }
  // }

  //친구 범위 설정 및 더하기
  addFriends(cellArray) {
    const idxList = [
      this.idx - 1, //왼
      this.idx + 1, //오
    ];

    // 1. 나의 위치 계산 (행 필요함. )
    const myCol = this.idx % colNum;

    // 2-1. 왼쪽 귀퉁이일 때 (없는 부분 없앰 처리)
    if (myCol === 0) {
      idxList[0] = -1;
    }
    //2-2. 오른쪽 귀퉁이일 때
    else if (myCol === colNum - 1) {
      idxList[1] = -1;
    }

    // 3. this.friends에 친구 넣기
    idxList.forEach((eachIdx) => {
      this.friends.push(cells[eachIdx]);
    });
  }

  // 다음으로 오는 상태 계산 (다음 나의 상태는 on인지 off인지)
  calcNextState() {
    let binaryString = '';
    // this.friends [0] 여부 묻고 (있으면) -> 상태가 true면 1, false면 0을 더한다. (숫자가 아닌 텍스트로 입력)
    binaryString += this.friends[0]?.state ? '1' : '0'; // 나의 왼쪽
    binaryString += this.state ? '1' : '0'; // 나
    binaryString += this.friends[1]?.state ? '1' : '0'; // 나의 오른쪽

    // console.log('binary', binaryString); // binary - 2진수의, String - 줄

    //문자로 이루어진 2진수를 숫자 10진수로 변환
    const decimalNum = parseInt(binaryString, 2); // decimal - 10진수의
    // console.log('decimalNum', decimalNum);

    // (왜 그런지는 모르겠으나) 위에 rule array에 넣은 값은 순서가 반대로 되어있다. 그래서 그 순서에 맞도록 치환해야 함.
    const ruleIdx = rule.length - 1 - decimalNum; // 순서 계산 => (룰의 길이 -1) - 나의 계산된 숫자
    this.nextState = rule[ruleIdx]; // 다음으로 올 변수에 계산된 값 넣기
    // console.log('nextState', this.nextState);
  }

  // 업데이트 (위에서 계산했던 값 현 상태에 넣기)
  updateState() {
    this.state = this.nextState;
  }

  // update대신 (나를 갱신하는 것이 아닌 나의 다음 세대를 생성)
  createNextGen() {
    return new Cell( // 원래 Cell값 받아서 y위치랑 상태, 번호만 수정해서 새로운 Cell 생성
      this.x,
      this.y + this.h, // 다음 y 위치에 생성되어야 하므로
      this.w,
      this.h,
      this.nextState, // 갱신할(다음) 상태 받아오기
      this.idx + colNum // 다음 행 위치하니까 원래 idx + 열
    );
  }

  display() {
    push();
    translate(this.x, this.y);
    // if (this.state) {
    //   fill(32);
    // } else {
    //   fill(255);
    // }

    // 상태가 true면 32(on), false면 255로(off)
    fill(this.state ? 32 : 255);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
