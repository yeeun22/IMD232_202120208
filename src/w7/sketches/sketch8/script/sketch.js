const tileSize = 40;
let columnNum;
let rowNum;
let noiseCoordMult = 0.01;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  //floor() : 정수만드는 함수
  columnNum = floor(width / tileSize);
  rowNum = floor(height / tileSize);

  background(255);

  // 노이즈도 랜덤처럼 seed값이 있다.
  noiseSeed(5);
}

function draw() {
  // randomSeed(100);
  background(255);
  noStroke();
  for (let row = 0; row < rowNum; row++) {
    for (let column = 0; column < columnNum; column++) {
      const idx = column + row * columnNum;
      // fill(random() * 255);
      // noise는 랜덤값과 비슷하지만 그 랜덤의 차이의 정도를 조절할 수 있음 (아예 랜덤한 값이 나올 것인지 비슷한 정도의 랜덤값이 생성될 것인지)
      fill(noise(row * noiseCoordMult, column * noiseCoordMult) * 255);
      rect(column * tileSize, row * tileSize, tileSize);
    }
  }
}
