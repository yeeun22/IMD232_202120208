let dataPoint = [];

function setup() {
  createCanvas(600, 400);
  frameRate(10);

  for (let i = 0; i < 50; i++) {
    dataPoint.push(0.5);
  }

  background(255);
}

function draw() {
  dataPoint[dataPoint.length - 1] = map(mouseY, 0, height, 1, 0);
  background(255);
  noStroke();
  fill(0);

  for (let i = 0; i < dataPoint.length; i++) {
    const x = (width / (dataPoint.length + 1)) * (i + 1);
    const y = map(dataPoint[i], 0, 1, height, 0);

    // Draw '지' or '글' based on the value of dataPoint[i]
    if (dataPoint[i] > 0.5) {
      text('지', x, y);
    } else {
      text('글', x, y);
    }
  }

  for (let i = 0; i < dataPoint.length - 1; i++) {
    dataPoint[i] = dataPoint[i + 1];
  }
}
