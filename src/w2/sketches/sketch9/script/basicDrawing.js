function setup() {
  setCanvasContainer('p5-canvas', 3, 2, true);
  background('white');
}

// 한번 그리는 것이 아니라 루프됨 -> 적용한 설정 넘어오는 것을 방지하는 게 필요
function draw() {
  background(255);

  rectMode(CORNER);
  fill(255);
  colorMode(RGB);
  stroke(0);
  strokeWeight(1);

  // 사각형 만드는 함수(좌측 상단 기준)
  rect(100, 100, 50);
  // 타원 만드는 함수 (중심 기준)
  ellipse(100, 100, 50);
  ellipse(200, 100, 50, 25);
  rect(200, 100, 25, 50);

  // 사각형 만드는 함수 (중심 기준)
  rectMode(CENTER);
  rect(300, 100, 50);
  ellipse(300, 100, 50);

  rect(400, 100, 50, 25);
  ellipse(400, 100, 25, 50);

  fill(255, 127, 0);
  ellipse(100, 200, 50);
  fill('#00EE40');
  circle(200, 200, 50);
  colorMode(HSL);
  fill(200, 100, 50);
  rect(300, 200, 50);
  noStroke();
  square(400, 200, 50);

  rect(100, 300, 50, 50, 10);
  rect(200, 300, 50, 50, 5, 10, 15, 20);

  stroke(0);
  line(100, 400, 150, 450);

  stroke('royalblue');
  line(200, 400, 250, 400);

  stroke('salmon');
  strokeWeight(5);
  line(250, 400, 250, 450);
  stroke('slateBlue');
  strokeWeight(10);
  line(250, 450, 200, 450);

  stroke(50, 100, 10);
  strokeWeight(2);
  point(300, 400);
  point(310, 400);
  point(320, 400);
  point(330, 400);
  point(340, 400);
  point(350, 400);
  stroke(50, 100, 20);
  strokeWeight(3);
  point(300, 410);
  point(310, 410);
  point(320, 410);
  point(330, 410);
  point(340, 410);
  point(350, 410);
  stroke(50, 100, 30);
  strokeWeight(4);
  point(300, 420);
  point(310, 420);
  point(320, 420);
  point(330, 420);
  point(340, 420);
  point(350, 420);
  stroke(50, 100, 40);
  strokeWeight(5);
  point(300, 430);
  point(310, 430);
  point(320, 430);
  point(330, 430);
  point(340, 430);
  point(350, 430);
  stroke(50, 100, 50);
  strokeWeight(6);
  point(300, 440);
  point(310, 440);
  point(320, 440);
  point(330, 440);
  point(340, 440);
  point(350, 440);
  stroke(50, 100, 60);
  strokeWeight(7);
  point(300, 450);
  point(310, 450);
  point(320, 450);
  point(330, 450);
  point(340, 450);
  point(350, 450);
}
