class Traffic {
  //클래스를 지정한다.
  constructor() {
    // class 내부에서 사용할 객체의 초기값을 설정할 수 있다.
    this.vehicles = [];
    // 여러개의 vehicle을 가지도록 만든 변수
  }

  run() {
    this.vehicles.forEach((eachVehicle) => {
      const separate = eachVehicle.separate(this.vehicles);
      // 부딪히면 서로 밀어내는 함수
      separate.mult(1);
      eachVehicle.applyForce(separate);
      const align = eachVehicle.align(this.vehicles);
      // 친구들의 방향의 평균값으로 방향 전환
      align.mult(0.5);
      eachVehicle.applyForce(align);
      const cohesion = eachVehicle.cohesion(this.vehicles);
      // 친구들끼리 뭉치게 하는 함수
      cohesion.mult(0.5);
      // 밑에 함수들은 각각의 vehicle한테 함수 적용
      eachVehicle.applyForce(cohesion);
      eachVehicle.update();
      eachVehicle.borderInfinite();
      eachVehicle.display();
    });
  }

  addVehicle(x, y) {
    // Vehicle을 더하는 함수
    // const mass = floor(random(1, 3));
    const mass = 1;
    // vehicle 생성에 쓰일 mass값 (고정)
    this.vehicles.push(
      new Vehicle(x, y, mass, mass * 12, 5, 0.1, color(random(360), 100, 40))
    );
    // class Vehicle에 값을 입력한 후 가져와서 어레이에 집어넣음
  }
}
