memoization

pure function
	- deterministic


function add(x,y){
	return x + y;
}

add(10,20)


var z = 100;
function add(x,y){
	return x + y + z;
}

add(10,20) => 130

z = 1000
add(10,20) => 1030

var isPrime = (function(){
	var cache={};

	function checkPrime(n){
		console.log('processing ', n)
		for(var index = 2; index <= (n/2); index++)
			if(n % index === 0){
				return false
			}
		return true;
	}

	return function(n){
		if (!cache.hasOwnProperty(n))
			cache[n] = checkPrime(n);
		return cache[n];
	}
})();



