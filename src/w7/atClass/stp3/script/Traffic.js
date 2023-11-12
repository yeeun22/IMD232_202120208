class Traffic {
  constructor() {
    this.vehicles = [];
  }

  run() {
    this.vehicles.forEach((eachVehicle) => {
      //separate
      const separate = eachVehicle.separate(this.vehicles);
      separate.mult(1);
      eachVehicle.applyForce(separate);
      //align
      const align = eachVehicle.align(this.vehicles);
      align.mult(0.5);
      eachVehicle.applyForce(align);
      //cohesion
      const cohesion = eachVehicle.cohesion(this.vehicles);
      cohesion.mult(0.5);
      eachVehicle.applyForce(cohesion);
      eachVehicle.update();
      eachVehicle.borderInfinite();
      eachVehicle.display();
    });
  }

  addVehicle(x, y) {
    // const mass = floor(random(1, 3));
    const mass = 1;
    this.vehicles.push(
      new Vehicle(x, y, mass, mass * 12, 5, 0.1, color(random(360), 100, 40))
    );
  }
}
