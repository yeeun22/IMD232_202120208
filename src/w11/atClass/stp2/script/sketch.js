let aDrunkenObj;
let trace = [];
let path = [];

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  aDrunkenObj = new Drunken(width / 2, height / 2);
  trace.push(path); // 일단 하나 넣어줌 (trace > path > point)

  background('white');
}
function draw() {
  background('white');
  //계산
  const randomForce = p5.Vector.random2D();
  randomForce.mult(1);

  aDrunkenObj.applyForce(randomForce);
  aDrunkenObj.update();
  aDrunkenObj.infiniteEdge();

  //잔상
  if (aDrunkenObj.isCrossed) {
    // Edge 만남: 더 이상 점 주면 안됨.
    path = [];
    trace.push(path);
    path.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);
  } else {
    // Edge만나지전: path에 어레이로 만든 걸 넣어줌(궤도 point)
    path.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);
  }

  //원본 원 보다 앞에 그려야 뒤에 그려짐
  for (let pathIdx = 0; pathIdx < trace.length; pathIdx++) {
    // trace의 여러개의 path중 해당 순서의 path를 가져와서 aPath에 넣음
    const aPath = trace[pathIdx];
    noFill();
    beginShape();
    for (let pointIdx = 0; pointIdx < aPath.length; pointIdx++) {
      //path의 점들을 가져와서 연결
      const point = aPath[pointIdx];
      vertex(point[0], point[1]);
    }
    endShape();
  }

  aDrunkenObj.display();
}
