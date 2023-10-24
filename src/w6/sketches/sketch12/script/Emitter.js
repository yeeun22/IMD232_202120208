class Emitter {
  emit(cnt, x, y) {
    for (let a = 0; a < cnt; a++) {
      let particle = new Particle(x, y);
      particles.push(particle);
    }
  }
}
