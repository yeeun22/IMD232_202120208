let dataPoint = [];

function setup() {
  // 캔버스 세팅
  setCanvasContainer('canvas', 297, 420, true);

  //프레임 수
  frameRate(5);

  // dataPoint 어레이에 값 채워넣기 (50개)
  for (let i = 0; i < 50; i++) {
    dataPoint.push(0.5);
  }
  // 배경 색상
  background('white');
}
function draw() {
  // 어레이의 마지막 값[i]에 마우스의 위치를 1-0사이의 값으로 치환함. (마우스에 따라서 지글이 나오도록)
  dataPoint[dataPoint.length - 1] = map(mouseX, 0, width, 1, 0);
  //배경
  background('white');
  //스트로크, 필 값
  noStroke();
  fill(0);

  for (let i = 0; i < dataPoint.length; i++) {
    // width / (정렬하고 싶은 수 + 1 ) => 원 4개를 같은 거리로 배치하고 싶으면 5개로 길이 나누고 배치
    // 그리고 *(곱하기) 자신이 놓고싶은 순서 + 1 => 원 4개 중 첫번째 원의 위치를 찍는다면 1-2로 가는 길이가 아닌 2-3으로 가는 길이의 시작점에 찍어야 함
    // const x = (width / (dataPoint.length + 1)) * (i + 1);
    // const y = map(dataPoint[i], 0, 1, height, 0);

    // // 원래 좌표에서 가로 세로 바꿈
    const x = map(dataPoint[i], 0, 1, width, 0);
    const y = (height / (dataPoint.length + 1)) * (i + 1);

    // Draw '지' or '글' based on the value of dataPoint[i]
    if (i % 2 === 0) {
      text('지', x, y);
    } else {
      text('글', x, y);
    }
  }

  for (let i = 0; i < dataPoint.length - 1; i++) {
    dataPoint[i] = dataPoint[i + 1];
  }
}
