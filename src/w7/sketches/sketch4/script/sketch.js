let dataPoint = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  frameRate(10);

  // 어레이 안에 0.5 50개 넣기
  for (let i = 0; i < 50; i++) {
    dataPoint.push(0.5);
  }

  background(255);
}

function draw() {
  // 맨 마지막에 있는 공 (49번째, 즉 실제로는 50번째 마지막 공)
  dataPoint[dataPoint.length - 1] = map(mouseY, 0, height, 1, 0);
  background(255);
  noStroke();
  fill(0);

  // 나열 된 점들 만들기
  for (let i = 0; i < dataPoint.length; i++) {
    // 간격 균등할 수 있게 -> 4개 만들고 싶으면 5개로 나눔 // (i가 0부터 시작이니까 + 1 해줌)
    const x = (width / (dataPoint.length + 1)) * (i + 1);
    // //y 1일때 위로, 0일때 밑으로 오게 하는 방법
    // map (a,b,c,d,e) => a = 변환할 값 / b = 최소값 / c = 최대값 / d = 최소값의 실제범위 / e = 최대값의 실제범위
    // 즉, 밑에 함수의 해석은 datapoint[i]는 0과 1사이의 값을 가지고 이것은 높이와 0 사이의 비율과 같다. (0.5라면 0과 1사이의 반의 비율이 되니 0과 높이의 반 정도에 위치함)
    const y = map(dataPoint[i], 0, 1, height, 0);
    ellipse(x, y, 10);
  }

  // // 움직임 (만약 길이가 10이라면 [i+1]은 그 길이보다 1 큰 숫자이므로 터지게 된다. -> 길이 -1 해줘야 함)
  // 뒤에 공의 위치를 앞에 위치로 옮겨감 -> 움직이는 것처럼 보임
  for (let i = 0; i < dataPoint.length - 1; i++) {
    dataPoint[i] = dataPoint[i + 1];
  }
}
