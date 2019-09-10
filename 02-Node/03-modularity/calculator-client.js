let calculator = require('./calculator');

console.log('[@calculator-client] calculator = ', calculator);
let x = 10,
	y = 20;

console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y));