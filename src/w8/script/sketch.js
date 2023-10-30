let dom;
let htmlDom;
let canvasW = 600;
let canvasH = 400;
function setup() {
  //   내가 원하는 위치에 createCanvas 하기

  //p5.js 사용
  dom = select('#hereGoesMyP5Sketch');
  //   console.log('p5 select', dom);
  //   console.log('p5 select', dom.width);

  //   기존 자바에 있는 querySelector 사용
  htmlDom = document.querySelector('#hereGoesMyP5Sketch');
  //   console.log('querySelector', htmlDom);
  //   console.log('querySelector', htmlDom.clientWidth);
  let canvas = createCanvas(canvasW, canvasH);
  canvas.parent(dom);
  //

  console.log(dom);
  background('black');
}
function draw() {}

function windowResized() {
  //   매번 새로 select해서 가져 와야 함
  //   dom = select('#hereGoesMyP5Sketch');
  console.log('p5 select', dom.width);
  // 업데이트 할 필요 x
  console.log('querySelector', htmlDom.clientWidth);

  if (htmlDom.clientWidth < canvasW) {
    console.log('너무 작아서 짤림');
    resizeCanvas(
      htmlDom.clientWidth,
      (htmlDom.clientWidth * canvasH) / canvasW
    );
    background('black');
    console.log('리사이즈됩니다.');
  } else if (width !== canvasW) {
    console.log('리사이즈됩니다.');
    resizeCanvas(canvasW, canvasH);
    background('black');
  }
}
