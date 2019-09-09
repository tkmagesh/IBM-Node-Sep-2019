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

var isOddOrEven = (function(){
	var cache={};

	function checkOddOrEven(n){
		console.log('processing ', n)
		return n % 2 === 0 ? 'even' : 'odd';
	}

	return function(n){
		if (!cache.hasOwnProperty(n))
			cache[n] = checkOddOrEven(n);
		return cache[n];
	}
})();


function memoize(fn){
	var cache={};

	return function(n){
		if (!cache.hasOwnProperty(n))
			cache[n] = fn(n);
		return cache[n];
	}
}


var isOddOrEven = memoize(function checkOddOrEven(n){
	console.log('processing ', n)
	return n % 2 === 0 ? 'even' : 'odd';
})

function memoize(fn){
	var cache={};

	return function(){
		var key = JSON.stringify(arguments);
		if (!cache.hasOwnProperty(key))
			cache[key] = fn.apply(this, arguments);
		return cache[key];
	}
}

var add = memoize(function(x,y){
	console.log('processing ', x ,' and ', y);
	return x + y;
})
