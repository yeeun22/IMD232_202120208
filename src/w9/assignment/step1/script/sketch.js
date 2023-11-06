let traffic;
// 새로운 변수를 생성하고 그 이름을 지정한다. (class Traffic을 사용할 변수)
let infiniteOffset = 80;
//// 화면 밖으로 나갔을 때 다시 반대쪽으로 나오게 하는 기준(=화면 밖 길이)

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  //캔버스 만드는 함수
  colorMode(HSL, 360, 100, 100, 100);
  //컬러모드를 설정하는 함수 (현재 HSL로 컬러모드가 설정되어있다.)
  background('white');
  //캔버스의 배경 색상을 정하는 함수
  traffic = new Traffic();
  // traffic이라는 변수를 만들고 그 안에 class Traffic을 불러와 넣는다.
  for (let n = 0; n < 10; n++) {
    //n은 0에서 시작하고 n이 10보다 작을 때 까지 한에 있는 내용을 반복한다. 그리고 그 행위가 끝날 때 마다 n에 1씩 더해지는 함수
    traffic.addVehicle(random(width), random(height));
    //class traffic에 있는 addVehicle이라는 함수를 불러와 사용(미리 정했던 입력값을 넣어줌)
  }
}

function draw() {
  background('white');
  // 캔버스의 배경 색상을 정하는 함수
  traffic.run();
  // class traffic에 있는 addVehicle이라는 함수를 불러와 사용 (vehicle이 움직이고)
}

function mouseDragged() {
  //마우스 버튼이 눌린 상태에서 움직일 때 마다 한 번씩 호출해주는 함수
  traffic.addVehicle(mouseX, mouseY);
  // class traffic에 있는 addVehicle이라는 함수를 불러와 사용(드래그하면 Vehicle을 더해줄 함수)
}
