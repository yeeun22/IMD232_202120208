function setup() {
  setCanvasContainer('canvas');
  background(255);
}

function draw() {
  background('#E4C8A1');
  //   바닥
  fill('#453A40');
  rect(0, 450, 10000, 80);

  //   조명
  noStroke();
  fill(255, 30);
  ellipse(465, 100, 180);
  fill(255, 50);
  ellipse(465, 100, 130);
  fill(255, 60);
  ellipse(465, 100, 110);
  fill(255);
  ellipse(465, 100, 75);
  fill(255, 80);
  ellipse(560, 60, 50);
  ellipse(340, 180, 30);
  stroke(50);
  line(465, 0, 465, 62.5);

  // 벽난로
  noStroke();
  fill('#132823');
  rect(350, 250, 240, 200);
  fill('#2D433F');
  rect(325, 240, 290, 35);
  fill(255);
  noStroke();
  rect(400, 300, 140, 150, 999, 999, 0, 0);
  fill('#88171A');
  rect(420, 320, 100, 130, 999, 999, 0, 0);

  //   고양이
  //   (다리)
  fill(0);
  rect(640, 390, 15, 73, 99);
  rect(655, 390, 15, 73, 99);
  //   (얼굴)
  ellipse(654, 380, 55, 48);
  //   (눈)
  fill(255);
  noStroke();
  ellipse(652, 380, 17, 18);
  ellipse(665, 380, 17, 18);
  fill(0);
  ellipse(654, 380, 10);
  ellipse(667, 380, 10);
  //   (귀)
  stroke(0);
  triangle(638, 370, 650, 350, 662, 370);
  triangle(650, 370, 662, 350, 674, 370);
  // (몸)
  triangle(666, 450, 666, 390, 710, 450);
  rect(660, 438, 80, 13, 99);
}
