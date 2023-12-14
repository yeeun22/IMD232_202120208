let dataPoint = [];
let velocities = [];

function setup() {
  // 캔버스 세팅
  setCanvasContainer('canvas', 297, 420, true);

  // 프레임 수
  frameRate(30);

  // dataPoint 어레이에 값 채워넣기 (50개)
  for (let i = 0; i < 50; i++) {
    dataPoint.push(random());
    velocities.push(random(0.01, 0.05));
  }
  // 배경 색상
  background('white');
}

function draw() {
  // 배경
  background('white');
  // 스트로크, 필 값
  noStroke();
  fill(0);

  // 글자 크기 설정
  const fontSize = 30;
  textSize(fontSize);

  for (let i = 0; i < dataPoint.length; i++) {
    // 원래 좌표에서 가로 세로 바꿈
    const x = map(dataPoint[i], 0, 1, width, 0);
    const y = (height / (dataPoint.length + 1)) * (i + 1);

    // '지'와 '글'의 폭과 높이 계산
    const textWidthJi = textWidth('지');
    const textWidthGeul = textWidth('글');
    const textHeight = textAscent();

    // 위치 업데이트
    dataPoint[i] += velocities[i];
    if (dataPoint[i] < 0 || dataPoint[i] > 1) {
      // 경계에서 튕기는 로직
      velocities[i] *= -1;
      dataPoint[i] = constrain(dataPoint[i], 0, 1);
    }

    // 다른 글자와의 충돌 여부 확인
    for (let j = 0; j < dataPoint.length; j++) {
      if (i !== j) {
        const otherX = map(
          dataPoint[j],
          0,
          1,
          textWidthJi / 2,
          width - textWidthGeul / 2
        );
        const otherY = (height / (dataPoint.length + 1)) * (j + 1);

        // 글자 간의 거리 계산
        const distance = dist(x, y, otherX, otherY);

        // 만약 글자 간의 거리가 글자의 폭의 절반보다 작으면 충돌로 판정
        if (distance < (textWidthJi + textWidthGeul) / 2) {
          // 충돌 시 속도 반전
          velocities[i] *= -1;
          velocities[j] *= -1;
        }
      }
    }

    // Draw '지' or '글' based on the value of dataPoint[i]
    if (i % 2 === 0) {
      text(
        '지',
        map(dataPoint[i], 0, 1, textWidthJi / 2, width - textWidthJi / 2),
        y
      );
    } else {
      text(
        '글',
        map(dataPoint[i], 0, 1, textWidthGeul / 2, width - textWidthGeul / 2),
        y
      );
    }
  }
}
