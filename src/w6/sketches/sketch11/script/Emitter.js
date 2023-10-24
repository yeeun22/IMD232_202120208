class Emitter {
  emit(count, x, y) {
    for (let i = 0; i < count; i++) {
      let speed = random(19, 20);
      let angle = random(TWO_PI); // 360도 방향
      let velocity = p5.Vector.fromAngle(angle).mult(speed);
      let particle = new Particle(x, y, velocity);
      particles.push(particle);
    }
  }
}
