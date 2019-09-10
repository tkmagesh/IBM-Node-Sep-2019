module.exports = function(initialResult = 0){
	let result = initialResult;

	let accumulator = {
		add(x){
			result += x;
		},
		subtract(x){
			result -= x;
		},
		multiply(x){
			result *= x;
		},
		divide(x){
			result /= x;
		},
		getResult(){
			return result;
		}
	}

	return accumulator;
};