function setup() {
  setCanvasContainer('canvas');
  background(255);
}

function draw() {
  background('#E4C8A1');
  //   바닥
  fill('#453A40');
  noStroke();
  rect(0, height * 0.93, width, height * 0.1);

  //   조명
  noStroke();
  fill(255, 30);
  ellipse(width / 2, height * 0.2, height * 0.4);
  fill(255, 50);
  ellipse(width / 2, height * 0.2, height * 0.3);
  fill(255, 60);
  ellipse(width / 2, height * 0.2, height * 0.22);
  fill(255);
  ellipse(width / 2, height * 0.2, height * 0.18);
  fill(255, 80);
  ellipse(width * 0.7, height * 0.1, height * 0.12);
  ellipse(width * 0.35, height * 0.38, height * 0.07);
  ellipse(width * 0.3, height * 0.43, height * 0.04);
  stroke(50);
  line(width / 2, 0, width / 2, height * 0.11);

  // 벽난로
  noStroke();
  fill('#132823');
  rect(width * 0.36, height * 0.52, width * 0.26, height * 0.41);
  // height * 0.41 = 약 200
  fill('#2D433F');
  rect(width * 0.34, height * 0.5, width * 0.3, height * 0.07);
  fill(255);
  noStroke();
  rect(
    width * 0.42,
    height * 0.62,
    width * 0.14,
    height * 0.31,
    999,
    999,
    0,
    0
  );
  fill('#88171A');
  rect(
    width * 0.435,
    height * 0.65,
    width * 0.11,
    height * 0.28,
    999,
    999,
    0,
    0
  );

  //   고양이
  //   (다리)
  fill(0);
  rect(width * 0.68, height * 0.8, width * 0.015, height * 0.16, 99);
  rect(width * 0.695, height * 0.8, width * 0.015, height * 0.16, 99);
  //   (얼굴)
  ellipse(width * 0.694, height * 0.8, width * 0.06, height * 0.11);
  //   (귀)
  stroke(0);
  triangle(
    width * 0.67,
    height * 0.77,
    width * 0.682,
    height * 0.72,
    width * 0.7,
    height * 0.77
  );
  triangle(
    width * 0.68,
    height * 0.78,
    width * 0.702,
    height * 0.72,
    width * 0.72,
    height * 0.78
  );

  // (몸)
  triangle(
    width * 0.7,
    height * 0.91,
    width * 0.7,
    height * 0.78,
    width * 0.74,
    height * 0.91
  );
  rect(width * 0.7, height * 0.91, width * 0.07, height * 0.025, 99);
  //   (눈)
  fill(255);
  noStroke();
  ellipse(width * 0.69, height * 0.8, width * 0.02, height * 0.042);
  ellipse(width * 0.705, height * 0.8, width * 0.02, height * 0.042);
  fill(0);
  ellipse(width * 0.693, height * 0.8, width * 0.012);
  ellipse(width * 0.707, height * 0.8, width * 0.012);
}
