function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('orange');
}

function draw() {
  background('orange');
  fill(0);
  // // 4개
  // if (mouseX > width / 2) {
  //   if (mouseY > height / 2) {
  //     rect(width / 2, height / 2, width / 2, height / 2);
  //   } else {
  //     rect(width / 2, 0, width / 2, height / 2);
  //   }
  // } else {
  //   if (mouseY > height / 2) {
  //     rect(0, height / 2, width / 2, height / 2);
  //   } else {
  //     rect(0, 0, width / 2, height / 2);
  //   }
  // }
  // 6개
  if (mouseX > (2 / 3) * width) {
    if (mouseY > height / 2) {
      rect((2 / 3) * width, height / 2, width / 3, height / 2);
    } else {
      rect((2 / 3) * width, 0, width / 3, height / 2);
    }
  } else if (mouseX > (1 / 3) * width) {
    if (mouseY > height / 2) {
      rect(width / 3, height / 2, width / 3, height / 2);
    } else {
      rect(width / 3, 0, width / 3, height / 2);
    }
  } else {
    if (mouseY > height / 2) {
      rect((0 * width) / 3, height / 2, width / 3, height / 2);
    } else {
      rect((0 * width) / 3, 0, width / 3, height / 2);
    }
  }
}
