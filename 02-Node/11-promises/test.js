function addSync(x,y){
	console.log(`	[@Service] processing ${x} and ${y}`);
	var result = x + y;
	console.log(`	[@Service] returning the result`);
	return result;
}

function addSyncClient(x,y){
	console.log(`[@Client] triggering the service`);
	var result = addSync(x,y);
	console.log(`[@Client] result = ${result}`);
}

module.exports['addSyncClient'] = addSyncClient;

function addAsync(x,y, callback){
	console.log(`	[@Service] processing ${x} and ${y}`);
	setTimeout(function(){
		var result = x + y;
		console.log(`	[@Service] returning the result`);
		callback(result);
	},4000);
}

function addAsyncClient(x,y){
	console.log(`[@Client] triggering the service`);
	addAsync(x,y, function(result){
		console.log(`[@Client] result = ${result}`);
	});
}

module.exports['addAsyncClient'] = addAsyncClient;


function addAsyncPromise(x,y){
	console.log(`	[@Service] processing ${x} and ${y}`);
	var p = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			if (y === 0)
				return rejectFn(new Error('Invalid arguments'));
			var result = x + y;
			console.log(`	[@Service] returning the result`);
			resolveFn(result);
		},4000);
	});
	return p;
}

async function addAsyncPromiseClient(x,y){
	/*
	console.log(`[@Client] triggering the service`);
	var result = addSync(x,y);
	console.log(`[@Client] result = ${result}`);
	*/
	/*
	console.log(`[@Client] triggering the service`);
	addSyncPromise(x,y)
		.then(function(result){
			console.log(`[@Client] result = ${result}`);		
		})
	*/

	try{
		console.log(`[@Client] triggering the service`);
		var result = await addAsyncPromise(x,y);
		console.log(`[@Client] result = ${result}`);
	} catch (err){
		console.log('something went wrong');
		console.log(err);
	}
	
}