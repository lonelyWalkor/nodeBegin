var ports = [];
self.onconnect = function(connectEvent){
	var port = connectEvent.ports[0];
	ports.push(port);
	//console.log(connectEvent.ports);
	port.postMessage("hello,this is sharedWorker!");
	
	port.onmessage = function(messageEvent){
		
		ports.forEach(function(port){
			
			port.postMessage(messageEvent.data);
			
		});
		
	}
}
