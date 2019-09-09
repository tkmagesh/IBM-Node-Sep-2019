add(10,20)
add(10)
add()
add(10,20,30,40,50)
add(10,"20",30,"40",50,"abc")
add(function(){ return 10;}, function(){ return 20;});
add(function(){ return 10;}, function(){ return "20";});
add(function(){ return 10;}, function(){ return "abc";});
add(function(){ return 10;}, function(){ return function(){ return "20";}; });
add([10,"20"],[30,"40",50, "abc"])
add([10,"20"],[30,["40",50], "abc"])
add(function(){ return [10,"20"]; },function(){ return [30,["40",50], "abc"]; })
add([function(){ return [10,"20"]; },function(){ return [30,["40",50], "abc"]; }])




function add(){
	function parseArg(n){
		if (Array.isArray(n)) return add.apply(this, n)
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n);
	}
	var result = 0;
	for(var index = 0, count = arguments.length; index < count; index++)
		result += parseArg(arguments[index]);
	return result;
}