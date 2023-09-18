// console.log('안녕하세요?');
// console.log('표지', '안녕하세요?');

// let - const 차이
// let은 선언 후 값 대입이 가능하나, const는 초기값으로만 가능 (상수)
// (변수 : 3,4,5 등 여러숫자 대입 가능 / 상수 : 변하지 않는 설정값)

const two = 2;
console.log(two);

const four = 4;
console.log(four);

let undefinedVal;
console.log(undefinedVal);

const additionConst = two + four;
console.log(additionConst);

let addition = two + four;
console.log(addition);

let subtraction = two - four;
console.log(subtraction);

let multiplication = two * four;
console.log(multiplication);

let division = two / four;
console.log(division);

// 실행 X | 상수로 선언(한번 값이 정해지면 바뀔 수가 없음)
// additionConst = additionConst + two;
// console.log(additionConst);

addition = addition + two;
console.log('더하기', addition);
addition += two;
console.log(addition);

subtraction = subtraction - two;
console.log('빼기', subtraction);
subtraction -= two;
console.log('빼기', subtraction);
subtraction += -two;
console.log('빼기', subtraction);
subtraction += -1 * two;
console.log('빼기', subtraction);

multiplication = multiplication * two;
console.log('곱하기', multiplication);
multiplication *= two;
console.log('곱하기', multiplication);

console.log('square,제곱', 8 ** 2);
console.log('세제곱', 8 ** 3);
console.log('root square, 제곱근', 4 ** (1 / 2));

division = division / two;
console.log('나누기', division);
division /= two;
console.log('나누기', division);
division *= -1 / two;
console.log('나누기', division);

// 1씩 더하기
let counter = 0;
counter += 1;
console.log(counter);
counter += 1;
console.log(counter);
counter++;
console.log(counter);
counter++;
console.log(counter);

// 나머지
let remainder = counter % 8;
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);
counter++;
remainder = counter % 8;
console.log('counter', counter);
console.log('remainder', remainder);

// 토글 쓸 때 유용
let boolean = true;
console.log(boolean);
boolean = false;
console.log(boolean);
boolean = !boolean;
console.log(boolean);
boolean = !boolean;
console.log(boolean);

const textTwo = '2';
console.log('num + txt', two + textTwo);
console.log('num + num', two + two);
console.log('num + txt', textTwo + textTwo);
console.log('solution', two + Number(textTwo));
