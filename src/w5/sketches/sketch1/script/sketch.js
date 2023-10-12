let aVariavle = 20;
let anArray = [30, 60, 90];
let anotherArray = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);

  console.log(aVariavle);
  console.log('anArray', anArray);
  console.log('anArray[0]', anArray[0]);
  console.log('anArray[1]', anArray[1]);
  console.log('anArray[2]', anArray[2]);
  console.log('anArray.length', anArray.length);
  console.log('anotherArray', anotherArray);
  console.log('anotherArray.length', anotherArray.length);
  console.log('anotherArray[0]', anotherArray[0]);
  anotherArray.push('array에 넣은 첫 데이터');
  console.log('anotherArray[0]', anotherArray[0]);
  anotherArray.push(50);
  console.log('anotherArray[1]', anotherArray[1]);
}

function draw() {}
