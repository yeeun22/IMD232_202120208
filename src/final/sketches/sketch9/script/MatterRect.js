class MatterRect {
  constructor(x, y, w, h, options, text) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(matterEngine.world, this.body);
    this.text = text;
  }

  display() {
    push();
    translate(ratio * this.body.position.x, ratio * this.body.position.y);
    rotate(this.body.angle);
    rect(0, 0, ratio * this.w, ratio * this.h);
    pop();
    push();
    translate(ratio * this.body.position.x, ratio * this.body.position.y);
    textAlign(CENTER, CENTER);
    text(this.text, 0, 0);
    pop();
    // beginShape();
    // this.body.vertices.forEach((each) => {
    //   vertex(each.x, each.y);
    // });
    // endShape(CLOSE);
  }

  remove() {
    Composite.remove(matterEngine.world, this.body);
  }
}
